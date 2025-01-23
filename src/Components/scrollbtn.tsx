// "use client"

// import { useState, useEffect } from 'react';

// const ScrollToTopButton = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [isMounted, setIsMounted] = useState(false); // New state to track if mounted

//   const handleScroll = () => {
//     if (window.pageYOffset > 20) {
//       setIsVisible(true);
//     } else {
//       setIsVisible(false);
//     }
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   useEffect(() => {
//     // Set isMounted to true after the component is mounted
//     setIsMounted(true);

//     // Adding the scroll event listener
//     window.addEventListener('scroll', handleScroll);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Don't render the button until the component has mounted
//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <button
//       className={`fixed bottom-10 right-10 p-3 bg-[#B88E2F] text-white text-2xl font-bold  shadow-lg ${
//         isVisible ? 'block' : 'hidden'
//       }`}
//       onClick={scrollToTop}
//     >
//       ↑
//     </button>
//   );
// };

// export default ScrollToTopButton;