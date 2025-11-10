// Support page: Voluntary contributions - Buy me a coffee style
// Transparent, gratitude-focused, zero pressure

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support - Hermetic Academy',
  description: 'Support sacred technology development. Completely voluntary, helps keep all learning FREE.',
};

export default function SupportPage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16 reveal">
          <div className="text-6xl mb-6">💛</div>
          <h1 className="mb-6">
            Support Sacred Technology
          </h1>
          <p className="text-xl text-text-tertiary max-w-2xl mx-auto">
            Hermetic Academy is <strong>FREE</strong> for everyone, forever.
            <br />
            Your support helps us continue this sacred work.
          </p>
        </div>

        {/* Why Support Section */}
        <div className="bg-shadow-deep border-2 border-shadow-light rounded-2xl p-8 mb-12">
          <h2 className="text-2xl mb-6">Where Your Support Goes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🌱</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Keep It Free</h3>
                <p className="text-sm text-text-tertiary">
                  Maintain all 7 Hermetic Principles as free, accessible content for every seeker.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">✨</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Build New Features</h3>
                <p className="text-sm text-text-tertiary">
                  Develop interactive experiences, gamification, and deeper learning paths.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">🚀</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Improve Platform</h3>
                <p className="text-sm text-text-tertiary">
                  Better performance, mobile experience, offline access, and accessibility.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-3xl">🌍</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Reach More Seekers</h3>
                <p className="text-sm text-text-tertiary">
                  Help young people discover ancient wisdom and modern consciousness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="text-center py-12 bg-shadow-deep border-2 border-shadow-light rounded-2xl">
          <div className="text-5xl mb-4">☕</div>
          <h2 className="mb-4">Support Options Coming Soon</h2>
          <p className="text-text-tertiary mb-8 max-w-md mx-auto">
            We're setting up ethical, voluntary ways for you to contribute if you choose.
            <br /><br />
            <strong>Zero pressure. Zero manipulation. Just gratitude.</strong>
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-shadow-medium/50 rounded-lg p-6 text-left">
              <h3 className="font-semibold mb-2 text-gold-divine">☕ One-Time Support</h3>
              <p className="text-sm text-text-tertiary mb-4">
                Buy me a coffee! Quick tips of any amount.
              </p>
              <ul className="text-sm space-y-2 text-text-secondary">
                <li>• $3, $5, $10, or custom amount</li>
                <li>• Just a thank you message</li>
                <li>• No rewards needed</li>
                <li>• Pure gratitude</li>
              </ul>
            </div>

            <div className="bg-shadow-medium/50 rounded-lg p-6 text-left">
              <h3 className="font-semibold mb-2 text-gold-divine">💝 Optional Monthly</h3>
              <p className="text-sm text-text-tertiary mb-4">
                Voluntary recurring support if you want to help sustain this work.
              </p>
              <ul className="text-sm space-y-2 text-text-secondary">
                <li>• $5, $10, $20, or custom</li>
                <li>• Behind-the-scenes updates</li>
                <li>• Cancel anytime (seriously)</li>
                <li>• Optional recognition</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Transparency Promise */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-realm-5-rhythm/10 border-2 border-realm-5-rhythm/30 rounded-lg px-8 py-6 max-w-2xl">
            <h3 className="font-semibold mb-3 text-realm-5-rhythm">Our Transparency Promise</h3>
            <p className="text-sm text-text-secondary">
              When support options launch, we'll publish a monthly revenue dashboard showing:
              <br />
              • Total support received
              <br />
              • Where every dollar goes
              <br />
              • Features funded by contributions
              <br />
              • Refund rate (should be &lt;1%)
              <br /><br />
              <em>No hidden fees. No surprises. Just honest development.</em>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-12 border-t-2 border-shadow-medium">
          <p className="text-text-tertiary italic">
            "The purpose of life is not to be happy. It is to be useful, to be honorable,
            <br />
            to be compassionate, to have it make some difference that you have lived and lived well."
          </p>
          <p className="text-sm text-text-disabled mt-4">— Ralph Waldo Emerson</p>
        </div>
      </div>
    </div>
  );
}
