
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2, VolumeX, Sparkles, Pause } from "lucide-react";

const VideoExperience = ({ video }) => {
  console.log("Video Data:", video);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5); // New state for volume
  const [isContentVisible, setIsContentVisible] = useState(false); // New state
  const videoRef = useRef(null);

  let videoUrl = '';
  if (video?.extra_data) {
    const parsedData = JSON.parse(video.extra_data);
    if (Array.isArray(parsedData) && parsedData.length > 0) {
      videoUrl = parsedData[0].video_url; // Assuming video_url is in the first element for VideoSection
    } else if (typeof parsedData === 'object' && parsedData !== null) {
      videoUrl = parsedData.video_url; // Handle case where extra_data is a single object (legacy?)
    }
  }

  const handlePlay = () => {
    setIsContentVisible(true); // Show the video player
    setIsPlaying(true); // Start playing
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      // If unmuting, and volume is 0, set it to a default non-zero value
      if (!isMuted && videoRef.current.volume === 0) {
        videoRef.current.volume = 0.5;
        setVolume(0.5);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      // If volume is changed from 0, unmute the video
      if (newVolume > 0 && isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      // If volume is set to 0, mute the video
      if (newVolume === 0 && !isMuted) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  // Effect to manage actual video playback based on isPlaying state
  useEffect(() => {
    if (videoRef.current && isContentVisible) {
      if (isPlaying) {
        videoRef.current.play().catch(error => console.error("Video auto-play failed:", error));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isContentVisible]);

  // Set initial volume when video element is mounted
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [isContentVisible]); // Run when content visibility changes to ensure ref is available
  
  //   {
  //     "id": 6,
  //     "component": "VideoSection",
  //     "title": "Cinematic Tour",
  //     "subtitle": "A Day at Dembel",
  //     "description": "Immerse yourself in the vibrant atmosphere of Addis Ababa's premier lifestyle destination. From luxury shopping to fine dining, experience it all before you arrive.",
  //     "image_url": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1600&q=80",
  //     "extra_data": "[{\"video_url\":\"storage\\/videos\\/P9yNJcnQRZqWB3y1fqN9LJHqeOysvBq3Vr0d2ama.mp4\",\"video_file\":null}]",
  //     "position": 4,
  //     "created_at": "2025-12-10T07:48:23.000000Z",
  //     "updated_at": "2025-12-10T12:57:39.000000Z"
  // }
  return (
    // SECTION STYLING:
    // sticky top-4: Stacking effect
    // z-[55]: Fits between Testimonials (z-50) and VisitUs (z-60)
    <section className="w-full py-8 px-4 flex justify-center sticky top-4 z-[55] mb-24">
      <div className="w-full max-w-[80rem] bg-slate-950 rounded-[2.5rem] shadow-2xl overflow-hidden relative isolate border border-slate-800">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-yellow-400/10 blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row h-full lg:min-h-[38rem]">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/3 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
             <div className="inline-flex items-center gap-2 mb-6">
                <Sparkles className="text-yellow-400 w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{video.title || 'Cinematic Tour'}</span>
             </div>
             
             <h2 className="text-4xl md:text-5xl font-serif font-black text-white mb-6 leading-tight">
              {video.subtitle.split(' Dem')[0] || 'A Day at'} <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
                 {video.subtitle.split('t ')[1] || 'Dembel'}
               </span>
             </h2>
             
             <p className="text-slate-400 leading-relaxed mb-8">
               {video.description || "Immerse yourself in the vibrant atmosphere of Addis Ababa's premier lifestyle destination. From luxury shopping to fine dining, experience it all before you arrive."}
             </p>

             <div className="flex items-center gap-4 text-sm font-semibold text-slate-500">
                <div className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900">4K Resolution</div>
                <div className="px-3 py-1 rounded-full border border-slate-700 bg-slate-900">Spatial Audio</div>
             </div>
          </div>

          {/* Video Container */}
          <div className="w-full lg:w-2/3 relative min-h-[400px] lg:min-h-full bg-black group overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!isContentVisible ? ( // Use isContentVisible here
                // --- STATE 1: THUMBNAIL (Lightweight) ---
                <motion.div 
                  key="thumbnail"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={handlePlay}
                >
                  <img 
                    src={video.image_url || "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1600&q=80"} 
                    alt="Video Thumbnail" 
                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                       {/* Pulse Effect */}
                       <div className="absolute inset-0 bg-yellow-400/30 rounded-full animate-ping" />
                       <div className="relative w-24 h-24 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-all duration-300 shadow-2xl">
                          <Play className="w-8 h-8 text-white group-hover:text-slate-900 fill-current ml-1" />
                       </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-8 left-8">
                     <p className="text-white font-bold tracking-widest text-xs uppercase mb-2">Watch Film</p>
                     <p className="text-white/60 text-xs">01:45 • Visual Tour</p>
                  </div>
                </motion.div>
              ) : (
                // --- STATE 2: ACTIVE VIDEO (Heavy) ---
                <motion.div 
                  key="video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black"
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    src={videoUrl}
                    onClick={togglePlay} // Add onClick to video element
                    // autoPlay // Managed by useEffect now
                    loop
                    controls={false} // Custom controls below
                    playsInline
                    muted={isMuted}
                  />
                  
                  {/* Custom Overlay Controls */}
                  <div className="absolute bottom-6 right-6 flex gap-4 z-20">
                     {/* Play/Pause Button */}
                     <button 
                       onClick={togglePlay}
                       className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-colors"
                     >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                     </button>

                     {/* Mute/Unmute Button */}
                     <button 
                       onClick={toggleMute}
                       className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-colors"
                     >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                     </button>

                     {/* Volume Slider */}
                     <div className="relative flex items-center group">
                       <input
                         type="range"
                         min="0"
                         max="1"
                         step="0.01"
                         value={isMuted ? 0 : volume}
                         onChange={handleVolumeChange}
                         className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                         style={{ transform: 'rotate(-90deg)', transformOrigin: 'bottom left', width: '60px', position: 'absolute', left: '-20px', bottom: '40px' }}
                       />
                       {/* <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center">
                         {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                       </div> */}
                     </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
};

export default VideoExperience;
