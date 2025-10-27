export default function StatsCards({ count = 0 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-9">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">Total Tenants</p>
        <p className="text-3xl font-bold text-gray-800">{count || 0}</p>
      </div>
    </div>
  );
}
