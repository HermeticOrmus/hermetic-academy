# 🐙 GitHub Repository Setup

## Quick Setup (5 minutes)

### Option A: Manual Setup (Recommended - Simple)

1. **Go to GitHub**: https://github.com/new

2. **Create Repository**:
   - Repository name: `hermetic-academy`
   - Description: `Interactive webapp teaching the 7 Hermetic Principles to 11-18 year olds. Sacred technology built with Gold Hat philosophy.`
   - Visibility: **Public** (open source Day 1)
   - ❌ Do NOT initialize with README (we already have one)

3. **Connect Local Repo**:
   ```bash
   cd C:/Users/ormus/projects/01-ACTIVE/hermetic-academy
   git remote add origin https://github.com/YOUR_USERNAME/hermetic-academy.git
   git branch -M main
   git push -u origin main
   ```

4. **Verify**: Visit `https://github.com/YOUR_USERNAME/hermetic-academy` - you should see all files!

---

### Option B: GitHub CLI (If Installed)

```bash
cd C:/Users/ormus/projects/01-ACTIVE/hermetic-academy
gh repo create HermeticOrmus/hermetic-academy --public --source=. --remote=origin
git push -u origin main
```

---

### Option C: GitHub MCP (Requires Token Configuration)

If you have GitHub MCP configured with proper permissions:

```typescript
// Claude will use mcp__github__create_repository
// Then push code using git commands
```

**Note**: Currently requires `repo` scope on personal access token.

---

## Verify Success

✅ Repository visible at `https://github.com/YOUR_USERNAME/hermetic-academy`
✅ README.md displays with project overview
✅ All code files present
✅ MIT License visible
✅ Open source badge (public repo)

---

## Next Steps

1. Add topics/tags (optional):
   - Repository → Settings → Topics
   - Add: `hermetic-principles`, `education`, `youth`, `sacred-technology`, `nextjs`, `supabase`

2. Enable GitHub Pages (optional, if you want docs hosting):
   - Settings → Pages → Source: `main` branch → `/docs` folder

3. Set up branch protection (optional, for collaboration):
   - Settings → Branches → Add rule for `main`
   - Require PR reviews before merging

---

**Status**: Repository ready for collaborative development! 🚀

Continue to: **SUPABASE-SETUP.md**
