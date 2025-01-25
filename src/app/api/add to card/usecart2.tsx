import { useEffect, useState } from "react";
import { CartProvider } from "@/Components/shoppage/cardcontentsidebar"; // Adjust path if needed
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <CartProvider>
      {isMounted ? <Component {...pageProps} /> : null}
    </CartProvider>
  );
}

export default MyApp;