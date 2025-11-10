export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-cosmic-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-cosmic-gold mb-4">
              About
            </h3>
            <p className="text-sm text-gray-400">
              Hermetic Youth teaches the 7 Hermetic Principles through
              interactive experiences. Timeless wisdom for modern minds.
            </p>
          </div>

          {/* Principles */}
          <div>
            <h3 className="text-sm font-semibold text-cosmic-gold mb-4">
              The 7 Principles
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Mentalism - Mind shapes reality</li>
              <li>Correspondence - Patterns repeat</li>
              <li>Vibration - Everything moves</li>
              <li>Polarity - See both sides</li>
              <li>Rhythm - Honor cycles</li>
              <li>Cause & Effect - Choices matter</li>
              <li>Gender - Balance energies</li>
            </ul>
          </div>

          {/* Philosophy */}
          <div>
            <h3 className="text-sm font-semibold text-cosmic-gold mb-4">
              Philosophy
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>✓ Free forever</li>
              <li>✓ No dark patterns</li>
              <li>✓ Privacy-respecting</li>
              <li>✓ Open source</li>
              <li>✓ Built with Gold Hat principles</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            &copy; {currentYear} Hermetic Youth. Open source MIT License.
          </p>
          <p className="mt-2 sm:mt-0">
            Built with{" "}
            <span className="text-cosmic-gold">Hermetic Principles</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
