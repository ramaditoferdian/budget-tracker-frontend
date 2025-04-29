'use client';

import { useState } from 'react';
import { Info, Lightbulb, Wallet, ArrowRight, CheckCircle2, Tag, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import SourceFormDialog from '@/modules/settings/components/SourceForm';
import SourceList from '@/modules/settings/components/SourceList';
import TransactionTypeList from '@/modules/settings/components/TransactionTypeList';
import CategoryForm from '@/modules/settings/components/CategoryForm';
import CategoryList from '@/modules/settings/components/CategoryList';
import { useSession } from '@/modules/auth/hooks/useSession';
import Loading from '@/components/Loading';
import { redirect } from 'next/navigation';
import { useCompleteOnboarding } from '@/modules/auth/hooks/useAuth';

const GettingStarted = () => {
  const { user, isLoading: isLoadingUser } = useSession();
  const { mutate, isPending } = useCompleteOnboarding();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = () => {
    mutate();
  };

  if (isLoadingUser) {
    return <Loading />;
  }

  if (!user) {
    redirect('/login');
  }

  if (!user.isFirstTimeLogin) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl space-y-8">
        {/* Progress indicator */}
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index + 1 <= currentStep ? 'bg-primary w-8' : 'bg-muted w-4'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Introduction */}
        {currentStep === 1 && (
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-xl font-medium">
                  Welcome to Your Budget Tracker
                </CardTitle>
              </div>
              <CardDescription>
                Let's set up your personal finance system in a few simple steps. Each step is
                optional but will help you get the most out of your budget tracker.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">What is a budget tracker?</h3>
                    <p className="text-sm text-muted-foreground">
                      A budget tracker helps you monitor your income and expenses, giving you
                      insights into your spending habits and helping you reach your financial goals.
                    </p>
                  </div>
                </div>

                <Separator className="my-3" />

                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">How this setup works</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll guide you through setting up your sources of funds, transaction types,
                      and categories. You can always modify these later in settings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">What you'll set up:</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                    <span>Sources of funds (bank accounts, cash, etc.)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span>Transaction types (income, expense, savings)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                    <span>Categories (groceries, utilities, salary, etc.)</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end pt-2">
              <Button onClick={nextStep} className="gap-1">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Sources of Funds */}
        {currentStep === 2 && (
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-xl font-medium">Sources of Funds</CardTitle>
              </div>
              <CardDescription>
                Add the accounts or places where your money is stored. This helps track where money
                comes from and goes to.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">What are sources?</h3>
                    <p className="text-sm text-muted-foreground">
                      Sources are the accounts or places where your money is stored, such as bank
                      accounts, cash wallets, or investment accounts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <SourceFormDialog />
                <SourceList />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>Continue</Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Transaction Types */}
        {currentStep === 3 && (
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-xl font-medium">Transaction Types</CardTitle>
              </div>
              <CardDescription>
                Define the types of transactions you'll track, such as income, expenses, and
                savings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">What are transaction types?</h3>
                    <p className="text-sm text-muted-foreground">
                      Transaction types help categorize your money movements at the highest level.
                      Typically, these include income (money coming in), expenses (money going out),
                      and savings (money set aside).
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <TransactionTypeList />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>Continue</Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Categories */}
        {currentStep === 4 && (
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                <PieChart className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-xl font-medium">Categories</CardTitle>
              </div>
              <CardDescription>
                Set up categories to organize your transactions and gain insights into your spending
                patterns.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">What are categories?</h3>
                    <p className="text-sm text-muted-foreground">
                      Categories help you organize transactions by purpose or type. For example, you
                      might have categories like "Groceries," "Utilities," or "Salary." This makes
                      it easier to analyze your spending habits.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <CategoryForm />
                <CategoryList />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={handleComplete} disabled={isPending} className="gap-1">
                Complete Setup <CheckCircle2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  );
};

export default GettingStarted;
