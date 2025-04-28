import LoginPage from '@/modules/auth/components/LoginPage';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Login';

  return {
    title: `${pageTitle} - Budget Tracker`,
    description: `Please login to access your Budget Tracker account.`,
  };
}

const Login = () => {
  return <LoginPage />;
};

export default Login;
