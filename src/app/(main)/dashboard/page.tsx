import { Metadata } from 'next';
import DashboardPage from '@/modules/dashboard/components/DashboardPage';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View your financial overview, income, and expenses in one place.',
};

const Dashboard = () => {
  return <DashboardPage />;
};

export default Dashboard;
