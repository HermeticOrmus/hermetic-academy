// Shop page: Ethical monetization - Cosmetics & Optional Support
// All learning content remains FREE forever

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop - Hermetic Academy',
  description: 'Optional cosmetic items and ways to support sacred technology. All learning is FREE forever.',
};

export default function ShopPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 reveal">
          <h1 className="mb-6">
            Express Yourself
          </h1>
          <p className="text-xl text-text-tertiary max-w-2xl mx-auto mb-8">
            Customize your learning journey with optional cosmetics and support sacred technology.
          </p>

          {/* CRITICAL: Clear messaging that learning is FREE */}
          <div className="inline-block bg-realm-4-polarity/10 border-2 border-realm-4-polarity/30 rounded-lg px-8 py-4">
            <p className="text-lg font-semibold text-realm-4-polarity">
              ✨ All educational content is FREE forever ✨
            </p>
            <p className="text-sm text-text-tertiary mt-2">
              These are purely optional and just for fun!
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <button className="sacred-button">
            <span>🎨 Cosmetics</span>
          </button>
          <button className="px-8 py-3 rounded-lg border-2 border-shadow-medium text-text-tertiary hover:border-text-tertiary transition-all">
            <span>💛 Support</span>
          </button>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center py-20">
          <div className="inline-block bg-shadow-deep border-2 border-shadow-light rounded-2xl p-12 max-w-2xl">
            <div className="text-6xl mb-6">🎨</div>
            <h2 className="mb-4">Shop Opening Soon!</h2>
            <p className="text-text-tertiary mb-8">
              We're creating unique cosmetic items and ethical ways to support Hermetic Academy.
              <br /><br />
              <strong>Remember:</strong> All learning content will <em>always</em> be FREE.
              <br />
              The shop is purely optional for personalization and voluntary support.
            </p>

            {/* What's Coming Preview */}
            <div className="text-left bg-shadow-medium/50 rounded-lg p-6 space-y-4">
              <p className="font-semibold text-text-primary">Coming to the shop:</p>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-realm-3-vibration">✦</span>
                  <div>
                    <strong>Custom Themes</strong> - Cosmic dark, neon cyber, ethereal gold, and more
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-realm-5-rhythm">✦</span>
                  <div>
                    <strong>Animated Avatars</strong> - Sacred geometry, particle effects, realm auras
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-realm-6-cause-effect">✦</span>
                  <div>
                    <strong>XP Bar Skins</strong> - Holographic, liquid gold, cosmic nebula effects
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-realm-7-gender">✦</span>
                  <div>
                    <strong>Profile Borders</strong> - Gold frames, rainbow glows, sacred geometry
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold-divine">✦</span>
                  <div>
                    <strong>Support Options</strong> - Buy me a coffee, voluntary monthly support
                  </div>
                </li>
              </ul>
            </div>

            <p className="text-sm text-text-tertiary mt-8 italic">
              Prices will range from $0.99 - $4.99 for individual items,
              <br />
              with bundles offering 20-30% savings.
            </p>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-16 pt-12 border-t-2 border-shadow-medium">
          <p className="text-text-tertiary">
            Built with <span className="text-gold-divine">consciousness</span>.
            {' '}Monetized with <span className="text-gold-divine">integrity</span>.
            {' '}Deployed with <span className="text-gold-divine">love</span>.
          </p>
          <p className="text-sm text-text-disabled mt-4">
            This is what ethical EdTech looks like. 🌟
          </p>
        </div>
      </div>
    </div>
  );
}
