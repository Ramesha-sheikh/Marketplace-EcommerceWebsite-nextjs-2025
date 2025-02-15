"use client";
import Navbar from "../Components/Navbar/Navbar";
import { Poppins } from "next/font/google";
import ScrollToTopButton from "@/Components/button/Scrollbutton";
import { StartTop } from "@/Components/starttotop/StartTop";
import "./globals.css";
import Footer from "../Components/Footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Script from "next/script"; // Import Next.js Script component

const pop = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

// Load chatbot ID from environment variable
const chatbotId = process.env.NEXT_PUBLIC_CHATBOT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("hasLoaded");

    if (!hasLoadedBefore) {
      setIsLoading(true);
      sessionStorage.setItem("hasLoaded", "true");
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("hasLoaded")) {
      setIsLoading(false);
    }
  }, [pathname]);

  const isStudio = pathname.startsWith("/studio");
  const isHome = pathname.startsWith("/sign-in");
  const isAdmin = pathname.startsWith("/admin");
  const isOrders = pathname.startsWith("/orders");
  const isCustomers = pathname.startsWith("/customers");
  const isStatistics = pathname.startsWith("/product-data");
  const isReviews = pathname.startsWith("/reviews");

  const studioAndHome =
    !isStudio &&
    !isHome &&
    !isAdmin &&
    !isOrders &&
    !isCustomers &&
    !isStatistics &&
    !isReviews;

  return (
    <html lang="en">
      <head>
        {/* Chatbot Configuration Script */}
        {chatbotId && (
          <>
            <Script
              id="chatbot-config"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.embeddedChatbotConfig = {
                    chatbotId: "${chatbotId}",
                    domain: "www.chatbase.co"
                  };
                `,
              }}
            />
            <Script
              src="https://www.chatbase.co/embed.min.js"
              data-chatbot-id={chatbotId}
              data-domain="www.chatbase.co"
              strategy="afterInteractive"
              defer
            />
          </>
        )}
      </head>
      <body className={pop.className}>
        <StartTop />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {studioAndHome && <Navbar />}
            {children}
            {/* Wrapper div for scroll button with high z-index */}
            <div className="fixed bottom-10 right-4 z-[9999]">
            <ScrollToTopButton />
            </div>
            {studioAndHome && <Footer />}
          </>
        )}
      </body>
    </html>
  );
}


// "use client";
// import Navbar from "../Components/Navbar/Navbar";
// import { Poppins } from "next/font/google";
// import ScrollToTopButton from "@/Components/button/Scrollbutton";
// import { StartTop } from "@/Components/starttotop/StartTop";
// import "./globals.css";
// import Footer from "../Components/Footer";
// import { usePathname } from "next/navigation";
// import { useEffect, useState } from "react";
// import Loading from "./loading";

// const pop = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check if the page has loaded before using sessionStorage
//     const hasLoadedBefore = sessionStorage.getItem("hasLoaded");

//     if (!hasLoadedBefore) {
//       // If it's the first time loading the page, show the loader
//       setIsLoading(true);
//       sessionStorage.setItem("hasLoaded", "true"); // Set flag to prevent loader after first load
//       setTimeout(() => {
//         setIsLoading(false); // Hide the loader after 2 seconds
//       }, 2000);
//     } else {
//       // If the page has loaded before, hide the loader immediately
//       setIsLoading(false);
//     }
//   }, []); // This effect runs only once when the page loads for the first time

//   // Ensure loader hides on every route change after initial load
//   useEffect(() => {
//     if (sessionStorage.getItem("hasLoaded")) {
//       setIsLoading(false); // Hide the loader on route change
//     }
//   }, [pathname]); // This ensures loader hides after route changes

//   // Pathname checks to see where the user is
//   const isStudio = pathname.startsWith("/studio");
//   const isHome = pathname.startsWith("/sign-in");
//   const isAdmin = pathname.startsWith("/admin");
//   const isOrders = pathname.startsWith("/orders");
//   const isCustomers = pathname.startsWith("/customers");
//   const isStatistics = pathname.startsWith("/product-data");
//   const isReviews = pathname.startsWith("/reviews");

//   const studioAndHome =
//     !isStudio &&
//     !isHome &&
//     !isAdmin &&
//     !isOrders &&
//     !isCustomers &&
//     !isStatistics &&
//     !isReviews;

//   return (
//     <html lang="en">
//       <body className={pop.className}>
//         <StartTop />
        
//         {/* Show loader only the first time */}
//         {isLoading ? (
//           <Loading />
//         ) : (
//           <>
//             {studioAndHome && <Navbar />}
//             {children}
//             <ScrollToTopButton />
//             {studioAndHome && <Footer />}
//           </>
//         )}
//       </body>
//     </html>
//   );
// }

























// "use client"
// import Navbar from '../Components/Navbar/Navbar';
// import { Poppins } from "next/font/google";
// import ScrollToTopButton from "@/Components/button/Scrollbutton";
// import { StartTop } from "@/Components/starttotop/StartTop";
// import './globals.css'
// import Footer from '../Components/Footer';
// import { usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import Loading from "./loading";



// const pop = Poppins({ subsets: ['latin'],
//   weight: ['400', '700'],
// });
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const pathname = usePathname();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(true);
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [pathname]); // Trigger effect on route change
//   const isStudio = pathname.startsWith("/studio");
//   const isHome = pathname.startsWith("/sign-in");
//   const isAdmin = pathname.startsWith("/admin");
//   const isOrders = pathname.startsWith("/orders");
//   const isCustomers = pathname.startsWith("/customers");
//   const isStatistics = pathname.startsWith("/product-data");
//   const isReviews = pathname.startsWith("/reviews");
//   const studioAndHome = !isStudio && !isHome && !isAdmin && !isOrders && !isCustomers && !isStatistics && !isReviews
//   return (
//     <html lang="en">
//       <body className={pop.className}>
//       <StartTop/>
//       {(studioAndHome && !isLoading) &&  <Navbar />}
      
//    {/* {children} */}
//       {isLoading ? <Loading /> : children}
//       <ScrollToTopButton/>
 
//       {(studioAndHome && !isLoading) && <Footer />}
//       </body>
//     </html>
//   )
// }



