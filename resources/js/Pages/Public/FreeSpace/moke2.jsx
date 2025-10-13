// // import React from "react";
// // import { usePage } from "@inertiajs/react";
// // import FreeSpaceCard from "./FreeSpaceCard";
// // import MainLayout from "../Shared/MainLayout";

// // export default function FreeSpace() {
// //   const { spaces } = usePage().props;

// //   console.log(spaces);
// //   return (
// //     <MainLayout title="Available Spaces - Dembel City Center">
// //       {/* Hero Banner */}
// //       <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16">
// //         <div className="container mx-auto px-4 text-center">
// //           <h1 className="text-4xl md:text-5xl font-bold mb-4">
// //             Available Commercial Spaces
// //           </h1>
// //           <p className="text-xl max-w-3xl mx-auto opacity-90">
// //             Find your perfect retail, office, or restaurant space in
// //             Ethiopia&apos;s premier shopping destination.
// //           </p>
// //         </div>
// //       </section>

// //       <div className="container mx-auto px-4 py-12">
// //         {spaces.length === 0 ? (
// //           <div className="text-center py-16">
// //             <div className="text-6xl mb-4">🏢</div>
// //             <h2 className="text-2xl font-bold text-gray-800 mb-2">
// //               No spaces currently available
// //             </h2>
// //             <p className="text-gray-600">
// //               Check back soon or contact us for upcoming opportunities.
// //             </p>
// //           </div>
// //         ) : (
// //           <>
// //             <div className="mb-8 text-center">
// //               <p className="text-gray-600">
// //                 Showing {spaces.length} available space
// //                 {spaces.length !== 1 ? "s" : ""}
// //               </p>
// //             </div>

// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //               {spaces.map((space) => (
// //                 <FreeSpaceCard key={space.id} space={space} />
// //               ))}
// //             </div>

// //             {/* CTA Section */}
// //             <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
// //               <h3 className="text-2xl font-bold text-gray-900 mb-4">
// //                 Can&apos;t find what you&apos;re looking for?
// //               </h3>
// //               <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
// //                 Contact our leasing team for personalized assistance and
// //                 upcoming availability.
// //               </p>
// //               <a
// //                 href="/contact"
// //                 className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-700 transition"
// //               >
// //                 Contact Leasing Team
// //               </a>
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </MainLayout>
// //   );
// // }

// import { useState, useMemo, useEffect } from "react";
// import * as React from "react";
// import { motion } from "framer-motion";
// import {
//   Search,
//   MapPin,
//   Maximize2,
//   DollarSign,
//   Wind,
//   Droplet,
//   Zap,
//   Eye,
//   Mail,
//   Phone,
//   User,
//   ExternalLink,
//   X,
//   ArrowLeft,
//   ArrowRight,
// } from "lucide-react";
// // Local UI: Badge, Button, Input
// // Dialog components removed; we'll use a custom modal implementation below
// import useEmblaCarousel from "embla-carousel-react";
// import MainLayout from "../Shared/MainLayout";
// import { Head } from "@inertiajs/react";
// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge";

// function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }

// // Local Card components (plain JSX wrappers)
// const Card = React.forwardRef(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn(
//       "rounded-lg border bg-card text-card-foreground shadow-sm",
//       className
//     )}
//     {...props}
//   />
// ));
// Card.displayName = "Card";

// const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("flex flex-col space-y-1.5 p-6", className)}
//     {...props}
//   />
// ));
// CardHeader.displayName = "CardHeader";

// const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
//   <h3
//     ref={ref}
//     className={cn(
//       "text-2xl font-semibold leading-none tracking-tight",
//       className
//     )}
//     {...props}
//   />
// ));
// CardTitle.displayName = "CardTitle";

// const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
//   <p
//     ref={ref}
//     className={cn("text-sm text-muted-foreground", className)}
//     {...props}
//   />
// ));
// CardDescription.displayName = "CardDescription";

// const CardContent = React.forwardRef(({ className, ...props }, ref) => (
//   <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
// ));
// CardContent.displayName = "CardContent";

// const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("flex items-center p-6 pt-0", className)}
//     {...props}
//   />
// ));
// CardFooter.displayName = "CardFooter";

