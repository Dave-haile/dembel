
export const chartData = {
  dailyVisits: [
    { day: "Day 1", visits: 1200 },
    { day: "Day 5", visits: 1450 },
    { day: "Day 10", visits: 1300 },
    { day: "Day 15", visits: 1600 },
    { day: "Day 20", visits: 1800 },
    { day: "Day 25", visits: 1550 },
    { day: "Day 30", visits: 1900 },
  ],
  monthlyOccupancy: [
    { month: "Jan", tenants: 95, freeSpaces: 12 },
    { month: "Feb", tenants: 98, freeSpaces: 9 },
    { month: "Mar", tenants: 102, freeSpaces: 5 },
    { month: "Apr", tenants: 100, freeSpaces: 7 },
    { month: "May", tenants: 105, freeSpaces: 4 },
    { month: "Jun", tenants: 102, freeSpaces: 5 },
  ],
  announcementDistribution: [
    { type: "News", count: 45 },
    { type: "Vacancy", count: 28 },
    { type: "Free Space", count: 35 },
  ],
};


export const LineChart = () => {
  const maxVisits = Math.max(...chartData.dailyVisits.map(d => d.visits));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Daily Visits Trend</h3>
      <div className="h-64 flex items-end justify-between gap-2">
        {chartData.dailyVisits.map((data, index) => {
          const height = (data.visits / maxVisits) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden relative group">
                <div
                  className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-500 hover:to-blue-300"
                  style={{ height: `${height * 2}px` }}
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {data.visits} visits
                </div>
              </div>
              <span className="text-xs text-gray-500">{data.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const BarChart = () => {
  const maxValue = Math.max(
    ...chartData.monthlyOccupancy.flatMap(d => [d.tenants, d.freeSpaces])
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Monthly Occupancy</h3>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded"></div>
          <span className="text-sm text-gray-600">Tenants</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Free Spaces</span>
        </div>
      </div>
      <div className="h-64 flex items-end justify-between gap-4">
        {chartData.monthlyOccupancy.map((data, index) => {
          const tenantsHeight = (data.tenants / maxValue) * 100;
          const spacesHeight = (data.freeSpaces / maxValue) * 100;

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex gap-1 items-end">
                <div className="flex-1 bg-gray-100 rounded-t-lg overflow-hidden group relative">
                  <div
                    className="bg-blue-600 rounded-t-lg transition-all duration-500 hover:bg-blue-500"
                    style={{ height: `${tenantsHeight * 2}px` }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {data.tenants}
                  </div>
                </div>
                <div className="flex-1 bg-gray-100 rounded-t-lg overflow-hidden group relative">
                  <div
                    className="bg-green-500 rounded-t-lg transition-all duration-500 hover:bg-green-400"
                    style={{ height: `${spacesHeight * 2}px` }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {data.freeSpaces}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">{data.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const DonutChart = () => {
  const total = chartData.announcementDistribution.reduce((sum, item) => sum + item.count, 0);
  const colors = ['#3B82F6', '#10B981', '#F59E0B'];

  let currentAngle = 0;
  const segments = chartData.announcementDistribution.map((item, index) => {
    const percentage = (item.count / total) * 100;
    const angle = (item.count / total) * 360;
    const segment = {
      ...item,
      percentage,
      startAngle: currentAngle,
      angle,
      color: colors[index],
    };
    currentAngle += angle;
    return segment;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Announcement Distribution</h3>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 200 200" className="transform -rotate-90">
            {segments.map((segment, index) => {
              const radius = 80;
              const innerRadius = 50;
              const startAngle = (segment.startAngle * Math.PI) / 180;
              const endAngle = ((segment.startAngle + segment.angle) * Math.PI) / 180;

              const x1 = 100 + radius * Math.cos(startAngle);
              const y1 = 100 + radius * Math.sin(startAngle);
              const x2 = 100 + radius * Math.cos(endAngle);
              const y2 = 100 + radius * Math.sin(endAngle);

              const x3 = 100 + innerRadius * Math.cos(endAngle);
              const y3 = 100 + innerRadius * Math.sin(endAngle);
              const x4 = 100 + innerRadius * Math.cos(startAngle);
              const y4 = 100 + innerRadius * Math.sin(startAngle);

              const largeArc = segment.angle > 180 ? 1 : 0;

              const pathData = `
                M ${x1} ${y1}
                A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
                L ${x3} ${y3}
                A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
                Z
              `;

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={segment.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{total}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-sm font-medium text-gray-700">{segment.type}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{segment.count}</p>
                <p className="text-xs text-gray-500">{segment.percentage.toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
