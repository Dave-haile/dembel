const StatCard = ({ label, value, className }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className={`text-3xl font-bold ${className || 'text-gray-800'}`}>{value}</p>
  </div>
);

const StatsGrid = ({ counts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard label="Total Spaces" value={counts.count} />
      <StatCard label="Available" value={counts.available} className="text-green-600" />
      <StatCard label="Reserved" value={counts.reserved} className="text-yellow-600" />
      <StatCard label="Occupied" value={counts.occupied} className="text-red-600" />
    </div>
  );
};

export default StatsGrid;
