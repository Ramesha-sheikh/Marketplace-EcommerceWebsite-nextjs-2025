import type { Metadata } from 'next'
import Navbar from '../Components/Navbar';
import { Poppins } from "next/font/google";
// import ScrollToTopButton from "../Components/scrollbtn"


const pop = Poppins({ subsets: ['latin'],
  weight: ['400', '700'],
});
import './globals.css'
import Footer from '../Components/Footer';


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={pop.className}>
      <Navbar />
      {children}
      {/* <ScrollToTopButton /> */}
      <Footer />
      </body>
    </html>
  )
}
