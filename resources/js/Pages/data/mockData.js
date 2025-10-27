export const mockTenants = [
  { id: 1, name: "Zara", unit: "A-101", category: "Fashion", status: "Active", rent: 5000, contact: "zara@mall.com", floor: 1 },
  { id: 2, name: "Starbucks", unit: "B-205", category: "Food & Beverage", status: "Active", rent: 3500, contact: "starbucks@mall.com", floor: 2 },
  { id: 3, name: "Nike Store", unit: "A-103", category: "Sports", status: "Active", rent: 4500, contact: "nike@mall.com", floor: 1 },
  { id: 4, name: "Apple Store", unit: "C-301", category: "Electronics", status: "Active", rent: 8000, contact: "apple@mall.com", floor: 3 },
  { id: 5, name: "H&M", unit: "A-105", category: "Fashion", status: "Pending", rent: 4200, contact: "hm@mall.com", floor: 1 },
  { id: 6, name: "Cinnabon", unit: "B-210", category: "Food & Beverage", status: "Active", rent: 2800, contact: "cinnabon@mall.com", floor: 2 },
];

export const mockFreeSpaces = [
  { id: 1, unit: "A-102", floor: 1, size: "1200 sq ft", type: "Retail", rent: 4000, available: true },
  { id: 2, unit: "B-208", floor: 2, size: "800 sq ft", type: "Food Court", rent: 3000, available: true },
  { id: 3, unit: "C-305", floor: 3, size: "1500 sq ft", type: "Entertainment", rent: 5500, available: true },
  { id: 4, unit: "A-110", floor: 1, size: "950 sq ft", type: "Retail", rent: 3800, available: true },
];

export const mockVacancies = [
  { id: 1, title: "Store Manager", department: "Operations", type: "Full-time", posted: "2024-10-15", applicants: 12 },
  { id: 2, title: "Security Officer", department: "Security", type: "Full-time", posted: "2024-10-12", applicants: 24 },
  { id: 3, title: "Custodian", department: "Maintenance", type: "Part-time", posted: "2024-10-10", applicants: 8 },
  { id: 4, title: "Customer Service Rep", department: "Customer Service", type: "Full-time", posted: "2024-10-08", applicants: 18 },
];

export const mockAnnouncements = [
  { id: 1, title: "Mall Renovation Notice", type: "News", date: "2024-10-18", status: "Published" },
  { id: 2, title: "New Parking Policy", type: "Announcement", date: "2024-10-15", status: "Published" },
  { id: 3, title: "Hiring Event Next Week", type: "Vacancy", date: "2024-10-12", status: "Draft" },
  { id: 4, title: "Space Available - Ground Floor", type: "Free Space", date: "2024-10-10", status: "Published" },
];

export const mockServices = [
  { id: 1, name: "WiFi", description: "Free high-speed internet", category: "Technology", status: "Active" },
  { id: 2, name: "Valet Parking", description: "Premium parking service", category: "Parking", status: "Active" },
  { id: 3, name: "Customer Lounge", description: "Comfortable waiting area", category: "Amenity", status: "Active" },
  { id: 4, name: "Kids Play Area", description: "Supervised play zone", category: "Entertainment", status: "Active" },
];

export const mockGallery = [
  { id: 1, url: "https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Mall Entrance", category: "Exterior" },
  { id: 2, url: "https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Food Court", category: "Interior" },
  { id: 3, url: "https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Shopping Area", category: "Interior" },
  { id: 4, url: "https://images.pexels.com/photos/264507/pexels-photo-264507.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Parking Lot", category: "Exterior" },
  { id: 5, url: "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Store Interior", category: "Interior" },
  { id: 6, url: "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Night View", category: "Exterior" },
];

export const mockUsers = [
  { id: 1, name: "John Admin", email: "john@mall.com", role: "Admin", status: "Active", joined: "2024-01-15" },
  { id: 2, name: "Sarah Manager", email: "sarah@mall.com", role: "Manager", status: "Active", joined: "2024-03-20" },
  { id: 3, name: "Mike Staff", email: "mike@mall.com", role: "Staff", status: "Active", joined: "2024-06-10" },
];

export const mockApplications = [
  { id: 1, applicant: "Emma Wilson", position: "Store Manager", applied: "2024-10-15", status: "Under Review", email: "emma@email.com" },
  { id: 2, applicant: "David Chen", position: "Security Officer", applied: "2024-10-14", status: "Interview", email: "david@email.com" },
  { id: 3, applicant: "Lisa Brown", position: "Customer Service Rep", applied: "2024-10-12", status: "Pending", email: "lisa@email.com" },
];

