export function LineChart() {
  const data = [
    { day: "1", visits: 120 },
    { day: "5", visits: 150 },
    { day: "10", visits: 180 },
    { day: "15", visits: 140 },
    { day: "20", visits: 200 },
    { day: "25", visits: 220 },
    { day: "30", visits: 250 },
  ];

  const maxVisits = Math.max(...data.map((d) => d.visits));

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Daily Visits (30 Days)
      </h3>
      <div className="h-64 flex items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t hover:from-blue-700 hover:to-blue-500 transition-all duration-300 cursor-pointer"
              style={{ height: `${(item.visits / maxVisits) * 100}%` }}
              title={`Day ${item.day}: ${item.visits} visits`}
            />
            <span className="text-xs text-gray-600 mt-2">{item.day}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-600">Total: 1,260 visits</span>
        <span className="text-green-600 font-semibold">
          ↑ 15% vs last month
        </span>
      </div>
    </div>
  );
}

export function BarChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const tenants = [35, 38, 40, 42, 43, 45];
  const freeSpaces = [18, 15, 13, 11, 10, 8];

  const maxValue = 50;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Monthly Occupancy
      </h3>
      <div className="h-64 flex items-end justify-around">
        {months.map((month, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full flex justify-center space-x-1">
              <div
                className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t hover:from-green-700 hover:to-green-500 transition-all duration-300 cursor-pointer"
                style={{
                  height: `${(tenants[index] / maxValue) * 240}px`,
                  maxWidth: "60%",
                }}
                title={`Tenants: ${tenants[index]}`}
              />
              <div
                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t hover:from-blue-700 hover:to-blue-500 transition-all duration-300 cursor-pointer"
                style={{
                  height: `${(freeSpaces[index] / maxValue) * 240}px`,
                  maxWidth: "60%",
                }}
                title={`Free Spaces: ${freeSpaces[index]}`}
              />
            </div>
            <span className="text-xs text-gray-600 mt-2">{month}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-600">Tenants</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-600">Free Spaces</span>
        </div>
      </div>
    </div>
  );
}

export function DonutChart() {
  const data = [
    {
      label: "News & Events",
      value: 10,
      color: "text-green-600",
      bg: "bg-green-500",
    },
    {
      label: "Vacancies",
      value: 8,
      color: "text-purple-600",
      bg: "bg-purple-500",
    },
    {
      label: "Free Spaces",
      value: 6,
      color: "text-blue-600",
      bg: "bg-blue-500",
    },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Announcement Distribution
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-around">
        <div className="relative w-48 h-48">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10b981"
              strokeWidth="20"
              strokeDasharray={`${(data[0].value / total) * 251.2} 251.2`}
              strokeDashoffset="0"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="20"
              strokeDasharray={`${(data[1].value / total) * 251.2} 251.2`}
              strokeDashoffset={`-${(data[0].value / total) * 251.2}`}
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="20"
              strokeDasharray={`${(data[2].value / total) * 251.2} 251.2`}
              strokeDashoffset={`-${
                ((data[0].value + data[1].value) / total) * 251.2
              }`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{total}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-0 space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded ${item.bg}`}></div>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {item.label}
                </div>
                <div className="text-xs text-gray-600">
                  {item.value} announcements
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
