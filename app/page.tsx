import { PRINCIPLES } from "@/lib/constants";
import { PrincipleCard } from "@/components/ui/PrincipleCard";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center border-b border-gray-800">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cosmic-purple via-cosmic-gold to-cosmic-purple bg-clip-text text-transparent">
            Master Reality Through Hermetic Wisdom
          </h1>
          <p className="text-xl md:text-2xl text-gray-400">
            Ancient principles meet modern clarity. Transform how you understand yourself and the world.
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Seven timeless laws. Infinite applications. Free forever.
          </p>
        </div>
      </section>

      {/* Principles Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            The 7 Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((principle) => (
              <PrincipleCard key={principle.id} principle={principle} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Begin Your Journey</h2>
          <p className="text-gray-400">
            Choose any principle to explore. Learn at your own pace. Master all seven to see reality clearly.
          </p>
        </div>
      </section>
    </div>
  );
}
