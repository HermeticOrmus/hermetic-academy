# Hermetic Youth

**Interactive webapp teaching the 7 Hermetic Principles to youth (ages 11-18)**

![Status](https://img.shields.io/badge/status-in_development-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Open Source](https://img.shields.io/badge/open_source-day_1-green)

---

## Vision

Transform the ancient wisdom of the 7 Hermetic Principles into interactive, engaging experiences that speak to modern youth. No lectures, no preaching - just exploration, discovery, and empowerment.

### The 7 Principles

1. **Mentalism** - Your thoughts shape your reality
2. **Correspondence** - Patterns repeat at all scales
3. **Vibration** - Everything moves, everything vibrates
4. **Polarity** - See both sides, find balance
5. **Rhythm** - Life has seasons, honor the cycles
6. **Cause & Effect** - Your choices matter
7. **Gender** - Balance masculine and feminine energies

---

## Features

### Interactive Experiences (One per Principle)
- **Mentalism**: Mind map builder showing cascading thought effects
- **Correspondence**: Fractal zoom explorer revealing patterns
- **Vibration**: Sound frequency visualizer
- **Polarity**: Perspective flip game
- **Rhythm**: Natural cycle tracker
- **Cause-Effect**: Chain reaction simulator
- **Gender**: Balance visualizer

### Community Features
- Public reflection sharing (anonymous option)
- Wisdom reactions (not likes)
- Safe, moderated space

### Cosmetic System
- Optional theme customization
- Achievement badges
- Avatar options
- **All content free forever** - cosmetics support development

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Deployment**: Vercel (frontend) + Supabase (backend)

---

## Gold Hat Philosophy

This project embodies **sacred technology** principles:

**We Build:**
✅ Empowering educational experiences
✅ Anonymous safe spaces
✅ Optional community (never forced)
✅ Privacy-respecting systems
✅ Open source (MIT license)

**We Reject:**
❌ Dark patterns
❌ Infinite scroll
❌ Engagement optimization over wellbeing
❌ Paywalled wisdom
❌ Data extraction

**The Question**: "Does this empower or extract?"

---

## Getting Started

### Prerequisites
- Node.js 18.17+
- npm or yarn
- Supabase account (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/HermeticOrmus/hermetic-youth.git
cd hermetic-youth

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Database Setup

See [DATABASE.md](./docs/DATABASE.md) for complete Supabase configuration.

---

## Project Structure

```
hermetic-youth/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── principles/         # Principle pages
│   ├── community/          # Community features
│   └── profile/            # User profiles
├── components/             # React components
│   ├── experiences/        # Interactive principle experiences
│   ├── ui/                 # Reusable UI components
│   └── layout/             # Navigation, footer
├── lib/                    # Utilities
│   ├── supabase.ts         # Supabase client
│   ├── constants.ts        # Principle data
│   └── utils.ts            # Helper functions
├── public/                 # Static assets
└── supabase/               # Database migrations
```

---

## Development Philosophy

### Hermetic Alignment
Every decision follows the 7 Principles:

- **Mentalism**: Clear intent documented in code
- **Correspondence**: Architecture mirrors values
- **Vibration**: Rapid iteration, continuous improvement
- **Polarity**: Balance sophistication with simplicity
- **Rhythm**: Sustainable 6-day dev cycles
- **Cause-Effect**: Every choice serves empowerment
- **Gender**: Technical precision + aesthetic beauty

### For Teens, By Principle
- **Timeless cool** (not trendy)
- **Respect intelligence** (never condescending)
- **Mobile-first** (they live on phones)
- **Accessible** (WCAG AA minimum)
- **Safe** (moderated, anonymous options)

---

## Contributing

We welcome contributions that align with our Gold Hat philosophy!

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-idea`)
3. Commit your changes (`git commit -m 'Add amazing idea'`)
4. Push to the branch (`git push origin feature/amazing-idea`)
5. Open a Pull Request

### Contribution Guidelines
- All wisdom content remains free
- No dark patterns or manipulative UX
- Maintain accessibility standards
- Test on mobile devices
- Document your code (explain WHY)

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## License

MIT License - see [LICENSE](./LICENSE) for details.

**Open source from Day 1** - learn from our code, fork it, improve it, teach others.

---

## Roadmap

### v1.0 (MVP - In Progress)
- [x] Project foundation
- [ ] All 7 interactive experiences
- [ ] Basic community features
- [ ] Cosmetic system
- [ ] Deploy to production

### v2.0 (Future)
- [ ] Mobile apps (React Native)
- [ ] Educator tools (classroom mode)
- [ ] Multi-language support
- [ ] Advanced analytics (ethical)
- [ ] Peer mentor system

---

## Contact

**Project**: Hermetic Youth
**Philosophy**: Gold Hat Technology
**Status**: Autonomous execution by Sol (Phase 1)

For questions or collaboration: [Open an issue](https://github.com/HermeticOrmus/hermetic-youth/issues)

---

## Acknowledgments

Built with the 7 Hermetic Principles as our guide. Every line of code serves empowerment.

*"As above, so below. As the code, so the consciousness."*

---

**Last Updated**: 2025-11-09 (Day 1 - Foundation)
