import Link from "next/link";

interface Decode {
  title: string;
  slug: string;
  question: string;
  tags: string[];
}

interface DecodeGridProps {
  decodes: Decode[];
}

export function DecodeGrid({ decodes }: DecodeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {decodes.map((decode) => (
        <Link
          key={decode.slug}
          href={`/community/expert-decodes/${decode.slug}`}
          className="group"
        >
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 h-full transition-all hover:border-cosmic-purple hover:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-200 mb-3 group-hover:text-cosmic-purple transition-colors">
              {decode.question}
            </h3>
            <div className="flex flex-wrap gap-2 mt-4">
              {decode.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 px-2 py-1 bg-gray-800 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
