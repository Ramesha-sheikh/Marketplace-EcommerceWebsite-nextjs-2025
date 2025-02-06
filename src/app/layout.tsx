
"use client"
import Navbar from '../Components/Navbar/Navbar';
import { Poppins } from "next/font/google";
import ScrollToTopButton from "@/Components/button/Scrollbutton";
import { StartTop } from "@/Components/starttotop/StartTop";
import './globals.css'
import Footer from '../Components/Footer';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './loading';



const pop = Poppins({ subsets: ['latin'],
  weight: ['400', '700'],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]); // Trigger effect on route change
  const isStudio = pathname.startsWith("/studio");
  const isHome = pathname.startsWith("/sign-in");
  const isAdmin = pathname.startsWith("/admin");
  const isOrders = pathname.startsWith("/orders");
  const isCustomers = pathname.startsWith("/customers");
  const isStatistics = pathname.startsWith("/product-data");
  const isReviews = pathname.startsWith("/reviews");
  const studioAndHome = !isStudio && !isHome && !isAdmin && !isOrders && !isCustomers && !isStatistics && !isReviews
  return (
    <html lang="en">
      <body className={pop.className}>
      <StartTop/>
      {(studioAndHome && !isLoading) &&  <Navbar />}
      
 
      {isLoading ? <Loading /> : children}
      <ScrollToTopButton/>
 
      {(studioAndHome && !isLoading) && <Footer />}
      </body>
    </html>
  )
}



