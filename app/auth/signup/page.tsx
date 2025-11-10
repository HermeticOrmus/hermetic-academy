import { SignupForm } from "@/components/auth/SignupForm";

export const metadata = {
  title: "Create Account | Hermetic Academy",
  description: "Join the Hermetic Academy community",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cosmic-purple via-cosmic-gold to-cosmic-purple bg-clip-text text-transparent">
            Begin Your Journey
          </h1>
          <p className="text-gray-400 mt-2">
            Create an account to save progress, share reflections, and unlock cosmetics
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
