import QuickActions from '../components/QuickActions';
import DataTable from '../components/DataTable';
import ActivityFeed from '../components/ActivityFeed';
import AdminLayout from '../Shared/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
import KPICards from '../components/KpiCards';
import { BarChart, DonutChart, LineChart } from '../components/Charts';

const Dashboard = () => {
  const { counts, tables, tenants, activities } = usePage().props;
  console.log('activities', activities)
  console.log('tenants', tenants);

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

  const tenantColumns = [
    { key: 'name', label: 'Tenant Name' },
    { key: 'unit', label: 'Unit' },
    {
      key: 'category',
      label: 'Category',
      render: (value) => (value && typeof value === 'object' ? value.name ?? '—' : value ?? '—'),
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${value === 'Active'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
            }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'rent',
      label: 'Rent',
      render: (value) => {
        const num = Number(value);
        return Number.isFinite(num) ? `$${num.toLocaleString()}` : '—';
      },
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

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Tenants</h2>
          <DataTable
            columns={tenantColumns}
            data={tenants}
            itemsPerPage={5}
            onEdit={(item) => console.log('Edit', item)}
            onDelete={(item) => console.log('Delete', item)}
            onView={(item) => console.log('View', item)}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
