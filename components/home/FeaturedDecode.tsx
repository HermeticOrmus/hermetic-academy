import Link from "next/link";

interface FeaturedDecodeProps {
  title: string;
  slug: string;
  excerpt: string;
  principlesUsed: string[];
}

export function FeaturedDecode({
  title,
  slug,
  excerpt,
  principlesUsed,
}: FeaturedDecodeProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      {/* Left: Preview */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {principlesUsed.map((principle) => (
            <span
              key={principle}
              className="px-3 py-1 bg-cosmic-purple/20 text-cosmic-purple text-sm rounded-full"
            >
              {principle}
            </span>
          ))}
        </div>
        <h3 className="text-3xl font-bold text-gray-100">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{excerpt}</p>
        <Link
          href={`/community/expert-decodes/${slug}`}
          className="inline-flex items-center gap-2 text-cosmic-gold hover:text-cosmic-purple transition-colors"
        >
          Read Full Decode
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Right: Insight */}
      <div className="bg-gradient-to-br from-cosmic-purple/10 to-cosmic-gold/10 border border-cosmic-purple/30 rounded-lg p-6">
        <div className="text-sm text-cosmic-gold mb-2">The Hermetic Truth</div>
        <p className="text-gray-300 leading-relaxed">
          Every modern crisis reveals the same pattern: we've forgotten the
          principles that govern reality. Dating apps fail because they violate
          Polarity. ADHD surges because of Vibrational mismatch. Housing
          collapses through Cause & Effect chains.
        </p>
        <p className="text-gray-300 leading-relaxed mt-4">
          <span className="text-cosmic-purple font-semibold">
            Learn the principles. Decode reality.
          </span>
        </p>
      </div>
    </div>
  );
}