// // Local Embla-based Carousel (JSX version)
// const CarouselContext = React.createContext(null);

// function useCarousel() {
//   const context = React.useContext(CarouselContext);
//   if (!context) {
//     throw new Error("useCarousel must be used within a <Carousel />");
//   }
//   return context;
// }

// const Carousel = React.forwardRef(
//   (
//     {
//       orientation = "horizontal",
//       opts,
//       setApi,
//       plugins,
//       className,
//       children,
//       ...props
//     },
//     ref
//   ) => {
//     const [carouselRef, api] = useEmblaCarousel(
//       {
//         ...(opts || {}),
//         axis: orientation === "horizontal" ? "x" : "y",
//       },
//       plugins
//     );
//     const [canScrollPrev, setCanScrollPrev] = React.useState(false);
//     const [canScrollNext, setCanScrollNext] = React.useState(false);

//     const onSelect = React.useCallback((apiInstance) => {
//       if (!apiInstance) return;
//       setCanScrollPrev(apiInstance.canScrollPrev());
//       setCanScrollNext(apiInstance.canScrollNext());
//     }, []);

//     const scrollPrev = React.useCallback(() => {
//       api?.scrollPrev();
//     }, [api]);

//     const scrollNext = React.useCallback(() => {
//       api?.scrollNext();
//     }, [api]);

//     const handleKeyDown = React.useCallback(
//       (event) => {
//         if (event.key === "ArrowLeft") {
//           event.preventDefault();
//           scrollPrev();
//         } else if (event.key === "ArrowRight") {
//           event.preventDefault();
//           scrollNext();
//         }
//       },
//       [scrollPrev, scrollNext]
//     );

//     React.useEffect(() => {
//       if (!api || !setApi) return;
//       setApi(api);
//     }, [api, setApi]);

//     React.useEffect(() => {
//       if (!api) return;
//       onSelect(api);
//       api.on("reInit", onSelect);
//       api.on("select", onSelect);
//       return () => {
//         api?.off("select", onSelect);
//       };
//     }, [api, onSelect]);

//     return (
//       <CarouselContext.Provider
//         value={{
//           carouselRef,
//           api,
//           opts,
//           orientation:
//             orientation ||
//             ((opts && opts.axis) === "y" ? "vertical" : "horizontal"),
//           scrollPrev,
//           scrollNext,
//           canScrollPrev,
//           canScrollNext,
//         }}
//       >
//         <div
//           ref={ref}
//           onKeyDownCapture={handleKeyDown}
//           className={cn("relative", className)}
//           role="region"
//           aria-roledescription="carousel"
//           {...props}
//         >
//           {children}
//         </div>
//       </CarouselContext.Provider>
//     );
//   }
// );
// Carousel.displayName = "Carousel";

// const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
//   const { carouselRef, orientation } = useCarousel();
//   return (
//     <div ref={carouselRef} className="overflow-hidden">
//       <div
//         ref={ref}
//         className={cn(
//           "flex",
//           orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
//           className
//         )}
//         {...props}
//       />
//     </div>
//   );
// });
// CarouselContent.displayName = "CarouselContent";

// const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
//   const { orientation } = useCarousel();
//   return (
//     <div
//       ref={ref}
//       role="group"
//       aria-roledescription="slide"
//       className={cn(
//         "min-w-0 shrink-0 grow-0 basis-full",
//         orientation === "horizontal" ? "pl-4" : "pt-4",
//         className
//       )}
//       {...props}
//     />
//   );
// });
// CarouselItem.displayName = "CarouselItem";

// const CarouselPrevious = React.forwardRef(
//   ({ className, variant = "outline", size = "icon", ...props }, ref) => {
//     const { orientation, scrollPrev, canScrollPrev } = useCarousel();
//     return (
//       <Button
//         ref={ref}
//         variant={variant}
//         size={size}
//         className={cn(
//           "absolute h-8 w-8 rounded-full",
//           orientation === "horizontal"
//             ? "-left-12 top-1/2 -translate-y-1/2"
//             : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
//           className
//         )}
//         disabled={!canScrollPrev}
//         onClick={scrollPrev}
//         {...props}
//       >
//         <ArrowLeft className="h-4 w-4" />
//         <span className="sr-only">Previous slide</span>
//       </Button>
//     );
//   }
// );
// CarouselPrevious.displayName = "CarouselPrevious";

