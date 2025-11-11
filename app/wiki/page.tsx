import { WikiSidebar } from '@/components/wiki/WikiSidebar';
import { Search, BookOpen, Compass, Lightbulb } from 'lucide-react';

export default function WikiHomepage() {
  return (
    <div className="flex min-h-screen bg-cosmic-black">
      {/* Persistent Sidebar */}
      <WikiSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-12">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              The Codex
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl">
              A comprehensive guide to the seven universal principles of Hermetic philosophy.
              Ancient wisdom made accessible for modern understanding.
            </p>
          </header>

          {/* Search Placeholder */}
          <div className="mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search the Codex..."
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gold-divine/50 focus:ring-1 focus:ring-gold-divine/50"
                disabled
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">Search functionality coming soon</p>
          </div>

          {/* Quick Start Cards */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Compass className="w-6 h-6 mr-3 text-gold-divine" />
              Quick Start Guides
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="/wiki/getting-started/what-is-hermetics"
                className="block bg-gray-900/30 border border-gray-800 rounded-lg p-6 hover:border-gold-divine/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">New to Hermetics?</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Start here to understand the foundational concepts and seven principles.
                </p>
                <span className="text-gold-divine text-sm font-medium">Read introduction →</span>
              </a>
              <a
                href="/wiki/getting-started/the-seven-principles"
                className="block bg-gray-900/30 border border-gray-800 rounded-lg p-6 hover:border-gold-divine/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Quick Overview</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Get a high-level summary of all seven principles in one place.
                </p>
                <span className="text-gold-divine text-sm font-medium">View principles →</span>
              </a>
              <a
                href="/wiki/getting-started/how-to-use-this-wiki"
                className="block bg-gray-900/30 border border-gray-800 rounded-lg p-6 hover:border-gold-divine/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Navigation Guide</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Learn how to navigate the Codex and choose your learning path.
                </p>
                <span className="text-gold-divine text-sm font-medium">Get oriented →</span>
              </a>
            </div>
          </section>

          {/* Main Sections */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-gold-divine" />
              The Seven Principles
            </h2>
            <div className="space-y-3">
              <a
                href="/wiki/principles/mentalism/overview"
                className="block bg-gray-900/30 border border-gray-800 rounded-lg p-5 hover:border-purple-500/50 hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">1. The Principle of Mentalism</h3>
                    <p className="text-sm text-gray-400">"The All is Mind; The Universe is Mental"</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">15 min</span>
                </div>
              </a>
              <a
                href="/wiki/principles/correspondence/overview"
                className="block bg-gray-900/30 border border-gray-800 rounded-lg p-5 hover:border-blue-500/50 hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">2. The Principle of Correspondence</h3>
                    <p className="text-sm text-gray-400">"As above, so below; as below, so above"</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">14 min</span>
                </div>
              </a>
              <a
                href="/wiki/principles/vibration/overview"
                className="block bg-gray-900/30 border border-gray-800 rounded-lg p-5 hover:border-cyan-500/50 hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">3. The Principle of Vibration</h3>
                    <p className="text-sm text-gray-400">"Nothing rests; everything moves; everything vibrates"</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">14 min</span>
                </div>
              </a>
              <a
                href="/wiki/principles/polarity/overview"
                className="block bg-gray-900/30 border border-gray-800 rounded-lg p-5 hover:border-green-500/50 hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">4. The Principle of Polarity</h3>
                    <p className="text-sm text-gray-400">"Everything is Dual; everything has poles"</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">15 min</span>
                </div>
              </a>
              <a
                href="/wiki/principles/rhythm/overview"
                className="block bg-gray-900/30 border border-gray-800 rounded-lg p-5 hover:border-yellow-500/50 hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">5. The Principle of Rhythm</h3>
                    <p className="text-sm text-gray-400">"Everything flows, out and in; everything has its tides"</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">14 min</span>
                </div>
              </a>
              <a
                href="/wiki/principles/cause-effect/overview"
                className="block bg-gray-900/30 border border-gray-800 rounded-lg p-5 hover:border-red-500/50 hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">6. The Principle of Cause and Effect</h3>
                    <p className="text-sm text-gray-400">"Every Cause has its Effect; every Effect has its Cause"</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">14 min</span>
                </div>
              </a>
              <a
                href="/wiki/principles/gender/overview"
                className="block bg-gray-900/30 border border-gray-800 rounded-lg p-5 hover:border-pink-500/50 hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">7. The Principle of Gender</h3>
                    <p className="text-sm text-gray-400">"Gender is in everything; everything has its Masculine and Feminine Principles"</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">16 min</span>
                </div>
              </a>
            </div>
          </section>

          {/* Applications */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 mr-3 text-gold-divine" />
              Practical Applications
            </h2>
            <div className="space-y-3">
              <a
                href="/wiki/applications/gaming/ranked-climbing"
                className="block bg-gray-900/30 border border-gray-800 rounded-lg p-5 hover:border-gold-divine/50 hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Climbing Ranked (Gaming Application)</h3>
                    <p className="text-sm text-gray-400">Apply all seven principles to competitive gaming improvement</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">16 min</span>
                </div>
              </a>
              <a
                href="/wiki/applications/gaming/dealing-with-tilt"
                className="block bg-gray-900/30 border border-gray-800 rounded-lg p-5 hover:border-gold-divine/50 hover:bg-gray-900/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Dealing with Tilt (Gaming Application)</h3>
                    <p className="text-sm text-gray-400">Prevention, detection, and recovery from negative emotional states</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">18 min</span>
                </div>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
