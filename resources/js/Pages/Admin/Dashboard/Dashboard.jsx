// import { useState } from "react";
// import KPICards from "../components/KPICards";
// import { LineChart, BarChart, DonutChart } from "../components/Charts";
// import QuickActions from "../components/QuickActions";
// import TenantsTable from "../components/TenantsTable";
// import ActivityFeed from "../components/ActivityFeed";
// import { Head, usePage } from "@inertiajs/react";
// import AdminLayout from "../Shared/AdminLayout";

// export default function Dashboard() {
//   const { counts, tables, tenants, activities } = usePage().props;
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [currentPage, setCurrentPage] = useState("dashboard");

//   return (
//     <AdminLayout
//       currentPage={currentPage}
//       setCurrentPage={setCurrentPage}
//       setSidebarOpen={setSidebarOpen}
//       sidebarOpen={sidebarOpen}
//     >
//       <Head title="Dashboard" />
//       <div className="p-6 space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//             <p className="text-gray-600 mt-1">
//               Welcome back, Admin! Here&apos;s what&apos;s happening today.
//             </p>
//           </div>
//           <div className="text-sm text-gray-600">
//             {new Date().toLocaleDateString("en-US", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </div>
//         </div>

//         <KPICards tables={tables} counts={counts} />

//         <QuickActions />

//         <div className="grid lg:grid-cols-2 gap-6">
//           <LineChart />
//           <BarChart />
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2">
//             <DonutChart />
//           </div>
//           <ActivityFeed activities={activities} />
//         </div>
//         <TenantsTable tenants={tenants} />

//         <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="mb-4 md:mb-0">
//               <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
//               <p className="text-blue-100">
//                 Contact support for any assistance with the admin panel
//               </p>
//             </div>
//             <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105">
//               Contact Support
//             </button>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

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