// const CarouselNext = React.forwardRef(
//   ({ className, variant = "outline", size = "icon", ...props }, ref) => {
//     const { orientation, scrollNext, canScrollNext } = useCarousel();
//     return (
//       <Button
//         ref={ref}
//         variant={variant}
//         size={size}
//         className={cn(
//           "absolute h-8 w-8 rounded-full",
//           orientation === "horizontal"
//             ? "-right-12 top-1/2 -translate-y-1/2"
//             : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
//           className
//         )}
//         disabled={!canScrollNext}
//         onClick={scrollNext}
//         {...props}
//       >
//         <ArrowRight className="h-4 w-4" />
//         <span className="sr-only">Next slide</span>
//       </Button>
//     );
//   }
// );
// CarouselNext.displayName = "CarouselNext";

// // Local Badge
// const Badge = ({ className = "", variant, children, ...props }) => {
//   const base =
//     "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors";
//   const variants = {
//     default: "bg-primary text-primary-foreground",
//     secondary: "bg-secondary text-secondary-foreground",
//     outline: "border-border text-foreground",
//   };
//   const classes = cn(base, variants[variant || "default"], className);
//   return (
//     <span className={classes} {...props}>
//       {children}
//     </span>
//   );
// };

// // Local Button
// const Button = React.forwardRef(
//   (
//     {
//       className,
//       variant = "default",
//       size = "default",
//       asChild = false,
//       ...props
//     },
//     ref
//   ) => {
//     const Comp = asChild ? "span" : "button";
//     const base =
//       "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
//     const variantClasses = {
//       default: "bg-primary text-primary-foreground hover:bg-primary/90",
//       destructive:
//         "bg-destructive text-destructive-foreground hover:bg-destructive/90",
//       outline:
//         "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
//       secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//       ghost: "hover:bg-accent hover:text-accent-foreground",
//       link: "text-primary underline-offset-4 hover:underline",
//     };
//     const sizeClasses = {
//       default: "h-10 px-4 py-2",
//       sm: "h-9 rounded-md px-3",
//       lg: "h-11 rounded-md px-8",
//       icon: "h-10 w-10",
//     };
//     const classes = cn(
//       base,
//       variantClasses[variant],
//       sizeClasses[size],
//       className
//     );
//     return <Comp ref={ref} className={classes} {...props} />;
//   }
// );
// Button.displayName = "Button";

// // Local Input
// const Input = React.forwardRef(
//   ({ className, type = "text", ...props }, ref) => {
//     return (
//       <input
//         type={type}
//         className={cn(
//           "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//           className
//         )}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Input.displayName = "Input";

