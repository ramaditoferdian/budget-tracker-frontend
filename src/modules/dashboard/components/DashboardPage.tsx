import BigCalendar from '@/modules/dashboard/components/BigCalendar';
import DailyExpenseSummary from '@/modules/dashboard/components/DailyExpenseSummary';
import ExpenseAnalysis from '@/modules/dashboard/components/ExpenseAnalysis';

const DashboardPage = () => {
  return (
    <div className="w-full flex flex-col md:flex-row">
      <BigCalendar />
      <div className="w-full overflow-y-scroll" />
    </div>
  );
};

export default DashboardPage;
