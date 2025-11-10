# 🐳 Docker Setup - Hermetic Academy

## Quick Start (3 Commands)

```bash
# 1. Copy environment template
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 2. Start everything
docker compose up -d

# 3. View logs
docker compose logs -f app
```

**Open**: http://localhost:3000

---

## What's Included

### Services
- **app**: Next.js frontend (port 3000)
- **db**: PostgreSQL 15 database (port 5432)

### Features
- ✅ Multi-stage optimized Docker build
- ✅ Automatic database migrations on startup
- ✅ Hot reload disabled (production build)
- ✅ Health checks for all services
- ✅ Persistent database volumes
- ✅ Non-root user for security

---

## Prerequisites

- Docker 20.10+ ([Install](https://docs.docker.com/get-docker/))
- Docker Compose V2 ([Included with Docker Desktop](https://docs.docker.com/compose/install/))

**Verify installation**:
```bash
docker --version        # Should be 20.10+
docker compose version  # Should be v2.0+
```

---

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

**Required variables**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://oexpwvjvnblxjmxfbksd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Database Options

#### Option A: Use Production Supabase (Default)
No changes needed - app connects to production Supabase database.

#### Option B: Use Local PostgreSQL
Uncomment in `docker-compose.yml`:
```yaml
environment:
  DATABASE_URL: postgresql://postgres:hermetic_dev_password@db:5432/hermetic_academy
```

---

## Commands

### Start Services
```bash
# Start all services in background
docker compose up -d

# Start and view logs
docker compose up

# Start only specific service
docker compose up app
```

### Stop Services
```bash
# Stop all services
docker compose down

# Stop and remove volumes (⚠️ deletes database data)
docker compose down -v
```

### View Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f app
docker compose logs -f db

# Last 100 lines
docker compose logs --tail=100 app
```

### Rebuild
```bash
# Rebuild after code changes
docker compose build

# Rebuild without cache (clean build)
docker compose build --no-cache

# Rebuild and restart
docker compose up --build -d
```

### Database Management
```bash
# Access PostgreSQL shell
docker compose exec db psql -U postgres -d hermetic_academy

# Run migrations manually
docker compose exec db psql -U postgres -d hermetic_academy -f /docker-entrypoint-initdb.d/001_initial_schema.sql

# Backup database
docker compose exec db pg_dump -U postgres hermetic_academy > backup.sql

# Restore database
docker compose exec -T db psql -U postgres hermetic_academy < backup.sql
```

### Health Checks
```bash
# Check service status
docker compose ps

# Check app health
curl http://localhost:3000/api/health

# Check database health
docker compose exec db pg_isready -U postgres
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Database Connection Errors
```bash
# Check database is running
docker compose ps db

# View database logs
docker compose logs db

# Restart database
docker compose restart db
```

### Build Errors
```bash
# Clean build
docker compose down
docker compose build --no-cache
docker compose up

# Remove all Docker data (⚠️ nuclear option)
docker system prune -a --volumes
```

### Container Won't Start
```bash
# View detailed logs
docker compose logs --tail=100 app

# Check container status
docker compose ps

# Restart service
docker compose restart app
```

---

## Development Workflow

### Making Code Changes

**Without Docker** (faster for development):
```bash
npm run dev  # Hot reload works
```

**With Docker** (production-like environment):
```bash
# After code changes
docker compose build app
docker compose up -d app
```

### Recommended Hybrid Approach
1. **Development**: Use `npm run dev` (faster iteration)
2. **Testing**: Use Docker (production-like environment)
3. **CI/CD**: Use Docker (consistent builds)

---

## Production Deployment

This Docker setup is for **local development**. For production:

### Vercel (Recommended)
```bash
# Vercel handles building and deployment
vercel deploy --prod
```

### Docker Production Deployment
```bash
# Build production image
docker build -t hermetic-academy:prod .

# Run production container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_KEY \
  hermetic-academy:prod
```

### Docker Registry
```bash
# Tag for registry
docker tag hermetic-academy:prod registry.example.com/hermetic-academy:latest

# Push to registry
docker push registry.example.com/hermetic-academy:latest
```

---

## Architecture

### Multi-Stage Dockerfile

```
┌─────────────────────────┐
│  Stage 1: deps          │  Install dependencies only
│  (node:18-alpine)       │  Cache layer for faster rebuilds
└─────────────────────────┘
           │
           ▼
┌─────────────────────────┐
│  Stage 2: builder       │  Build Next.js application
│  (node:18-alpine)       │  Generate optimized production build
└─────────────────────────┘
           │
           ▼
┌─────────────────────────┐
│  Stage 3: runner        │  Minimal production image
│  (node:18-alpine)       │  Only runtime files, non-root user
└─────────────────────────┘
```

**Benefits**:
- 🔒 Security: Non-root user
- 📦 Size: ~200MB (vs ~1GB without multi-stage)
- ⚡ Speed: Cached layers for faster rebuilds
- 🎯 Production: Optimized standalone output

### Docker Compose Network

```
┌──────────────────────────────────────┐
│  hermetic-network (bridge)           │
│                                       │
│  ┌────────────┐      ┌────────────┐ │
│  │    app     │─────▶│     db     │ │
│  │  (Next.js) │      │ (Postgres) │ │
│  │  :3000     │      │  :5432     │ │
│  └────────────┘      └────────────┘ │
│       │                     │        │
└───────┼─────────────────────┼────────┘
        │                     │
    localhost:3000      localhost:5432
```

---

## Performance Tips

### Build Performance
```bash
# Use BuildKit (faster, better caching)
export DOCKER_BUILDKIT=1
docker compose build

# Parallel builds
docker compose build --parallel
```

### Image Size Optimization
- ✅ Multi-stage build (already implemented)
- ✅ Alpine base images (minimal size)
- ✅ .dockerignore (exclude unnecessary files)
- ✅ Standalone output (only required files)

### Caching Strategy
```bash
# Leverage layer caching
# 1. COPY package files first (changes less often)
# 2. RUN npm install (cached if package.json unchanged)
# 3. COPY source code (changes frequently)
```

---

## Security Best Practices

### Implemented
- ✅ Non-root user (`nextjs:nodejs`)
- ✅ Alpine Linux (minimal attack surface)
- ✅ Production mode (`NODE_ENV=production`)
- ✅ No sensitive data in image
- ✅ Read-only migration mount

### Additional Recommendations
```bash
# Scan for vulnerabilities
docker scout cves hermetic-academy:latest

# Run as read-only filesystem
docker run --read-only hermetic-academy:prod

# Limit resources
docker run --memory=512m --cpus=1 hermetic-academy:prod
```

---

## Monitoring

### Container Stats
```bash
# Real-time stats
docker stats

# Specific container
docker stats hermetic-academy-app
```

### Health Checks
```bash
# Check app health
curl http://localhost:3000/

# Check database health
docker compose exec db pg_isready -U postgres
```

### Logs
```bash
# Export logs
docker compose logs > logs.txt

# Follow logs with timestamps
docker compose logs -f -t
```

---

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Build Docker Image

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Docker image
        run: docker build -t hermetic-academy .

      - name: Test container
        run: |
          docker run -d -p 3000:3000 hermetic-academy
          sleep 5
          curl -f http://localhost:3000/ || exit 1
```

---

## Maintenance

### Update Base Images
```bash
# Pull latest alpine image
docker pull node:18-alpine

# Rebuild with latest base
docker compose build --no-cache
```

### Clean Up
```bash
# Remove stopped containers
docker compose rm

# Remove unused images
docker image prune

# Remove everything (⚠️ careful!)
docker system prune -a --volumes
```

---

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [Alpine Linux](https://alpinelinux.org/)

---

**Status**: Docker environment ready for consistent, reproducible development! 🐳

**Next**: Configure GitHub Actions for automated CI/CD
