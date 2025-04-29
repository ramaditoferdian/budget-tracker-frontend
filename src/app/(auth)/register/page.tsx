import RegisterPage from '@/modules/auth/components/RegisterPage';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const pageTitle = 'Register';

  return {
    title: `${pageTitle} - Budget Tracker`,
    description: `Please register to access your Budget Tracker account.`,
  };
}

const Register = () => {
  return <RegisterPage />;
};

export default Register;
