import RegisterForm from "@/modules/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Register to BudgetTracker</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your email and password to register
          </p>
        </div>

        <RegisterForm />

        <p className="text-center text-xs text-muted-foreground">
          Already have an account? <a href="/register" className="underline hover:text-foreground">Login</a>
        </p>
      </div>
    </main>
  );
}
