export default function Loading() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#FBEBB5] z-[999]">
        <div className="flex flex-col items-center space-y-6">
          
          {/* Brand Name with 3D Neon Glow Effect */}
          <h2 className="relative text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700 animate-glow">
            SitStyle
            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-yellow-600 animate-scan" />
          </h2>
  
          {/* Rotating 3D Badge Logo with Glow Effect */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full animate-rotate shadow-yellow-500/50 shadow-lg" />
            <div className="absolute inset-0 w-full h-full bg-black/90 rounded-full flex items-center justify-center border-2 border-yellow-500/60 shadow-md animate-pulse">
              <span className="text-xl font-extrabold text-yellow-400 drop-shadow-lg">S</span>
            </div>
          </div>
  
          {/* Bouncing Yellow Dots */}
          <div className="flex space-x-3 mt-6">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  boxShadow: `0 0 12px rgba(255,200,0,0.8)`
                }}
              />
            ))}
          </div>
  
          {/* Furniture Icons with Animation */}
          <div className="flex space-x-4 mt-8">
            <div className="w-12 h-12  flex items-center justify-center animate-bounce">
              <span className="text-6xl text-white">🛋️</span> {/* Sofa Icon */}
            </div>
            <div className="w-12 h-12 flex items-center justify-center animate-bounce">
              <span className="text-6xl text-white">🪑</span> {/* Chair Icon */}
            </div>
          </div>
  
          {/* Glassmorphism-Inspired Loading Bar */}
          <div className="relative w-64 h-2 bg-yellow-900/50 backdrop-blur-md rounded-full mt-6 overflow-hidden border border-yellow-500/30">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 animate-progress shadow-md" />
          </div>
  
        </div>
      </div>
    );
  }
  




// export default function Loading() {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-black z-[999]">
//         <div className="flex flex-col items-center space-y-6">
          
//           {/* Brand Name with Electric Neon Glow & Laser Scan Effect */}
//           <h2 className="relative text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 animate-glow">
//             BANDAGE
//             <span className="absolute inset-x-0 bottom-0 h-[2px] bg-blue-500 animate-scan" />
//           </h2>
  
//           {/* Rotating 3D Badge Logo with Pulse Effect */}
//           <div className="relative w-24 h-24">
//             <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full animate-rotate shadow-blue-500/50 shadow-lg" />
//             <div className="absolute inset-0 w-full h-full bg-black/90 rounded-full flex items-center justify-center border-2 border-blue-500/60 shadow-md animate-pulse">
//               <span className="text-xl font-extrabold text-blue-400 drop-shadow-lg">B</span>
//             </div>
//           </div>
  
//           {/* Bouncing Electric Blue Dots */}
//           <div className="flex space-x-3 mt-6">
//             {[...Array(3)].map((_, i) => (
//               <div 
//                 key={i}
//                 className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 animate-pulse"
//                 style={{
//                   animationDelay: `${i * 0.2}s`,
//                   boxShadow: `0 0 12px rgba(0,100,255,0.8)`
//                 }}
//               />
//             ))}
//           </div>
  
//           {/* Glassmorphism-Inspired Loading Bar with Blur Effect */}
//           <div className="relative w-64 h-2 bg-blue-900/50 backdrop-blur-md rounded-full mt-6 overflow-hidden border border-blue-500/30">
//             <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 animate-progress shadow-md" />
//           </div>
  
//         </div>
//       </div>
//     )
//   }
  

