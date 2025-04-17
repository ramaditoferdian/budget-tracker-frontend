import LoginForm from "@/modules/auth/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login to BudgetTracker</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your email and password to continue
          </p>
        </div>

        <LoginForm />

        <p className="text-center text-xs text-muted-foreground">
          Don’t have an account? <Link href="/register" className="underline hover:text-foreground">Register</Link>
        </p>
      </div>
    </main>
  );
}