// // Mock data based on backend schema
// const mockSpaces = [
//   {
//     id: 1,
//     name: "Office Space A1",
//     floor_id: 1,
//     wing_or_zone: "North Wing",
//     area_sqm: "50.00",
//     dimensions: "5m x 10m",
//     has_window: true,
//     has_ventilation: true,
//     has_plumbing: false,
//     has_electricity: true,
//     features: [
//       "Air Conditioning",
//       "High-Speed Internet",
//       "Conference Room Access",
//     ],
//     monthly_rent: "1200.00",
//     rent_currency: "USD",
//     rent_includes: ["Utilities", "Maintenance"],
//     negotiable: true,
//     thumbnail:
//       "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
//     gallery: [
//       "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop",
//     ],
//     virtual_tour_url: "https://virtualtour.example.com/office_a1",
//     short_description:
//       "A modern office space located in the North Wing with great amenities.",
//     full_description:
//       "This office space offers a comfortable working environment with access to conference rooms, high-speed internet, and air conditioning. Perfect for small to medium-sized teams.",
//     contact_person: "Jane Doe",
//     contact_phone: "+1 (555) 123-4567",
//     contact_email: "jane.doe@example.com",
//     availability_status: "available",
//     floor: {
//       id: 1,
//       name: "Ground Floor",
//     },
//   },
//   {
//     id: 2,
//     name: "Retail Shop B2",
//     floor_id: 1,
//     wing_or_zone: "South Wing",
//     area_sqm: "75.00",
//     dimensions: "7.5m x 10m",
//     has_window: true,
//     has_ventilation: true,
//     has_plumbing: true,
//     has_electricity: true,
//     features: [
//       "Street Facing",
//       "Glass Storefront",
//       "Display Windows",
//       "Storage Room",
//     ],
//     monthly_rent: "2500.00",
//     rent_currency: "USD",
//     rent_includes: ["Common Area Maintenance", "Security"],
//     negotiable: false,
//     thumbnail:
//       "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
//     gallery: [
//       "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1200&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
//     ],
//     virtual_tour_url: null,
//     short_description:
//       "Prime retail location with excellent foot traffic and visibility.",
//     full_description:
//       "Located in the high-traffic South Wing, this retail space features large glass storefronts, perfect for fashion, electronics, or specialty stores. Includes a dedicated storage area.",
//     contact_person: "John Smith",
//     contact_phone: "+1 (555) 987-6543",
//     contact_email: "john.smith@example.com",
//     availability_status: "available",
//     floor: {
//       id: 1,
//       name: "Ground Floor",
//     },
//   },
//   {
//     id: 3,
//     name: "Food Kiosk C3",
//     floor_id: 2,
//     wing_or_zone: "Food Court",
//     area_sqm: "25.00",
//     dimensions: "5m x 5m",
//     has_window: false,
//     has_ventilation: true,
//     has_plumbing: true,
//     has_electricity: true,
//     features: [
//       "Commercial Kitchen Equipment",
//       "Grease Trap",
//       "Exhaust System",
//       "Serving Counter",
//     ],
//     monthly_rent: "1800.00",
//     rent_currency: "USD",
//     rent_includes: ["Utilities", "Waste Management"],
//     negotiable: true,
//     thumbnail:
//       "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
//     gallery: [
//       "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop",
//     ],
//     virtual_tour_url: "https://virtualtour.example.com/kiosk_c3",
//     short_description:
//       "Fully equipped food kiosk in the bustling food court area.",
//     full_description:
//       "This kiosk comes with all necessary equipment for food preparation and service. Located in the center of our food court with high customer traffic throughout the day.",
//     contact_person: "Maria Garcia",
//     contact_phone: "+1 (555) 456-7890",
//     contact_email: "maria.garcia@example.com",
//     availability_status: "reserved",
//     floor: {
//       id: 2,
//       name: "Second Floor",
//     },
//   },
//   {
//     id: 4,
//     name: "Luxury Boutique D4",
//     floor_id: 2,
//     wing_or_zone: "East Wing",
//     area_sqm: "120.00",
//     dimensions: "10m x 12m",
//     has_window: true,
//     has_ventilation: true,
//     has_plumbing: true,
//     has_electricity: true,
//     features: [
//       "High Ceilings",
//       "Designer Lighting",
//       "Fitting Rooms",
//       "VIP Area",
//       "Security System",
//     ],
//     monthly_rent: "4500.00",
//     rent_currency: "USD",
//     rent_includes: ["Climate Control", "Security", "Cleaning"],
//     negotiable: false,
//     thumbnail:
//       "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop",
//     gallery: [
//       "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&h=800&fit=crop",
//     ],
//     virtual_tour_url: "https://virtualtour.example.com/boutique_d4",
//     short_description:
//       "Premium space ideal for high-end fashion and luxury brands.",
//     full_description:
//       "A stunning boutique space with architectural details and premium finishes. Features high ceilings, designer lighting, and a dedicated VIP area for exclusive clientele.",
//     contact_person: "David Lee",
//     contact_phone: "+1 (555) 234-5678",
//     contact_email: "david.lee@example.com",
//     availability_status: "available",
//     floor: {
//       id: 2,
//       name: "Second Floor",
//     },
//   },
//   {
//     id: 5,
//     name: "Tech Store E5",
//     floor_id: 1,
//     wing_or_zone: "West Wing",
//     area_sqm: "90.00",
//     dimensions: "9m x 10m",
//     has_window: true,
//     has_ventilation: true,
//     has_plumbing: false,
//     has_electricity: true,
//     features: [
//       "Extra Power Outlets",
//       "Network Infrastructure",
//       "Display Shelving",
//       "Demo Area",
//     ],
//     monthly_rent: "3200.00",
//     rent_currency: "USD",
//     rent_includes: ["Internet", "Utilities"],
//     negotiable: true,
//     thumbnail:
//       "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&h=600&fit=crop",
//     gallery: [
//       "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1200&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1200&h=800&fit=crop",
//     ],
//     virtual_tour_url: null,
//     short_description:
//       "Modern space perfect for electronics and technology retail.",
//     full_description:
//       "Designed specifically for tech retailers with enhanced electrical infrastructure, network capabilities, and demo areas for product displays and customer interactions.",
//     contact_person: "Sarah Johnson",
//     contact_phone: "+1 (555) 345-6789",
//     contact_email: "sarah.johnson@example.com",
//     availability_status: "occupied",
//     floor: {
//       id: 1,
//       name: "Ground Floor",
//     },
//   },
//   {
//     id: 6,
//     name: "Wellness Studio F6",
//     floor_id: 3,
//     wing_or_zone: "North Wing",
//     area_sqm: "100.00",
//     dimensions: "10m x 10m",
//     has_window: true,
//     has_ventilation: true,
//     has_plumbing: true,
//     has_electricity: true,
//     features: [
//       "Mirrors",
//       "Rubber Flooring",
//       "Storage Lockers",
//       "Reception Area",
//       "Changing Rooms",
//     ],
//     monthly_rent: "2800.00",
//     rent_currency: "USD",
//     rent_includes: ["Water", "Climate Control"],
//     negotiable: true,
//     thumbnail:
//       "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop",
//     gallery: [
//       "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=800&fit=crop",
//       "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop",
//     ],
//     virtual_tour_url: "https://virtualtour.example.com/wellness_f6",
//     short_description:
//       "Spacious studio ideal for fitness, yoga, or wellness services.",
//     full_description:
//       "A versatile wellness space with natural light, mirrors, and specialized flooring. Perfect for yoga studios, fitness centers, dance classes, or health clinics.",
//     contact_person: "Emily Chen",
//     contact_phone: "+1 (555) 567-8901",
//     contact_email: "emily.chen@example.com",
//     availability_status: "available",
//     floor: {
//       id: 3,
//       name: "Third Floor",
//     },
//   },
// ];

