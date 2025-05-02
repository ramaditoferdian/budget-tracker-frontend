import BigCalendar from '@/modules/dashboard/components/BigCalendar';
import Summary from './Summary';

const DashboardPage = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row pb-16">
      <Summary />
      <BigCalendar />
    </div>
  );
};

export default DashboardPage;
