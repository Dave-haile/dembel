import QuickActions from '../components/QuickActions';
import ActivityFeed from '../components/ActivityFeed';
import AdminLayout from '../Shared/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import KPICards from '../components/KpiCards';
import { BarChart, DonutChart, LineChart } from '../components/Charts';

const Dashboard = () => {
  const { counts, tables, activities } = usePage().props;
  const quickActions = [
    {
      id: 'add-tenant',
      label: 'Add Tenant',
      color: 'blue',
      onClick: () => { router.visit('/admin/tenants') },
    },
    {
      id: 'add-space',
      label: 'Add Free Space',
      color: 'green',
      onClick: () => { router.visit('/admin/free-spaces') },
    },
    {
      id: 'add-announcement',
      label: 'Post Announcement',
      color: 'orange',
      onClick: () => { router.visit('/admin/news') },
    },
    {
      id: 'add-vacancy',
      label: 'Add Vacancy',
      color: 'purple',
      onClick: () => { router.visit('/admin/vacancies') },
    },
  ];


  return (
    <AdminLayout>
      <Head title="Dashboard" />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        <KPICards tables={tables} counts={counts} />

        <QuickActions actions={quickActions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart />
          <BarChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DonutChart
            />
          </div>
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