// const FreeSpaces = () => {
//   const [selectedSpace, setSelectedSpace] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [availabilityFilter, setAvailabilityFilter] = useState("all");
//   const [floorFilter, setFloorFilter] = useState("all");
//   const [minRent, setMinRent] = useState("");
//   const [maxRent, setMaxRent] = useState("");

//   // Close on Escape and lock body scroll when modal is open
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape" && selectedSpace) {
//         setSelectedSpace(null);
//       }
//     };
//     if (selectedSpace) {
//       document.addEventListener("keydown", handleKeyDown);
//       const previousOverflow = document.body.style.overflow;
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.removeEventListener("keydown", handleKeyDown);
//         document.body.style.overflow = previousOverflow;
//       };
//     }
//   }, [selectedSpace]);

//   // Filtered spaces
//   const filteredSpaces = useMemo(() => {
//     return mockSpaces.filter((space) => {
//       // Search filter
//       if (
//         searchQuery &&
//         !space.name.toLowerCase().includes(searchQuery.toLowerCase())
//       ) {
//         return false;
//       }

//       // Availability filter
//       if (
//         availabilityFilter !== "all" &&
//         space.availability_status !== availabilityFilter
//       ) {
//         return false;
//       }

//       // Floor filter
//       if (floorFilter !== "all" && space.floor.name !== floorFilter) {
//         return false;
//       }

