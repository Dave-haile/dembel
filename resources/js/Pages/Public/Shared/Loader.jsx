import { motion } from "framer-motion";
import { ShoppingBag, ShoppingCart, Coffee, Shirt } from "lucide-react";

export default function DembelLoader() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white">

      {/* Container */}
      <div className="relative w-60 h-60 flex items-center justify-center">

        {/* === Split Outer Ring (Two Halves) === */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute w-56 h-56"
        >
          {/* Top half */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -12 }}
            transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror" }}
            className="absolute inset-0 border-t-[6px] border-[#303890] rounded-full shadow-[0_0_18px_#303890aa]"
          />

          {/* Bottom half */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 12 }}
            transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror" }}
            className="absolute inset-0 border-b-[6px] border-[#303890] rounded-full shadow-[0_0_18px_#303890aa]"
          />
        </motion.div>

        {/* === Inner Rotating Mall SVG === */}
        <motion.svg
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 text-accent-600"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        >
          <path d="M20 70 L20 40 L50 20 L80 40 L80 70 Z" />
          <path d="M30 70 L30 50 L70 50 L70 70 Z" />
        </motion.svg>

      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
        className="mt-8 text-center"
      >
        <h1 className="text-3xl font-bold text-[#303890] tracking-wide">
          Dembel City Center
        </h1>
        <p className="text-gray-700 mt-2 text-lg">
          Preparing your experience…
        </p>
      </motion.div>

    </div>
  );
}



// export default function DembelLoader() {
//   return (
//     // <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
//     //   <div className="relative flex items-center justify-center">
//     //     {/* Outer Ring */}
//     //     <div className="w-32 h-32 border-4 border-[#303890] rounded-full animate-spin-slow"></div>

//     //     {/* Icon */}
//     //     <ShoppingBag
//     //       className="absolute w-12 h-12 text-[#fbee21] animate-bounce-slow"
//     //     />
//     //   </div>

//     //   {/* Text */}
//     //   <div className="mt-6 text-center">
//     //     <h1 className="text-2xl font-bold text-[#303890]">
//     //       Dembel City Center
//     //     </h1>
//     //     <p className="text-gray-600 mt-1">
//     //       Loading your experience…
//     //     </p>
//     //   </div>
//     // </div>
//     <div className="w-full h-screen flex flex-col items-center justify-center bg-white">

//       {/* Container */}
//       <div className="relative w-64 h-64 flex items-center justify-center">

//         {/* Split Rotating Arcs Animation */}
//         <div className="absolute w-56 h-56">
//           {/* Left Arc */}
//           <div
//             className="absolute w-28 h-56 border-4 border-[#303890] border-r-0 rounded-l-full 
//             animate-arc-left shadow-[0_0_25px_#303890aa]"
//           ></div>

//           {/* Right Arc */}
//           <div
//             className="absolute right-0 w-28 h-56 border-4 border-[#303890] border-l-0 rounded-r-full
//             animate-arc-right shadow-[0_0_25px_#303890aa]"
//           ></div>
//         </div>

//         {/* Inner Rotating Mall Landmark (custom SVG) */}
//         <svg
//           className="absolute w-36 h-36 animate-rotate-reverse text-[#fbee21] drop-shadow-[0_0_6px_#fbee21] font-extrabold"
//           viewBox="0 0 100 100"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="4"
//           strokeLinecap="round"
//         >
//           <path d="M20 70 L20 40 L50 20 L80 40 L80 70 Z" />
//           <path d="M30 70 L30 50 L70 50 L70 70 Z" />
//         </svg>

//       </div>

//       {/* Text */}
//       <div className="mt-8 text-center animate-fade">
//         <h1 className="text-3xl font-extrabold text-[#303890] tracking-wide drop-shadow-[0_1px_3px_#30389066]">
//           Dembel City Center
//         </h1>
//         <p className="text-gray-700 mt-2 text-lg">
//           Preparing your experience…
//         </p>
//       </div>
//     </div>
//   );
// }

