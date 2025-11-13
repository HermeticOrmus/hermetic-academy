'use client';

import { LensPicker } from './LensPicker';
import { useRouter } from 'next/navigation';

export function LensOnboarding() {
  const router = useRouter();

  const handleLensSelected = () => {
    // Redirect to home page after lens selection
    setTimeout(() => {
      router.push('/');
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Welcome to Hermetic Academy
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Master the 7 ancient principles that govern reality—explained in your language.
          </p>
        </div>

        <LensPicker onSelect={handleLensSelected} />

        <div className="mt-12 text-center">
          <button
            onClick={() => {
              router.push('/');
            }}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Skip for now and browse universally
          </button>
        </div>
      </div>
    </div>
  );
}