//       // Price range filter
//       const rent = parseFloat(space.monthly_rent);
//       if (minRent && rent < parseFloat(minRent)) {
//         return false;
//       }
//       if (maxRent && rent > parseFloat(maxRent)) {
//         return false;
//       }

//       return true;
//     });
//   }, [searchQuery, availabilityFilter, floorFilter, minRent, maxRent]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "available":
//         return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
//       case "reserved":
//         return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
//       case "occupied":
//         return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
//       default:
//         return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
//     }
//   };

//   const getStatusText = (status) => {
//     return status.charAt(0).toUpperCase() + status.slice(1);
//   };

//   const uniqueFloors = Array.from(new Set(mockSpaces.map((s) => s.floor.name)));

//   return (
//     <MainLayout>
//       <Head title="Available Spaces - Dembel City Center" />
//       <div className="min-h-screen bg-background">
//         {/* Hero Section */}
//         <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
//           <div
//             className="absolute inset-0 bg-cover bg-center"
//             style={{
//               backgroundImage:
//                 "url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1920&h=800&fit=crop')",
//             }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="relative z-10 text-center text-white px-4"
//           >
//             <h1 className="text-5xl md:text-6xl font-bold mb-4">
//               Available Spaces
//             </h1>
//             <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
//               Discover premium retail, office, and commercial spaces at Dembel
//               City Center
//             </p>
//           </motion.div>
//         </section>

//         {/* Filter & Search Bar */}
//         <section className="bg-card border-b sticky top-0 z-40 shadow-sm">
//           <div className="container mx-auto px-4 py-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
//               {/* Search */}
//               <div className="lg:col-span-2 relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search by name..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>

//               {/* Availability Filter */}
//               <select
//                 value={availabilityFilter}
//                 onChange={(e) => setAvailabilityFilter(e.target.value)}
//                 className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <option value="all">All Statuses</option>
//                 <option value="available">Available</option>
//                 <option value="reserved">Reserved</option>
//                 <option value="occupied">Occupied</option>
//               </select>

//               {/* Floor Filter */}
//               <select
//                 value={floorFilter}
//                 onChange={(e) => setFloorFilter(e.target.value)}
//                 className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <option value="all">All Floors</option>
//                 {uniqueFloors.map((floor) => (
//                   <option key={floor} value={floor}>
//                     {floor}
//                   </option>
//                 ))}
//               </select>

//               {/* Min Rent */}
//               <Input
//                 type="number"
//                 placeholder="Min Rent"
//                 value={minRent}
//                 onChange={(e) => setMinRent(e.target.value)}
//               />

//               {/* Max Rent */}
//               <Input
//                 type="number"
//                 placeholder="Max Rent"
//                 value={maxRent}
//                 onChange={(e) => setMaxRent(e.target.value)}
//               />
//             </div>

//             <div className="mt-4 text-sm text-muted-foreground">
//               Showing {filteredSpaces.length} of {mockSpaces.length} spaces
//             </div>
//           </div>
//         </section>

//         {/* Spaces Grid */}
//         <section className="container mx-auto px-4 py-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredSpaces.map((space, index) => (
//               <motion.div
//                 key={space.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//               >
//                 <Card className="h-full flex flex-col group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
//                   {/* Thumbnail */}
//                   <div className="relative h-48 overflow-hidden rounded-t-lg">
//                     <img
//                       src={space.thumbnail}
//                       alt={space.name}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                       loading="lazy"
//                     />
//                     <Badge
//                       className={`absolute top-3 right-3 ${getStatusColor(
//                         space.availability_status
//                       )}`}
//                     >
//                       {getStatusText(space.availability_status)}
//                     </Badge>
//                     {space.virtual_tour_url && (
//                       <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
//                         <Eye className="h-3 w-3 mr-1" />
//                         Virtual Tour
//                       </Badge>
//                     )}
//                   </div>

//                   <CardHeader>
//                     <CardTitle className="text-xl">{space.name}</CardTitle>
//                     <CardDescription className="flex items-center gap-2 text-sm">
//                       <MapPin className="h-4 w-4" />
//                       {space.floor.name} • {space.wing_or_zone}
//                     </CardDescription>
//                   </CardHeader>