export function OrbitLoader() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white">

      <div className="relative w-44 h-44 flex items-center justify-center">

        {/* Orbit Circle */}
        <div className="absolute w-40 h-40 border-2 border-[#303890] rounded-full opacity-60"></div>

        {/* Icons Orbiting */}
        <div className="absolute w-40 h-40 animate-orbit-slow">
          <ShoppingBag className="absolute top-0 left-1/2 -translate-x-1/2 text-[#fbee21] w-8 h-8" />
          <ShoppingCart className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[#fbee21] w-8 h-8" />
          <Coffee className="absolute top-1/2 left-0 -translate-y-1/2 text-[#fbee21] w-8 h-8" />
          <Shirt className="absolute top-1/2 right-0 -translate-y-1/2 text-[#fbee21] w-8 h-8" />
        </div>

        {/* Center text or monogram */}
        <div className="absolute text-[#303890] font-bold text-xl">
          DCC
        </div>

      </div>

      {/* Text */}
      <div className="mt-6 text-center animate-fade">
        <h1 className="text-2xl font-bold text-[#303890] tracking-wide">
          Dembel City Center
        </h1>
        <p className="text-gray-600 mt-1">
          Loading your experience…
        </p>
      </div>
    </div>
  );
}

export function LoadingExamples() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-[#303890] mb-12 text-center">
        Loading Animation Examples
      </h1>

      <div className="space-y-16">
        {/* Example 1: Default */}
        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-[#303890]">
              Example 1: Default Loader
            </h2>
            <p className="text-sm text-gray-600">
              Basic usage with default text
            </p>
          </div>
          <div className="p-8 min-h-80 flex items-center justify-center bg-white">
            <LoadingAnimation />
          </div>
          <div className="bg-gray-50 p-4 border-t">
            <code className="text-sm text-gray-800">
              &lt;LoadingAnimation /&gt;
            </code>
          </div>
        </div>

        {/* Example 2: Custom Text */}
        <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-[#303890]">
              Example 2: Custom Loading Text
            </h2>
            <p className="text-sm text-gray-600">
              With personalized loading message
            </p>
          </div>
          <div className="p-8 min-h-80 flex items-center justify-center bg-white">
            <LoadingAnimation text="Loading your favorite stores…" />
          </div>
          <div className="bg-gray-50 p-4 border-t overflow-x-auto">
            <code className="text-sm text-gray-800">
              &lt;LoadingAnimation text="Loading your favorite stores…"
              /&gt;
            </code>
          </div>
        </div>

        {/* Example 3: Different Messages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-[#303890]">
                For Events
              </h2>
            </div>
            <div className="p-6 min-h-64 flex items-center justify-center bg-white">
              <LoadingAnimation text="Loading upcoming events…" />
            </div>
          </div>

          <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-[#303890]">
                For Dining
              </h2>
            </div>
            <div className="p-6 min-h-64 flex items-center justify-center bg-white">
              <LoadingAnimation text="Loading restaurant options…" />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-[#303890] rounded-lg p-8">
          <h3 className="text-2xl font-bold text-[#303890] mb-4">
            Component Specs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="font-semibold text-[#303890] mb-2">Border Color</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#303890] rounded-full"></div>
                <span className="text-gray-700">#303890</span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-[#303890] mb-2">Icon Color</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#fbee21] rounded-full"></div>
                <span className="text-gray-700">#fbee21</span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-[#303890] mb-2">
                Animations
              </p>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Border: 3s rotate</li>
                <li>• Icon: 2s bounce</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Props Documentation */}
        <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200">
          <h3 className="text-2xl font-bold text-[#303890] mb-6">Props</h3>
          <div className="space-y-4">
            <div>
              <code className="bg-white px-3 py-1 rounded border border-gray-300 text-[#303890] font-semibold">
                fullscreen?
              </code>
              <p className="text-gray-700 mt-2">
                boolean (default: false) - Displays as full-page overlay with
                fixed positioning
              </p>
            </div>
            <div>
              <code className="bg-white px-3 py-1 rounded border border-gray-300 text-[#303890] font-semibold">
                text?
              </code>
              <p className="text-gray-700 mt-2">
                string (default: "Loading your experience…") - Custom loading
                message displayed below the animation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAFB] to-gray-100">
      {/* Inline Demo */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="font-['Poppins',sans-serif] font-bold text-5xl text-[#303890] mb-4">
            Loading Animation Component
          </h1>
          <p className="text-gray-600 text-lg">
            Custom branded loader for Dembel City Center
          </p>
        </div>

        {/* Inline Demo */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-8">
          <h2 className="font-bold text-2xl text-[#303890] mb-8 text-center">
            Inline Demo
          </h2>
          <div className="min-h-96 flex items-center justify-center bg-gray-50 rounded-lg">
            <LoadingAnimation text="Loading your shopping experience…" />
          </div>
        </div>

        {/* Fullscreen Demo Info */}
        <div className="bg-blue-50 border-2 border-[#303890]/20 rounded-2xl p-8">
          <h2 className="font-bold text-2xl text-[#303890] mb-4">
            Fullscreen Mode Available
          </h2>
          <p className="text-gray-700 mb-4">
            The component supports fullscreen mode for page loading states:
          </p>
          <pre className="bg-white p-4 rounded-lg overflow-x-auto text-sm border border-gray-200">
            {`<LoadingAnimation fullscreen={true} />`}
          </pre>
          <p className="text-gray-600 text-sm mt-4">
            This will display the loader centered on a full-screen white background with
            fixed positioning.
          </p>
        </div>

        {/* Component Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-bold text-lg text-[#303890] mb-4">Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Rotating circular border (#303890)</li>
              <li>✓ Bouncing shopping bag icon (#fbee21)</li>
              <li>✓ Smooth 3-second rotation</li>
              <li>✓ Gentle 2-second bounce</li>
              <li>✓ Brand-specific styling</li>
              <li>✓ Responsive design</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="font-bold text-lg text-[#303890] mb-4">Props</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <span className="font-semibold">fullscreen</span>
                <span className="text-gray-500"> (boolean, optional)</span>
              </li>
              <li>Default: false</li>
              <li>
                <span className="font-semibold">text</span>
                <span className="text-gray-500"> (string, optional)</span>
              </li>
              <li>Default: "Loading your experience…"</li>
            </ul>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
          <h2 className="font-bold text-2xl text-[#303890] mb-6">Usage Examples</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Inline Loader
              </h3>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm border border-gray-200">
                {`import LoadingAnimation from './components/LoadingAnimation';

export default function MyComponent() {
  return <LoadingAnimation />;
}`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Custom Text
              </h3>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm border border-gray-200">
                {`<LoadingAnimation text="Please wait…" />`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Fullscreen Overlay
              </h3>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm border border-gray-200">
                {`<LoadingAnimation fullscreen={true} text="Loading stores…" />`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                With Loading State
              </h3>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm border border-gray-200">
                {`const [isLoading, setIsLoading] = useState(false);

return (
  <>
    {isLoading && <LoadingAnimation fullscreen />}
    <button onClick={() => setIsLoading(true)}>
      Load Data
    </button>
  </>
);`}
              </pre>
            </div>
          </div>
        </div>

        {/* Tailwind Config Info */}
        <div className="bg-yellow-50 border-2 border-[#fbee21] rounded-2xl p-8 mt-12">
          <h2 className="font-bold text-2xl text-[#303890] mb-4">
            Tailwind Configuration
          </h2>
          <p className="text-gray-700 mb-4">
            The following custom animations have been added to{' '}
            <code className="bg-white px-2 py-1 rounded border border-gray-300">
              tailwind.config.js
            </code>
            :
          </p>
          <pre className="bg-white p-4 rounded-lg overflow-x-auto text-sm border border-gray-200">
            {`animation: {
  'spin-slow': 'spin 3s linear infinite',
  'bounce-slow': 'bounce-slow 2s infinite',
},
keyframes: {
  'bounce-slow': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-12px)' },
  },
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}


export function LoadingAnimation({
  fullscreen = false,
  text = 'Loading your experience…',
}) {
  const containerClass = fullscreen
    ? 'fixed inset-0 z-50 bg-white flex items-center justify-center'
    : 'flex items-center justify-center';

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Animated Loader */}
        <div className="relative w-48 h-48">
          {/* Outer rotating circle (border) */}
          <div
            className="absolute inset-0 rounded-full border-8 border-transparent border-t-[#303890] border-r-[#303890]/40 border-b-[#303890]/20 animate-spin-slow"
            style={{
              boxShadow:
                '0 0 30px rgba(48, 56, 144, 0.15), inset 0 0 20px rgba(48, 56, 144, 0.05)',
            }}
          />

          {/* Inner static circle for visual depth */}
          <div
            className="absolute inset-0 rounded-full border-4 border-[#303890]/10"
            style={{
              boxShadow: 'inset 0 2px 8px rgba(48, 56, 144, 0.1)',
            }}
          />

          {/* Center content with bouncing icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-bounce-slow">
              <ShoppingBag
                size={56}
                className="text-[#fbee21]"
                strokeWidth={1.5}
                style={{
                  filter: 'drop-shadow(0 4px 12px rgba(251, 238, 33, 0.3))',
                }}
              />
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center">
          <h2 className="font-['Poppins',sans-serif] font-bold text-2xl md:text-3xl text-[#303890] mb-2">
            Dembel City Center
          </h2>
          <p className="text-gray-500 text-base md:text-lg">{text}</p>
        </div>
      </div>
    </div>
  );
}
