// Tenants
export const initialTenants = [
  {
    id: 4,
    category_id: 4,
    name: "Apple Store",
    description:
      "Latest iPhones, MacBooks, iPads, and premium tech accessories.",
    logo: "https://via.placeholder.com/100?text=Apple",
    location: "Tech Hub",
    hours: "10:00 AM - 9:00 PM",
    fullDescription: "Discover the full range of Apple products...",
    floor: "1st Floor",
    phone: "+1 (555) 456-7890",
    email: "dembel@apple.com",
    website: "www.apple.com",
    category: { id: 4, name: "Electronics", icon: "📱" },
  },
];

// Free Spaces
export const initialFreeSpaces = [
  {
    id: 1,
    name: "Office Space A1",
    floor_id: 1,
    wing_or_zone: "North Wing",
    area_sqm: "50.00",
    dimensions: "5m x 10m",
    has_window: true,
    has_ventilation: true,
    has_plumbing: false,
    has_electricity: true,
    features: [
      "Air Conditioning",
      "High-Speed Internet",
      "Conference Room Access",
    ],
    monthly_rent: "1200.00",
    rent_currency: "USD",
    rent_includes: ["Utilities", "Maintenance"],
    negotiable: true,
    thumbnail: "https://via.placeholder.com/300x200?text=Office+A1",
    gallery: [],
    virtual_tour_url: "https://virtualtour.example.com/office_a1",
    short_description: "A modern office space...",
    full_description: "This office space offers...",
    contact_person: "Jane Doe",
    contact_phone: "+1 (555) 123-4567",
    contact_email: "jane.doe@example.com",
    availability_status: "available",
    floor: { id: 1, name: "Ground Floor" },
  },
];

// Vacancies
export const initialVacancies = [
  {
    id: 5,
    title: "Retail Sales Associate",
    department: "Retail",
    employment_type: "Part-time",
    work_location: "Dembel City Center, Addis Ababa",
    salary_min: 5000,
    salary_max: 7000,
    currency: "ETB",
    job_description: "Assist customers with product selection...",
    requirements: "High school diploma; Previous retail experience...",
    benefits: "Staff discounts, flexible schedule...",
    how_to_apply: "Submit your CV to hr@dembelmall.com...",
    posted_date: "2025-10-09",
    closing_date: "2025-10-23",
    number_of_positions: 4,
    contact_email: "hr@dembelmall.com",
    contact_phone: "+251911223344",
    address: "Dembel City Center, 2nd Floor, HR Office",
    is_approved: 1,
    thumbnail: "https://via.placeholder.com/300x200?text=Vacancy",
  },
];