//                   <CardContent className="flex-1">
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="flex items-center gap-1 text-muted-foreground">
//                           <Maximize2 className="h-4 w-4" />
//                           {space.area_sqm} sqm
//                         </span>
//                         <span className="text-muted-foreground">
//                           {space.dimensions}
//                         </span>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <DollarSign className="h-5 w-5 text-primary" />
//                         <span className="text-2xl font-bold text-primary">
//                           ${parseFloat(space.monthly_rent).toLocaleString()}
//                         </span>
//                         <span className="text-sm text-muted-foreground">
//                           /month
//                         </span>
//                       </div>

//                       {space.negotiable && (
//                         <Badge variant="outline" className="text-xs">
//                           Price Negotiable
//                         </Badge>
//                       )}

//                       <p className="text-sm text-muted-foreground line-clamp-2">
//                         {space.short_description}
//                       </p>

//                       {/* Amenities Icons */}
//                       <div className="flex gap-2 pt-2">
//                         {space.has_window && (
//                           <div
//                             className="p-2 bg-muted rounded-md"
//                             title="Window"
//                           >
//                             <Eye className="h-4 w-4" />
//                           </div>
//                         )}
//                         {space.has_ventilation && (
//                           <div
//                             className="p-2 bg-muted rounded-md"
//                             title="Ventilation"
//                           >
//                             <Wind className="h-4 w-4" />
//                           </div>
//                         )}
//                         {space.has_plumbing && (
//                           <div
//                             className="p-2 bg-muted rounded-md"
//                             title="Plumbing"
//                           >
//                             <Droplet className="h-4 w-4" />
//                           </div>
//                         )}
//                         {space.has_electricity && (
//                           <div
//                             className="p-2 bg-muted rounded-md"
//                             title="Electricity"
//                           >
//                             <Zap className="h-4 w-4" />
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>

//                   <CardFooter>
//                     <Button
//                       className="w-full"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         setSelectedSpace(space);
//                       }}
//                       disabled={space.availability_status === "occupied"}
//                     >
//                       View Details
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>

//           {filteredSpaces.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground text-lg">
//                 No spaces found matching your criteria.
//               </p>
//             </div>
//           )}
//         </section>

//         {/* Details Modal (custom) */}
//         {selectedSpace && (
//           <div
//             className="fixed inset-0 z-50 flex items-center justify-center"
//             role="dialog"
//             aria-modal="true"
//           >
//             <div
//               className="absolute inset-0 bg-black/80"
//               onClick={() => setSelectedSpace(null)}
//             ></div>
//             <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background border shadow-lg p-6 sm:rounded-lg">
//               {/* Close button */}
//               <button
//                 type="button"
//                 aria-label="Close"
//                 onClick={() => setSelectedSpace(null)}
//                 className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
//               >
//                 <X className="h-4 w-4" />
//               </button>

//               {/* Header */}
//               <div className="flex flex-col space-y-1.5 text-center sm:text-left">
//                 <h2 className="text-2xl font-semibold leading-none tracking-tight">
//                   {selectedSpace.name}
//                 </h2>
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <MapPin className="h-4 w-4" />
//                   {selectedSpace.floor.name} • {selectedSpace.wing_or_zone}
//                 </div>
//               </div>

//               {/* Gallery Carousel */}
//               <div className="mt-4">
//                 <Carousel className="w-full">
//                   <CarouselContent>
//                     {selectedSpace.gallery.map((img, idx) => (
//                       <CarouselItem key={idx}>
//                         <div className="aspect-video rounded-lg overflow-hidden">
//                           <img
//                             src={img}
//                             alt={`${selectedSpace.name} - Image ${idx + 1}`}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       </CarouselItem>
//                     ))}
//                   </CarouselContent>
//                   <CarouselPrevious />
//                   <CarouselNext />
//                 </Carousel>
//               </div>

//               {/* Virtual Tour Link */}
//               {selectedSpace.virtual_tour_url && (
//                 <a
//                   href={selectedSpace.virtual_tour_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 text-primary hover:underline"
//                 >
//                   <Eye className="h-4 w-4" />
//                   Take a Virtual Tour
//                   <ExternalLink className="h-3 w-3" />
//                 </a>
//               )}

