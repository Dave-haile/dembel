<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // $this->call(CategorySeeder::class);
        // DB::table('users')->insert([
        //     [
        //         'name' => 'Admin User',
        //         'email' => 'admin@company.com',
        //         'email_verified_at' => now(),
        //         'phone' => '+251911223344',
        //         'avatar' => 'users/default.png',
        //         'role' => 'admin',
        //         'check' => true,
        //         'password' => Hash::make('password123'),
        //     ],
        //     [
        //         'name' => 'Content Manager',
        //         'email' => 'content@company.com',
        //         'email_verified_at' => now(),
        //         'phone' => '+251922334455',
        //         'avatar' => 'users/default.png',
        //         'role' => 'manager',
        //         'check' => true,
        //         'password' => Hash::make('password123'),
        //     ],
        //     [
        //         'name' => 'Regular User',
        //         'email' => 'user@company.com',
        //         'email_verified_at' => now(),
        //         'phone' => '+251933445566',
        //         'avatar' => 'users/default.png',
        //         'role' => 'user',
        //         'check' => false,
        //         'password' => Hash::make('password123'),
        //     ]
        // ]);
        $sliders = [
            [
                'title_en' => 'Welcome to Our Platform',
                'title_am' => 'Բարի գալուստ մեր պլատֆորմ',
                'image' => 'sliders/welcome-banner.jpg',
                'priority' => 1,
                'created_by' => 1,
                'approval' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Special Offers',
                'title_am' => 'Հատուկ առաջարկներ',
                'image' => 'sliders/special-offers.jpg',
                'priority' => 2,
                'created_by' => 1,
                'approval' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'New Arrivals',
                'title_am' => 'Նոր ժամանումներ',
                'image' => 'sliders/new-arrivals.jpg',
                'priority' => 3,
                'created_by' => 1,
                'approval' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Summer Collection',
                'title_am' => 'Ամառային հավաքածու',
                'image' => 'sliders/summer-collection.jpg',
                'priority' => 4,
                'created_by' => 1,
                'approval' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Limited Time Deal',
                'title_am' => 'Սահմանափակ ժամկետով գործարք',
                'image' => 'sliders/limited-deal.jpg',
                'priority' => 5,
                'created_by' => 1,
                'approval' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Premium Services',
                'title_am' => 'Պրեմիում ծառայություններ',
                'image' => null,
                'priority' => 0,
                'created_by' => 1,
                'approval' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Customer Reviews',
                'title_am' => 'Հաճախորդների ակնարկներ',
                'image' => 'sliders/customer-reviews.jpg',
                'priority' => 6,
                'created_by' => 1,
                'approval' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Join Our Community',
                'title_am' => 'Միացեք մեր համայնքին',
                'image' => 'sliders/join-community.jpg',
                'priority' => 7,
                'created_by' => 1,
                'approval' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        $gallery = [
            [
                'title' => 'Grand Atrium',
                'category' => 'Architecture',
                'floor_id' => 1,
                'sector' => 'Main Hall',
                'description' => 'The stunning central atrium with natural lighting and modern design elements',
                'image' => 'gallery/image001.jpg',
                'approval' => true,
                'created_by' => 1,
            ],
            [
                'title' => 'Fashion District',
                'category' => 'Shopping',
                'floor_id' => 2,
                'sector' => 'Fashion Zone',
                'description' => 'Premium fashion stores and boutiques featuring international brands',
                'image' => 'gallery/image002.jpg',
                'approval' => true,
                'created_by' => 1,
            ],
            [
                'title' => 'Food Court Experience',
                'category' => 'Dining',
                'floor_id' => 3,
                'sector' => 'Food Court',
                'description' => 'Diverse dining options in our modern food court with international cuisine',
                'image' => 'gallery/image003.jpg',
                'approval' => true,
                'created_by' => 1,
            ],
            [
                'title' => 'Holiday Celebration',
                'category' => 'Events',
                'floor_id' => 1,
                'sector' => 'Central Plaza',
                'description' => 'Annual holiday decorations and festivities bringing joy to visitors',
                'image' => 'gallery/image004.jpg',
                'approval' => true,
                'created_by' => 1,
            ],
            [
                'title' => 'Luxury Retail Space',
                'category' => 'Shopping',
                'floor_id' => 2,
                'sector' => 'Luxury Wing',
                'description' => 'High-end retail spaces with modern design and premium shopping experience',
                'image' => 'gallery/image005.jpg',
                'approval' => true,
                'created_by' => 1,
            ],
            [
                'title' => 'Rooftop Dining',
                'category' => 'Dining',
                'floor_id' => 4,
                'sector' => 'Rooftop',
                'description' => 'Elegant rooftop restaurant with panoramic city views and fine dining',
                'image' => 'gallery/image006.jpg',
                'approval' => true,
                'created_by' => 1,
            ],
            [
                'title' => 'Modern Architecture',
                'category' => 'Architecture',
                'floor_id' => 1,
                'sector' => 'Entrance',
                'description' => 'Contemporary architectural design elements showcasing modern mall aesthetics',
                'image' => 'gallery/image019.jpg',
                'approval' => true,
                'created_by' => 1,
            ],
            [
                'title' => 'Fashion Show Event',
                'category' => 'Events',
                'floor_id' => 1,
                'sector' => 'Event Hall',
                'description' => 'Annual fashion week showcase featuring latest trends and designer collections',
                'image' => 'gallery/image014.jpg',
                'approval' => true,
                'created_by' => 1,
            ],
            [
                'title' => 'Boutique Shopping',
                'category' => 'Shopping',
                'floor_id' => 2,
                'sector' => 'Boutique Area',
                'description' => 'Curated boutique shopping experience with unique and exclusive brands',
                'image' => 'gallery/image013.jpg',
                'approval' => true,
                'created_by' => 1,
            ],
            [
                'title' => 'Café Culture',
                'category' => 'Dining',
                'floor_id' => 2,
                'sector' => 'Café Corner',
                'description' => 'Artisan coffee culture and casual dining in a relaxed atmosphere',
                'image' => 'gallery/image020.jpg',
                'approval' => true,
                'created_by' => 1,
            ],
            [
                'title' => 'Glass Ceiling',
                'category' => 'Architecture',
                'floor_id' => 3,
                'sector' => 'Skylight Area',
                'description' => 'Stunning glass ceiling architecture allowing natural light throughout the mall',
                'image' => 'gallery/image022.jpg',
                'approval' => true,
                'created_by' => 1,
            ],
            [
                'title' => 'Live Music Event',
                'category' => 'Events',
                'floor_id' => 1,
                'sector' => 'Performance Stage',
                'description' => 'Live entertainment and cultural events bringing community together',
                'image' => 'gallery/image012.jpg',
                'approval' => true,
                'created_by' => 1,
            ],
            [
                'title' => 'Modern Office Spaces',
                'floor_id' => 2, // First Floor
                'category' => 'Office',
                'sector' => 2,
                'description' => 'Beautifully designed modern office spaces with natural lighting',
                'image' => 'gallery/office-spaces.jpg',
                'approval' => true,
                'created_by' => 1
            ],
            [
                'title' => 'Conference Rooms',
                'floor_id' => 4, // Third Floor
                'category' => 'Dining',
                'sector' => 3,
                'description' => 'State-of-the-art conference and meeting rooms',
                'image' => 'gallery/conference-rooms.jpg',
                'approval' => true,
                'created_by' => 2
            ],
            [
                'title' => 'Recreational Areas',
                'floor_id' => 6, // Fifth Floor
                'category' => 'Office',
                'sector' => null, // Added missing key
                'description' => 'Comfortable break rooms and recreational spaces',
                'image' => 'gallery/break-areas.jpg',
                'approval' => false,
                'created_by' => 1
            ],
            [
                'title' => 'Executive Boardroom',
                'floor_id' => 8, // Penthouse
                'category' => 'Office',
                'sector' => 4,
                'description' => 'Luxurious boardroom for executive meetings',
                'image' => 'gallery/boardroom.jpg',
                'approval' => true,
                'created_by' => 2
            ],
            [
                'title' => 'Main Lobby',
                'floor_id' => 1, // Ground Floor
                'category' => 'Shopping',
                'sector' => null, // Added missing key
                'description' => 'Spacious and welcoming main lobby area',
                'image' => 'gallery/main-lobby.jpg',
                'approval' => true,
                'created_by' => 1
            ]
        ];
        $news = [
            [
                'category' => 'Events',
                'title_en' => 'Annual Company Retreat 2024',
                'title_am' => 'ዓመታዊ የኩባንያ ስብሰባ 2024',
                'sub_title_en' => 'Join us for our upcoming team building event',
                'sub_title_am' => 'ለሚመጣው የቡድን ግንባታ ክስተታችን ይቀላቀሉን',
                'description_en' => 'We are excited to announce our annual company retreat scheduled for next month. This event will focus on team building and strategic planning for the upcoming year.',
                'description_am' => 'ለሚቀጥለው ወር የታሰበውን ዓመታዊ የኩባንያ ስብሰባችን ለማስተዋወቅ ተለዛጅተናል። ይህ ዝግጅት በቡድን ግንባታ እና ለሚመጣው ዓመት በስትራቴጂክ ዕቅድ ላይ ያተኮረ ነው።',
                'image' => 'news/retreat-2024.jpg',
                'pdf_file' => 'retreat-schedule.pdf',
                'created_by' => 1,
                'approval' => true
            ],
            [
                'category' => 'Updates',
                'title_en' => 'New Office Location Opening',
                'title_am' => 'አዲስ የቢሮ መቀመጫ ክፈት',
                'sub_title_en' => 'Expanding our services to new regions',
                'sub_title_am' => 'አገልግሎታችንን ወደ አዲስ ክልሎች ማስፋፋት',
                'description_en' => 'We are proud to announce the opening of our new office location in the heart of the city, providing better access to our clients and partners.',
                'description_am' => 'ከደምበኞቻችን እና ከጉልበተኞቻችን ጋር የተሻለ መዳረሻ ለማቅረብ በከተማዋ ማዕከል አዲስ የቢሮ መቀመጫ መከፈታችንን ለማስተዋወቅ እንትሞጣለን።',
                'image' => 'news/new-office.jpg',
                'pdf_file' => null,
                'created_by' => 2,
                'approval' => true
            ]
        ];

        $service = [
            [
                'title_en' => 'Office Space Rental',
                'title_am' => 'የቢሮ ቦታ ኪራይ',
                'sub_title_en' => 'Flexible office solutions for businesses',
                'sub_title_am' => 'ለንግድ ድርጅቶች ተለዋዋጭ የቢሮ መፍትሄዎች',
                'description_en' => 'We offer fully furnished office spaces with modern amenities, high-speed internet, and 24/7 security. Perfect for startups and established businesses.',
                'description_am' => 'ሙሉ በሙሉ የተገነቡ የቢሮ ቦታዎችን ከዘመናዊ አገልግሎቶች፣ ከፍተኛ ፍጥነት ያለው ኢንተርኔት እና 24/7 ደህንነት እናቀርባለን። ለጀማሪ እና ለተመሠረቱ ንግዶች ተስማሚ።',
                'image' => 'service/office-rental.jpg',
                'approval' => true,
                'created_by' => 1
            ],
            [
                'title_en' => 'Meeting Room Booking',
                'title_am' => 'የመገናኛ ክፍል ቀጠሮ',
                'sub_title_en' => 'Professional spaces for your important meetings',
                'sub_title_am' => 'ለአስፈላጊ ስብሰባዎችዎ ሙያዊ ቦታዎች',
                'description_en' => 'Book our professionally equipped meeting rooms for your presentations, client meetings, and team discussions. Available in various sizes to suit your needs.',
                'description_am' => 'ለዝግጅትዎ፣ ለደምበኞች ስብሰባ እና ለቡድን ውይይቶች የተጠናከረ የሆኑ የመገናኛ ክፍሎቻችንን ያስይዙ። እንደ ፍላጎትዎ በተለያዩ መጠኖች ይገኛሉ።',
                'image' => 'service/meeting-rooms.jpg',
                'approval' => true,
                'created_by' => 2
            ]
        ];
        $events = [
            [
                'title_en' => 'Summer Fashion Week',
                'title_am' => 'የበጋ ፋሽን ሳምንት',
                'sub_title_en' => 'Citywide Showcase',
                'sub_title_am' => 'ከተማ ደረጃ ትዕይንት',
                'description_en' => 'Join us for an exclusive fashion showcase featuring the latest collections from premier brands.',
                'description_am' => 'ከፍተኛ ምርቶች የቅርብ ስብስቦችን የሚያቀርብ የፋሽን ትዕይንት ይቀላቀሉን።',
                'image' => 'events/summer-fashion-week.jpg',
                'event_date' => '2025-07-15',
                'created_by' => 1,
                'approval' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Weekend Super Sale',
                'title_am' => 'የመጨረሻ ሳምንት ሽያጭ',
                'sub_title_en' => 'Up to 70% OFF',
                'sub_title_am' => 'እስከ 70% ቅናሽ',
                'description_en' => 'Massive discounts across electronics, fashion, and home living for a limited time.',
                'description_am' => 'በኤሌክትሮኒክስ፣ ፋሽን እና የቤት እቃዎች ላይ ትልቅ ቅናሽ ለጊዜው ብቻ።',
                'image' => 'events/weekend-super-sale.jpg',
                'event_date' => '2025-07-20',
                'created_by' => 1,
                'approval' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Food Festival',
                'title_am' => 'የምግብ ፌስቲቫል',
                'sub_title_en' => 'Taste the World',
                'sub_title_am' => 'ዓለምን ዝንብል',
                'description_en' => 'Sample cuisines from around the world with live music and entertainment.',
                'description_am' => 'ከዓለም አቀፍ ምግቦች ጋር በቀጥታ ሙዚቃ እና መዝናኛ ይደሰቱ።',
                'image' => 'events/food-festival.jpg',
                'event_date' => '2025-08-05',
                'created_by' => 2,
                'approval' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Tech Expo',
                'title_am' => 'ቴክኖሎጂ ኤክስፖ',
                'sub_title_en' => 'Future Innovations',
                'sub_title_am' => 'የወደፊት አዳዲስ ነገሮች',
                'description_en' => 'Explore cutting-edge gadgets, VR demos, and AI showcases by top brands.',
                'description_am' => 'የቅርብ ቴክኖሎጂ መሳሪያዎችን፣ የVR ማሳያዎችን እና የAI ትዕይንቶችን ያስሱ።',
                'image' => null,
                'event_date' => '2025-09-10',
                'created_by' => 2,
                'approval' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'Back to School Drive',
                'title_am' => 'ወደ ትምህርት መመለስ',
                'sub_title_en' => 'Community Support Event',
                'sub_title_am' => 'የማህበረሰብ ድጋፍ ክስተት',
                'description_en' => 'Donate supplies and enjoy special deals on school essentials.',
                'description_am' => 'ዕቃዎች ይለግሱ እና በት/ቤት እቃዎች ላይ ልዩ ቅናሽ ይውሰዱ።',
                'image' => 'events/back-to-school.jpg',
                'event_date' => '2025-09-01',
                'created_by' => 1,
                'approval' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title_en' => 'New Year Gala',
                'title_am' => 'የአዲስ ዓመት ጋላ',
                'sub_title_en' => 'Countdown Celebration',
                'sub_title_am' => 'የቆጣሪ ክብረ በዓል',
                'description_en' => 'Ring in the new year with fireworks, live bands, and surprises.',
                'description_am' => 'ከእሳት እንቁራሪት፣ በቀጥታ ባንዶች እና ልዩ ዝግጅቶች ጋር አዲስ ዓመቱን በደስታ ተቀበሉ።',
                'image' => 'events/new-year-gala.jpg',
                'event_date' => '2025-12-31',
                'created_by' => 1,
                'approval' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        $testimonials = [
            [
                'name' => 'John Smith',
                'position' => 'CEO, Tech Solutions Inc.',
                'testimonial' => 'The office spaces provided are exceptional. The facilities are modern, well-maintained, and the staff is incredibly supportive. Highly recommended for any growing business!',
                'approval' => true
            ],
            [
                'name' => 'Sarah Johnson',
                'position' => 'Marketing Director',
                'testimonial' => 'We\'ve been using their meeting rooms for our client presentations for over a year now. Professional environment and excellent service every time.',
                'approval' => true
            ],
            [
                'name' => 'Michael Chen',
                'position' => 'Startup Founder',
                'testimonial' => 'Perfect solution for our startup. Flexible terms and great amenities helped us focus on growing our business without worrying about office management.',
                'approval' => false
            ],
            [
                'name' => 'Emily Rodriguez',
                'position' => 'Freelance Consultant',
                'testimonial' => 'As a freelancer, having access to professional meeting spaces when needed has been invaluable. The booking system is easy to use and the locations are convenient.',
                'approval' => true
            ]
        ];
        $tenants = [
            [
                'category_id' => 2,
                'name' => 'Zara',
                'description' => 'Contemporary fashion and trendy apparel for men and women.',
                'logo' => 'storage/tenants/651493pexels-solliefoto-298863.jpg',
                'location' => 'Near Main Entrance',
                'hours' => '10:00 AM - 9:00 PM',
                'fullDescription' => 'Zara offers the latest fashion trends with contemporary designs for men, women, and children. Our collections feature high-quality garments that combine comfort with style, perfect for the modern shopper looking to stay ahead of fashion trends.',
                'floor' => '1st Floor',
                'phone' => '+1 (555) 123-4567',
                'email' => 'info@zara-dembel.com',
                'website' => 'www.zara.com',
            ],
            [
                'category_id' => 3,
                'name' => 'Swarovski',
                'description' => 'Luxury crystal jewelry, watches, and elegant accessories.',
                'logo' => 'storage/tenants/415793pexels-pixabay-248077.jpg',
                'location' => 'Luxury Wing',
                'hours' => '10:00 AM - 9:00 PM',
                'fullDescription' => 'Swarovski has been synonymous with luxury and precision-cut crystal since 1895. Our boutique offers an exquisite collection of jewelry, watches, decorative objects, and accessories that add sparkle to every occasion.',
                'floor' => '2nd Floor',
                'phone' => '+1 (555) 234-5678',
                'email' => 'dembel@swarovski.com',
                'website' => 'www.swarovski.com',
            ],
            [
                'category_id' => 8,
                'name' => 'Starbucks',
                'description' => 'Premium coffee, pastries, and light refreshments.',
                'logo' => 'storage/tenants/110697pexels-larissafarber-33794536.jpg',
                'location' => 'Food Court Area',
                'hours' => '7:00 AM - 10:00 PM',
                'fullDescription' => 'Start your day with our expertly crafted coffee beverages, made from ethically sourced beans. Enjoy our selection of pastries, sandwiches, and seasonal drinks in a comfortable atmosphere perfect for meetings or relaxation.',
                'floor' => 'Ground Floor',
                'phone' => '+1 (555) 345-6789',
                'email' => 'dembel@starbucks.com',
                'website' => 'www.starbucks.com',
            ],
            [
                'category_id' => 5,
                'name' => 'Apple Store',
                'description' => 'Latest iPhones, MacBooks, iPads, and premium tech accessories.',
                'logo' => 'storage/tenants/284500pexels-gabriel-freytez-110599-341523.jpg',
                'location' => 'Tech Hub',
                'hours' => '10:00 AM - 9:00 PM',
                'fullDescription' => 'Discover the full range of Apple products including the latest iPhone, iPad, Mac, Apple Watch, and accessories. Our knowledgeable team provides personalized service and technical support to help you get the most out of your Apple products.',
                'floor' => '1st Floor',
                'phone' => '+1 (555) 456-7890',
                'email' => 'dembel@apple.com',
                'website' => 'www.apple.com',
            ],
            [
                'category_id' => 4,
                'name' => 'Sephora',
                'description' => 'Premium cosmetics, skincare, and beauty products.',
                'logo' => 'storage/tenants/339633pexels-paduret-1377034.jpg',
                'location' => 'Beauty Boulevard',
                'hours' => '10:00 AM - 9:00 PM',
                'fullDescription' => 'Explore the world of beauty at Sephora, featuring top brands in cosmetics, skincare, fragrance, and beauty tools. Our beauty experts are ready to help you find the perfect products and provide personalized beauty consultations.',
                'floor' => '2nd Floor',
                'phone' => '+1 (555) 567-8901',
                'email' => 'dembel@sephora.com',
                'website' => 'www.sephora.com',
            ],
            [
                'category_id' => 4,
                'name' => 'Nike',
                'description' => 'Athletic wear, sneakers, and sports equipment.',
                'logo' => 'storage/tenants/987600pexels-melvin-buezo-1253763-2529148.jpg',
                'location' => 'Sports Zone',
                'hours' => '10:00 AM - 9:00 PM',
                'fullDescription' => 'Just Do It at Nike, your destination for performance athletic wear, iconic sneakers, and sports equipment. Whether you\'re training for a marathon or looking for everyday comfort, we have the gear to help you perform your best.',
                'floor' => '1st Floor',
                'phone' => '+1 (555) 678-9012',
                'email' => 'dembel@nike.com',
                'website' => 'www.nike.com',
            ],
            [
                'category_id' => 6,
                'name' => 'IKEA Express',
                'description' => 'Modern furniture, home decor, and storage solutions.',
                'logo' => 'storage/tenants/707168pexels-eric-mufasa-578798-1350789.jpg',
                'location' => '6',
                'hours' => '10:00 AM - 8:00 PM',
                'fullDescription' => 'Transform your living space with IKEA\'s affordable, functional, and beautiful home furnishing solutions. From furniture to home accessories, we help you create a home that reflects your personality and lifestyle.',
                'floor' => '3rd Floor',
                'phone' => '+1 (555) 789-0123',
                'email' => 'dembel@ikea.com',
                'website' => 'www.ikea.com',
            ],
            [
                'category_id' => 7,
                'name' => 'GameStop',
                'description' => 'Video games, consoles, and gaming accessories.',
                'logo' => 'storage/tenants/830791pexels-jeshoots-com-147458-442576.jpg',
                'location' => 'Entertainment Plaza',
                'hours' => '10:00 AM - 9:00 PM',
                'fullDescription' => 'Level up your gaming experience at GameStop. We offer the latest video games, gaming consoles, accessories, and collectibles for all major platforms. Trade in your old games and discover new adventures.',
                'floor' => '2nd Floor',
                'phone' => '+1 (555) 890-1234',
                'email' => 'dembel@gamestop.com',
                'website' => 'www.gamestop.com',
            ],
            [
                'category_id' => 9,
                'name' => 'GNC',
                'description' => 'Health supplements, vitamins, and fitness nutrition.',
                'logo' => 'storage/tenants/857802pexels-element5-775032.jpg',
                'location' => 'Wellness Center',
                'hours' => '9:00 AM - 8:00 PM',
                'fullDescription' => 'Achieve your health and fitness goals with GNC\'s premium supplements, vitamins, and sports nutrition products. Our knowledgeable staff can help you find the right products for your wellness journey.',
                'floor' => '2nd Floor',
                'phone' => '+1 (555) 901-2345',
                'email' => 'dembel@gnc.com',
                'website' => 'www.gnc.com',
            ],
            [
                'category_id' => 3,
                'name' => 'Pandora',
                'description' => 'Handcrafted jewelry, charms, and personalized accessories.',
                'logo' => 'storage/tenants/145092pexels-leah-newhouse-50725-691046.jpg',
                'location' => 'Jewelry Quarter',
                'hours' => '10:00 AM - 9:00 PM',
                'fullDescription' => 'Discover Pandora\'s unique collection of handcrafted jewelry. From our iconic charm bracelets to rings, earrings, and necklaces, each piece is designed to celebrate life\'s special moments and express your personal style.',
                'floor' => '2nd Floor',
                'phone' => '+1 (555) 012-3456',
                'email' => 'dembel@pandora.com',
                'website' => 'www.pandora.com',
            ],
            [
                'category_id' => 8,
                'name' => 'Five Guys',
                'description' => 'Fresh burgers, fries, and milkshakes made to order.',
                'logo' => 'storage/tenants/534306pexels-chanwalrus-958545.jpg',
                'location' => 'Food Court',
                'hours' => '11:00 AM - 10:00 PM',
                'fullDescription' => 'Enjoy handcrafted burgers made from fresh, never-frozen beef, hand-cut fries cooked in peanut oil, and thick milkshakes. All our ingredients are fresh and our food is made to order, ensuring the best taste every time.',
                'floor' => '',
                'phone' => '+1 (555) 123-4567',
                'email' => 'dembel@fiveguys.com',
                'website' => 'www.fiveguys.com',
            ],
            [
                'category_id' => 2,
                'name' => 'H&M',
                'description' => 'Affordable fashion for men, women, and children.',
                'logo' => 'storage/tenants/759087pexels-lum3n-44775-322207.jpg',
                'location' => 'Fashion District',
                'hours' => '10:00 AM - 9:00 PM',
                'fullDescription' => '',
                'floor' => '1st Floor',
                'phone' => '+1 (555) 234-5678',
                'email' => 'dembel@hm.com',
                'website' => 'www.hm.com',
            ],
        ];
        $floor = [
            [
                'name' => 'Ground Floor',
                'description' => 'Main entrance, reception area, and public spaces. Features a spacious lobby, information desk, and waiting area for visitors.'
            ],
            [
                'name' => 'First Floor',
                'description' => 'Executive offices and management suites. Includes private offices for senior management and executive meeting rooms.'
            ],
            [
                'name' => 'Second Floor',
                'description' => 'Open workspace and collaborative areas. Designed for team collaboration with modern workstations and breakout spaces.'
            ],
            [
                'name' => 'Third Floor',
                'description' => 'Conference center and training facilities. Equipped with state-of-the-art audio-visual systems and capacity for large meetings.'
            ],
            [
                'name' => 'Fourth Floor',
                'description' => 'Specialized departments and quiet zones. Houses specialized teams requiring focused work environments and research facilities.'
            ],
            [
                'name' => 'Fifth Floor',
                'description' => 'Recreation and wellness center. Includes break rooms, cafeteria, fitness area, and relaxation spaces for employees.'
            ],
            [
                'name' => 'Basement Level 1',
                'description' => 'Parking and storage facilities. Secure parking area for employees and visitors with additional storage spaces.'
            ],
            [
                'name' => 'Penthouse',
                'description' => 'Premium executive suites and boardroom. Exclusive area for top-level executives and important corporate meetings.'
            ]
        ];


        // DB::table('sliders')->insert($sliders);
        // DB::table('floors')->insert($floor);
        // DB::table('galleries')->insert($gallery);
        // DB::table('news')->insert($news);
        // DB::table('services')->insert($service);
        // DB::table('testimonials')->insert($testimonials);
        // DB::table('events')->insert($events);
        // DB::table('tenants')->insert($tenants);
    }
}
