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
        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'email' => 'admin@company.com',
                'email_verified_at' => now(),
                'phone' => '+251911223344',
                'avatar' => 'users/default.png',
                'role' => 'admin',
                'check' => true,
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Content Manager',
                'email' => 'content@company.com',
                'email_verified_at' => now(),
                'phone' => '+251922334455',
                'avatar' => 'users/default.png',
                'role' => 'manager',
                'check' => true,
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Regular User',
                'email' => 'user@company.com',
                'email_verified_at' => now(),
                'phone' => '+251933445566',
                'avatar' => 'users/default.png',
                'role' => 'user',
                'check' => false,
                'password' => Hash::make('password123'),
            ]
        ]);
        // $sliders = [
        //     [
        //         'title_en' => 'Welcome to Our Platform',
        //         'title_am' => 'Բարի գալուստ մեր պլատֆորմ',
        //         'image' => 'sliders/welcome-banner.jpg',
        //         'priority' => 1,
        //         'created_by' => 1,
        //         'approval' => true,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'title_en' => 'Special Offers',
        //         'title_am' => 'Հատուկ առաջարկներ',
        //         'image' => 'sliders/special-offers.jpg',
        //         'priority' => 2,
        //         'created_by' => 1,
        //         'approval' => true,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'title_en' => 'New Arrivals',
        //         'title_am' => 'Նոր ժամանումներ',
        //         'image' => 'sliders/new-arrivals.jpg',
        //         'priority' => 3,
        //         'created_by' => 1,
        //         'approval' => true,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'title_en' => 'Summer Collection',
        //         'title_am' => 'Ամառային հավաքածու',
        //         'image' => 'sliders/summer-collection.jpg',
        //         'priority' => 4,
        //         'created_by' => 1,
        //         'approval' => false,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'title_en' => 'Limited Time Deal',
        //         'title_am' => 'Սահմանափակ ժամկետով գործարք',
        //         'image' => 'sliders/limited-deal.jpg',
        //         'priority' => 5,
        //         'created_by' => 1,
        //         'approval' => true,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'title_en' => 'Premium Services',
        //         'title_am' => 'Պրեմիում ծառայություններ',
        //         'image' => null,
        //         'priority' => 0,
        //         'created_by' => 1,
        //         'approval' => false,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'title_en' => 'Customer Reviews',
        //         'title_am' => 'Հաճախորդների ակնարկներ',
        //         'image' => 'sliders/customer-reviews.jpg',
        //         'priority' => 6,
        //         'created_by' => 1,
        //         'approval' => true,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        //     [
        //         'title_en' => 'Join Our Community',
        //         'title_am' => 'Միացեք մեր համայնքին',
        //         'image' => 'sliders/join-community.jpg',
        //         'priority' => 7,
        //         'created_by' => 1,
        //         'approval' => true,
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ],
        // ];
        $gallery =
            [
                [
                    'title' => 'Modern Office Spaces',
                    'floor_id' => 2, // First Floor
                    'sector' => 2,
                    'description' => 'Beautifully designed modern office spaces with natural lighting',
                    'image' => 'gallery/office-spaces.jpg',
                    'approval' => true,
                    'created_by' => 1
                ],
                [
                    'title' => 'Conference Rooms',
                    'floor_id' => 4, // Third Floor
                    'sector' => 3,
                    'description' => 'State-of-the-art conference and meeting rooms',
                    'image' => 'gallery/conference-rooms.jpg',
                    'approval' => true,
                    'created_by' => 2
                ],
                [
                    'title' => 'Recreational Areas',
                    'floor_id' => 6, // Fifth Floor
                    'sector' => 1,
                    'description' => 'Comfortable break rooms and recreational spaces',
                    'image' => 'gallery/break-areas.jpg',
                    'approval' => false,
                    'created_by' => 1
                ],
                [
                    'title' => 'Executive Boardroom',
                    'floor_id' => 8, // Penthouse
                    'sector' => 4,
                    'description' => 'Luxurious boardroom for executive meetings',
                    'image' => 'gallery/boardroom.jpg',
                    'approval' => true,
                    'created_by' => 2
                ],
                [
                    'title' => 'Main Lobby',
                    'floor_id' => 1, // Ground Floor
                    'sector' => 1,
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
        DB::table('floors')->insert($floor);
        DB::table('galleries')->insert($gallery);
        DB::table('news')->insert($news);
        DB::table('services')->insert($service);
        DB::table('testimonials')->insert($testimonials);
    }
}