//               {/* Pricing */}
//               <div className="bg-muted p-4 rounded-lg mt-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-1">
//                       Monthly Rent
//                     </p>
//                     <p className="text-3xl font-bold text-primary">
//                       {selectedSpace.rent_currency} $
//                       {parseFloat(selectedSpace.monthly_rent).toLocaleString()}
//                     </p>
//                     {selectedSpace.negotiable && (
//                       <Badge variant="outline" className="mt-2">
//                         Negotiable
//                       </Badge>
//                     )}
//                   </div>
//                   <Badge
//                     className={getStatusColor(
//                       selectedSpace.availability_status
//                     )}
//                   >
//                     {getStatusText(selectedSpace.availability_status)}
//                   </Badge>
//                 </div>
//                 <div className="mt-3 text-sm text-muted-foreground">
//                   Includes: {selectedSpace.rent_includes.join(", ")}
//                 </div>
//               </div>

//               {/* Space Details */}
//               <div className="grid grid-cols-2 gap-4 text-sm mt-4">
//                 <div>
//                   <p className="text-muted-foreground">Area</p>
//                   <p className="font-semibold">{selectedSpace.area_sqm} sqm</p>
//                 </div>
//                 <div>
//                   <p className="text-muted-foreground">Dimensions</p>
//                   <p className="font-semibold">{selectedSpace.dimensions}</p>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="mt-4">
//                 <h3 className="font-semibold mb-2">Description</h3>
//                 <p className="text-muted-foreground">
//                   {selectedSpace.full_description}
//                 </p>
//               </div>

//               {/* Features & Amenities */}
//               <div className="mt-4">
//                 <h3 className="font-semibold mb-3">Features & Amenities</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   {selectedSpace.has_window && (
//                     <div className="flex items-center gap-2">
//                       <Eye className="h-4 w-4 text-primary" />
//                       <span className="text-sm">Window</span>
//                     </div>
//                   )}
//                   {selectedSpace.has_ventilation && (
//                     <div className="flex items-center gap-2">
//                       <Wind className="h-4 w-4 text-primary" />
//                       <span className="text-sm">Ventilation</span>
//                     </div>
//                   )}
//                   {selectedSpace.has_plumbing && (
//                     <div className="flex items-center gap-2">
//                       <Droplet className="h-4 w-4 text-primary" />
//                       <span className="text-sm">Plumbing</span>
//                     </div>
//                   )}
//                   {selectedSpace.has_electricity && (
//                     <div className="flex items-center gap-2">
//                       <Zap className="h-4 w-4 text-primary" />
//                       <span className="text-sm">Electricity</span>
//                     </div>
//                   )}
//                 </div>

//                 {selectedSpace.features.length > 0 && (
//                   <div className="mt-4 flex flex-wrap gap-2">
//                     {selectedSpace.features.map((feature, idx) => (
//                       <Badge key={idx} variant="secondary">
//                         {feature}
//                       </Badge>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Contact Information */}
//               <div className="bg-muted p-4 rounded-lg mt-4">
//                 <h3 className="font-semibold mb-3">Contact Information</h3>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex items-center gap-2">
//                     <User className="h-4 w-4 text-muted-foreground" />
//                     <span>{selectedSpace.contact_person}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Phone className="h-4 w-4 text-muted-foreground" />
//                     <a
//                       href={`tel:${selectedSpace.contact_phone}`}
//                       className="text-primary hover:underline"
//                     >
//                       {selectedSpace.contact_phone}
//                     </a>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Mail className="h-4 w-4 text-muted-foreground" />
//                     <a
//                       href={`mailto:${selectedSpace.contact_email}`}
//                       className="text-primary hover:underline"
//                     >
//                       {selectedSpace.contact_email}
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               {/* CTA Button */}
//               <Button
//                 className="w-full mt-4"
//                 size="lg"
//                 disabled={selectedSpace.availability_status === "occupied"}
//               >
//                 {selectedSpace.availability_status === "occupied"
//                   ? "Currently Occupied"
//                   : "Reserve Now"}
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default FreeSpaces;
