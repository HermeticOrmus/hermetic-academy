import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign In | Hermetic Academy",
  description: "Sign in to save your progress and join the community",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cosmic-purple via-cosmic-gold to-cosmic-purple bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-400 mt-2">
            Sign in to continue your journey through the 7 Hermetic Principles
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