export const mockCategories = [
  { id: 1, name: "Fashion", count: 25, description: "Clothing and accessories" },
  { id: 2, name: "Food & Beverage", count: 18, description: "Restaurants and cafes" },
  { id: 3, name: "Electronics", count: 12, description: "Tech stores" },
  { id: 4, name: "Sports", count: 8, description: "Sports equipment and apparel" },
];

export const mockContacts = [
  { id: 1, name: "Info Desk", email: "info@mall.com", phone: "+1 234 567 8900", department: "Customer Service" },
  { id: 2, name: "Security", email: "security@mall.com", phone: "+1 234 567 8901", department: "Security" },
  { id: 3, name: "Maintenance", email: "maintenance@mall.com", phone: "+1 234 567 8902", department: "Maintenance" },
];

export const mockDepartments = [
  { id: 1, name: "Operations", head: "John Smith", employees: 45, budget: "$250,000" },
  { id: 2, name: "Security", head: "Mike Johnson", employees: 30, budget: "$180,000" },
  { id: 3, name: "Customer Service", head: "Sarah Williams", employees: 20, budget: "$120,000" },
  { id: 4, name: "Maintenance", head: "Tom Davis", employees: 25, budget: "$150,000" },
];

export const mockNews = [
  { id: 1, title: "Grand Opening of New Wing", date: "2024-10-20", author: "Admin", content: "Exciting new expansion..." },
  { id: 2, title: "Black Friday Sale Event", date: "2024-10-18", author: "Marketing", content: "Biggest sale of the year..." },
  { id: 3, title: "Holiday Hours Announced", date: "2024-10-15", author: "Admin", content: "Special timing for holidays..." },
];

export const mockEvents = [
  { id: 1, name: "Fashion Show 2024", date: "2024-11-05", location: "Central Court", attendees: 250 },
  { id: 2, name: "Kids Carnival", date: "2024-11-12", location: "Ground Floor", attendees: 180 },
  { id: 3, name: "Food Festival", date: "2024-11-20", location: "Food Court", attendees: 320 },
];

export const mockFloors = [
  { id: 1, number: "Ground Floor", tenants: 28, freeSpaces: 4, area: "45,000 sq ft" },
  { id: 2, number: "First Floor", tenants: 32, freeSpaces: 2, area: "48,000 sq ft" },
  { id: 3, number: "Second Floor", tenants: 24, freeSpaces: 5, area: "42,000 sq ft" },
  { id: 4, number: "Third Floor", tenants: 18, freeSpaces: 3, area: "38,000 sq ft" },
];

export const mockSlides = [
  { id: 1, title: "Summer Sale 2024", image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=800", order: 1, active: true },
  { id: 2, title: "New Store Opening", image: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=800", order: 2, active: true },
  { id: 3, title: "Weekend Special", image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=800", order: 3, active: false },
];

export const mockTeam = [
  { id: 1, name: "James Anderson", position: "General Manager", photo: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400", department: "Management" },
  { id: 2, name: "Emily Roberts", position: "Operations Director", photo: "https://images.pexels.com/photos/3765114/pexels-photo-3765114.jpeg?auto=compress&cs=tinysrgb&w=400", department: "Operations" },
  { id: 3, name: "Michael Lee", position: "Security Chief", photo: "https://images.pexels.com/photos/3771839/pexels-photo-3771839.jpeg?auto=compress&cs=tinysrgb&w=400", department: "Security" },
];

export const mockMalls = [
  { id: 1, name: "Grand Plaza Mall", location: "Downtown", floors: 4, tenants: 102, status: "Operational" },
  { id: 2, name: "Sunset Shopping Center", location: "West Side", floors: 3, tenants: 78, status: "Operational" },
];

export const mockActivities = [
  { id: 1, type: "tenant", message: "New tenant 'Nike Store' added", timestamp: "2 hours ago", user: "Admin" },
  { id: 2, type: "space", message: "Free space A-102 updated", timestamp: "4 hours ago", user: "Manager" },
  { id: 3, type: "announcement", message: "New announcement posted", timestamp: "6 hours ago", user: "Admin" },
  { id: 4, type: "vacancy", message: "New job vacancy created", timestamp: "1 day ago", user: "HR" },
  { id: 5, type: "service", message: "WiFi service activated", timestamp: "2 days ago", user: "IT" },
];

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
