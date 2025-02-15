
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ImBin2 } from "react-icons/im";
import { FaChevronRight } from "react-icons/fa6";
// Removed unused import: import Link from "next/link";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY;

function isAuthorized(): string {
  return `Bearer ${API_SECRET_KEY}`;
}

const CartPage = () => {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsHydrated(true);
    fetchCart(); // Fetch cart data on mount
  }, []);

  // Fetch cart data
  const fetchCart = async () => {
    try {
      const response = await fetch("/api/card", {
        method: "GET",
        headers: {
          Authorization: isAuthorized(),
        },
      });

      if (response.ok) {
        const cartData: CartItem[] = await response.json();
        setCart(cartData);
      } else {
        console.error("Failed to fetch cart data.");
      }
    } catch (error) {
      console.error("An error occurred while fetching the cart data:", error);
    }
    setLoading(false);
  };

  // Redirect to Checkout page without clearing the cart.
  const handleProceedToCheckout = () => {
    window.location.href = "/CheckOut";
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      const response = await fetch("/api/card", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: isAuthorized(),
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        const updatedCart: CartItem[] = await response.json();
        setCart(updatedCart);
      } else {
        console.error("Failed to remove item.");
      }
    } catch (error) {
      console.error("An error occurred while removing the item:", error);
    }
  };

  if (!isHydrated) return null;

  return (
    <>
      <div className="relative">
        <Image
          src="/Spic1.png"
          alt="Cart Background"
          width={1440}
          height={316}
          className="w-full min-h-[200px] lg:min-h-[350px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Image
            src="/Spic2.png"
            alt="Cart Icon"
            width={77}
            height={77}
            className="w-[50px] sm:w-[77px]"
          />
          <p className="text-[24px] sm:text-[36px] md:text-[48px] font-bold">
            Cart
          </p>
          <div className="text-gray-600 flex items-center text-sm sm:text-base">
            <p>Home</p>
            <FaChevronRight className="mx-1" />
            <p>Cart</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] px-4 py-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[60%] bg-white rounded-lg p-4">
            <div className="bg-[#FFF9E5] p-4 rounded-md">
              <ul className="grid grid-cols-4 text-center font-semibold text-sm sm:text-base">
                <li>Product</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
              </ul>
            </div>
            {loading ? (
              <p className="text-center py-4">Loading cart...</p>
            ) : cart.length === 0 ? (
              <p className="text-center py-4">Your cart is empty.</p>
            ) : (
              cart.map((item: CartItem) => (
                <div
                  key={item.productId}
                  className="flex flex-row sm:flex-row items-center gap-4 p-4 border-b"
                >
                  <div className="w-[90px] h-[90px] bg-[#FBEBB5] rounded-md flex justify-center">
                    <Image
                      src={item.imageUrl || "/placeholder.svg"}
                      alt={item.name}
                      width={90}
                      height={90}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <p className="text-sm sm:text-base">{item.name}</p>
                    <p className="text-sm sm:text-base">Rs. {item.price}</p>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      readOnly
                      className="w-12 p-1 border rounded text-center"
                    />
                    <p className="text-sm sm:text-base">
                      Rs. {item.price * item.quantity}
                    </p>
                    <ImBin2
                      className="text-red-500 cursor-pointer text-lg"
                      onClick={() => handleRemoveItem(item.productId)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="w-full lg:w-[35%] bg-[#FFF9E5] rounded-lg p-4">
            <h2 className="text-center text-lg sm:text-xl font-bold">
              Cart Totals
            </h2>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-700">
                  Rs.{" "}
                  {cart.reduce(
                    (total: number, item: CartItem) =>
                      total + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span className="text-gray-700 font-semibold">
                  Rs.{" "}
                  {cart.reduce(
                    (total: number, item: CartItem) =>
                      total + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="bg-black text-white py-3 rounded-md text-center font-medium hover:bg-gray-800"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;

// "use client"
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { ImBin2 } from "react-icons/im";
// import { FaChevronRight } from "react-icons/fa6";
// import Link from "next/link";

// // API call functions
// const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY;

// function isAuthorized() {
//   const authHeader = `Bearer ${API_SECRET_KEY}`;
//   return authHeader;
// }

// const CartPage = () => {
//   const [isHydrated, setIsHydrated] = useState(false);
//   const [cart, setCart] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setIsHydrated(true);
//     fetchCart(); // Fetch cart data on mount
//   }, []);

//   // Fetch cart data
//   const fetchCart = async () => {
//     try {
//       const response = await fetch("/api/card", {
//         method: "GET",
//         headers: {
//           Authorization: isAuthorized(),
//         },
//       });

//       if (response.ok) {
//         const cartData = await response.json();
//         setCart(cartData);
//       } else {
//         console.error("Failed to fetch cart data.");
//       }
//     } catch (error) {
//       console.error("An error occurred while fetching the cart data:", error);
//     }
//     setLoading(false);
//   };

//   // Updated: Redirect to Checkout page without clearing the cart.
//   const handleProceedToCheckout = () => {
//     window.location.href = "/CheckOut";
//   };

//   const handleRemoveItem = async (productId: string) => {
//     try {
//       const response = await fetch("/api/card", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: isAuthorized(),
//         },
//         body: JSON.stringify({ productId }),
//       });

//       if (response.ok) {
//         const updatedCart = await response.json();
//         setCart(updatedCart);
//       } else {
//         console.error("Failed to remove item.");
//       }
//     } catch (error) {
//       console.error("An error occurred while removing the item:", error);
//     }
//   };

//   if (!isHydrated) return null;

//   return (
//     <>
//       <div className="relative">
//         <Image
//           src={"/Spic1.png"}
//           alt="Cart Background"
//           width={1440}
//           height={316}
//           className="w-full min-h-[200px] lg:min-h-[350px] object-cover"
//         />
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//           <Image
//             src={"/Spic2.png"}
//             alt="Cart Icon"
//             width={77}
//             height={77}
//             className="w-[50px] sm:w-[77px]"
//           />
//           <p className="text-[24px] sm:text-[36px] md:text-[48px] font-bold">Cart</p>
//           <div className="text-gray-600 flex items-center text-sm sm:text-base">
//             <p>Home</p>
//             <FaChevronRight className="mx-1" />
//             <p>Cart</p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-[1440px] px-4 py-6 mx-auto">
//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="w-full lg:w-[60%] bg-white rounded-lg p-4">
//             <div className="bg-[#FFF9E5] p-4 rounded-md">
//               <ul className="grid grid-cols-4 text-center font-semibold text-sm sm:text-base">
//                 <li>Product</li>
//                 <li>Price</li>
//                 <li>Quantity</li>
//                 <li>Subtotal</li>
//               </ul>
//             </div>
//             {loading ? (
//               <p className="text-center py-4">Loading cart...</p>
//             ) : cart.length === 0 ? (
//               <p className="text-center py-4">Your cart is empty.</p>
//             ) : (
//               cart.map((item: any) => (
//                 <div key={item.productId} className="flex flex-row sm:flex-row items-center gap-4 p-4 border-b">
//                   <div className="w-[90px] h-[90px] bg-[#FBEBB5] rounded-md flex justify-center">
//                     <Image
//                       src={item.imageUrl || "/placeholder.svg"}
//                       alt={item.name}
//                       width={90}
//                       height={90}
//                       className="object-cover rounded-md"
//                     />
//                   </div>
//                   <div className="flex justify-between w-full">
//                     <p className="text-sm sm:text-base">{item.name}</p>
//                     <p className="text-sm sm:text-base">Rs. {item.price}</p>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       readOnly
//                       className="w-12 p-1 border rounded text-center"
//                     />
//                     <p className="text-sm sm:text-base">Rs. {item.price * item.quantity}</p>
//                     <ImBin2
//                       className="text-red-500 cursor-pointer text-lg"
//                       onClick={() => handleRemoveItem(item.productId)}
//                     />
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="w-full lg:w-[35%] bg-[#FFF9E5] rounded-lg p-4">
//             <h2 className="text-center text-lg sm:text-xl font-bold">Cart Totals</h2>
//             <div className="mt-4 flex flex-col gap-4">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span className="text-gray-700">
//                   Rs.{" "}
//                   {cart.reduce((total: number, item: any) => total + item.price * item.quantity, 0)}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Total</span>
//                 <span className="text-gray-700 font-semibold">
//                   Rs.{" "}
//                   {cart.reduce((total: number, item: any) => total + item.price * item.quantity, 0)}
//                 </span>
//               </div>
//               <button
//                 onClick={handleProceedToCheckout}
//                 className="bg-black text-white py-3 rounded-md text-center font-medium hover:bg-gray-800"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartPage;




// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { ImBin2 } from "react-icons/im";
// import { FaChevronRight } from "react-icons/fa6";
// import Link from "next/link";

// // API call functions
// const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY;

// function isAuthorized() {
//   const authHeader = `Bearer ${API_SECRET_KEY}`;
//   return authHeader;
// }

// const CartPage = () => {
//   const [isHydrated, setIsHydrated] = useState(false);
//   const [cart, setCart] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setIsHydrated(true);
//     fetchCart(); // Fetch cart data on mount
//   }, []);

//   // Make fetchCart async
//   const fetchCart = async () => {
//     try {
//       const response = await fetch("/api/card", {
//         method: "GET",
//         headers: {
//           Authorization: isAuthorized(),
//         },
//       });

//       if (response.ok) {
//         const cartData = await response.json();
//         setCart(cartData);
//       } else {
//         console.error("Failed to fetch cart data.");
//       }
//     } catch (error) {
//       console.error("An error occurred while fetching the cart data:", error);
//     }
//     setLoading(false);
//   };

//   const handleProceedToCheckout = async () => {
//     try {
//       const response = await fetch("/api/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ cart }),
//       });

//       if (response.ok) {
//         const checkoutData = await response.json();
//         console.log("Checkout successful:", checkoutData);
//         // Optionally, you can redirect to an order summary page or another route
//         localStorage.setItem("cart", JSON.stringify(cart)); // Store cart data in localStorage
//         // Redirect to checkout confirmation page
//         window.location.href = "/checkout/confirmation";
//       } else {
//         console.error("Failed to proceed with checkout.");
//       }
//     } catch (error) {
//       console.error("An error occurred while processing checkout:", error);
//     }
//   };

//   const handleRemoveItem = async (productId: string) => {
//     try {
//       const response = await fetch("/api/card", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: isAuthorized(),
//         },
//         body: JSON.stringify({ productId }),
//       });

//       if (response.ok) {
//         const updatedCart = await response.json();
//         setCart(updatedCart);
//       } else {
//         console.error("Failed to remove item.");
//       }
//     } catch (error) {
//       console.error("An error occurred while removing the item:", error);
//     }
//   };

//   if (!isHydrated) return null;

//   return (
//     <>
//       <div className="relative">
//         <Image
//           src={"/Spic1.png"}
//           alt="Cart Background"
//           width={1440}
//           height={316}
//           className="w-full min-h-[200px] lg:min-h-[350px] object-cover"
//         />
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//           <Image src={"/Spic2.png"} alt="Cart Icon" width={77} height={77} className="w-[50px] sm:w-[77px]" />
//           <p className="text-[24px] sm:text-[36px] md:text-[48px] font-bold">Cart</p>
//           <div className="text-gray-600 flex items-center text-sm sm:text-base">
//             <p>Home</p>
//             <FaChevronRight className="mx-1" />
//             <p>Cart</p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-[1440px] px-4 py-6 mx-auto">
//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="w-full lg:w-[60%] bg-white rounded-lg p-4">
//             <div className="bg-[#FFF9E5] p-4 rounded-md">
//               <ul className="grid grid-cols-4 text-center font-semibold text-sm sm:text-base">
//                 <li>Product</li>
//                 <li>Price</li>
//                 <li>Quantity</li>
//                 <li>Subtotal</li>
//               </ul>
//             </div>
//             {loading ? (
//               <p className="text-center py-4">Loading cart...</p>
//             ) : cart.length === 0 ? (
//               <p className="text-center py-4">Your cart is empty.</p>
//             ) : (
//               cart.map((item: any) => (
//                 <div key={item.productId} className="flex flex-row sm:flex-row items-center gap-4 p-4 border-b">
//                   <div className="w-[90px] h-[90px] bg-[#FBEBB5] rounded-md flex flex-row justify-center">
//                     <Image
//                       src={item.imageUrl || "/placeholder.svg"}
//                       alt={item.name}
//                       width={90}
//                       height={90}
//                       className="object-cover rounded-md"
//                     />
//                   </div>
//                   <div className="flex flex-row sm:flex-row justify-between w-full">
//                     <p className="text-sm sm:text-base">{item.name}</p>
//                     <p className="text-sm sm:text-base">Rs. {item.price}</p>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       readOnly
//                       className="w-12 p-1 border rounded text-center"
//                     />
//                     <p className="text-sm sm:text-base">Rs. {item.price * item.quantity}</p>
//                     <ImBin2
//                       className="text-red-500 cursor-pointer text-lg"
//                       onClick={() => handleRemoveItem(item.productId)}
//                     />
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="w-full lg:w-[35%] bg-[#FFF9E5] rounded-lg p-4">
//             <h2 className="text-center text-lg sm:text-xl font-bold">Cart Totals</h2>
//             <div className="mt-4 flex flex-col gap-4">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span className="text-gray-700">
//                   Rs. {cart.reduce((total: number, item: any) => total + item.price * item.quantity, 0)}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Total</span>
//                 <span className="text-gray-700 font-semibold">
//                   Rs. {cart.reduce((total: number, item: any) => total + item.price * item.quantity, 0)}
//                 </span>
//               </div>
//               <button
//                 onClick={handleProceedToCheckout}
//                 className="bg-black text-white py-3 rounded-md text-center font-medium hover:bg-gray-800"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartPage;












































































// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { ImBin2 } from "react-icons/im";
// import { FaChevronRight } from "react-icons/fa6";
// import Link from "next/link";

// // API call functions
// const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY;

// function isAuthorized() {
//   const authHeader = `Bearer ${API_SECRET_KEY}`;
//   return authHeader;
// }

// const CartPage = () => {
//   const [isHydrated, setIsHydrated] = useState(false);
//   const [cart, setCart] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setIsHydrated(true);
//     fetchCart(); // Fetch cart data on mount
//   }, []);

//   // Make fetchCart async
//   const fetchCart = async () => {
//     try {
//       const response = await fetch("/api/card", {
//         method: "GET",
//         headers: {
//           Authorization: isAuthorized(),
//         },
//       });

//       if (response.ok) {
//         const cartData = await response.json();
//         setCart(cartData);
//       } else {
//         console.error("Failed to fetch cart data.");
//       }
//     } catch (error) {
//       console.error("An error occurred while fetching the cart data:", error);
//     }
//     setLoading(false);
//   };

//   const handleProceedToCheckout = () => {
//     localStorage.setItem("cart", JSON.stringify(cart)); // Store cart data in localStorage
//   };

//   const handleRemoveItem = async (productId: string) => {
//     try {
//       const response = await fetch("/api/card", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: isAuthorized(),
//         },
//         body: JSON.stringify({ productId }),
//       });

//       if (response.ok) {
//         const updatedCart = await response.json();
//         setCart(updatedCart);
//       } else {
//         console.error("Failed to remove item.");
//       }
//     } catch (error) {
//       console.error("An error occurred while removing the item:", error);
//     }
//   };

//   if (!isHydrated) return null;

//   return (
//     <>
//       <div className="relative">
//         <Image
//           src={"/Spic1.png"}
//           alt="Cart Background"
//           width={1440}
//           height={316}
//           className="w-full min-h-[200px] lg:min-h-[350px] object-cover"
//         />
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//           <Image src={"/Spic2.png"} alt="Cart Icon" width={77} height={77} className="w-[50px] sm:w-[77px]" />
//           <p className="text-[24px] sm:text-[36px] md:text-[48px] font-bold">Cart</p>
//           <div className="text-gray-600 flex items-center text-sm sm:text-base">
//             <p>Home</p>
//             <FaChevronRight className="mx-1" />
//             <p>Cart</p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-[1440px] px-4 py-6 mx-auto">
//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="w-full lg:w-[60%] bg-white rounded-lg p-4">
//             <div className="bg-[#FFF9E5] p-4 rounded-md">
//               <ul className="grid grid-cols-4 text-center font-semibold text-sm sm:text-base">
//                 <li>Product</li>
//                 <li>Price</li>
//                 <li>Quantity</li>
//                 <li>Subtotal</li>
//               </ul>
//             </div>
//             {loading ? (
//               <p className="text-center py-4">Loading cart...</p>
//             ) : cart.length === 0 ? (
//               <p className="text-center py-4">Your cart is empty.</p>
//             ) : (
//               cart.map((item: any) => (
//                 <div key={item.productId} className="flex flex-row sm:flex-row items-center gap-4 p-4 border-b">
//                   <div className="w-[90px] h-[90px] bg-[#FBEBB5] rounded-md flex flex-row justify-center">
//                     <Image
//                       src={item.imageUrl || "/placeholder.svg"}
//                       alt={item.name}
//                       width={90}
//                       height={90}
//                       className="object-cover rounded-md"
//                     />
//                   </div>
//                   <div className="flex flex-row sm:flex-row justify-between w-full">
//                     <p className="text-sm sm:text-base">{item.name}</p>
//                     <p className="text-sm sm:text-base">Rs. {item.price}</p>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       readOnly
//                       className="w-12 p-1 border rounded text-center"
//                     />
//                     <p className="text-sm sm:text-base">Rs. {item.price * item.quantity}</p>
//                     <ImBin2
//                       className="text-red-500 cursor-pointer text-lg"
//                       onClick={() => handleRemoveItem(item.productId)}
//                     />
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="w-full lg:w-[35%] bg-[#FFF9E5] rounded-lg p-4">
//             <h2 className="text-center text-lg sm:text-xl font-bold">Cart Totals</h2>
//             <div className="mt-4 flex flex-col gap-4">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span className="text-gray-700">
//                   Rs. {cart.reduce((total: number, item: any) => total + item.price * item.quantity, 0)}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Total</span>
//                 <span className="text-gray-700 font-semibold">
//                   Rs. {cart.reduce((total: number, item: any) => total + item.price * item.quantity, 0)}
//                 </span>
//               </div>
//               <Link
//                 href="/CheckOut"
//                 onClick={handleProceedToCheckout}
//                 className="bg-black text-white py-3 rounded-md text-center font-medium hover:bg-gray-800"
//               >
//                 Proceed to Checkout
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartPage;













// "use client"
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { ImBin2 } from "react-icons/im";
// import { FaChevronRight } from "react-icons/fa6";
// import Link from "next/link";
// // Removed import for useCart since it's not needed anymore

// const CartPage = () => {
//   const [isHydrated, setIsHydrated] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
//   }, []);

//   if (!isHydrated) return null;

//   // Function to store cart data in localStorage
//   const handleProceedToCheckout = () => {
//     const cart = JSON.parse(localStorage.getItem('cart') || '[]'); // Retrieve cart from localStorage
//     localStorage.setItem('cart', JSON.stringify(cart)); // Store cart data
//   };

//   // Dummy data for cart (replace with actual cart data)
//   const cart = JSON.parse(localStorage.getItem('cart') || '[]');

//   return (
//     <>
//       <div className="relative">
//         <Image
//           src={"/Spic1.png"}
//           alt="Cart Background"
//           width={1440}
//           height={316}
//           className="w-full min-h-[200px] lg:min-h-[350px] object-cover"
//         />
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//           <Image src={"/Spic2.png"} alt="Cart Icon" width={77} height={77} className="w-[50px] sm:w-[77px]" />
//           <p className="text-[24px] sm:text-[36px] md:text-[48px] font-bold">Cart</p>
//           <div className="text-gray-600 flex items-center text-sm sm:text-base">
//             <p>Home</p>
//             <FaChevronRight className="mx-1" />
//             <p>Cart</p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-[1440px] px-4 py-6 mx-auto">
//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="w-full lg:w-[60%] bg-white rounded-lg p-4">
//             <div className="bg-[#FFF9E5] p-4 rounded-md">
//               <ul className="grid grid-cols-4 text-center font-semibold text-sm sm:text-base">
//                 <li>Product</li>
//                 <li>Price</li>
//                 <li>Quantity</li>
//                 <li>Subtotal</li>
//               </ul>
//             </div>
//             {cart.length === 0 ? (
//               <p className="text-center py-4">Your cart is empty.</p>
//             ) : (
//               cart.map((item: any) => (
//                 <div key={item.id} className="flex flex-row sm:flex-row items-center gap-4 p-4 border-b">
//                   <div className="w-[90px] h-[90px] bg-[#FBEBB5] rounded-md flex flex-row justify-center">
//                     <Image src={item.image || "/placeholder.svg"} alt={item.title} width={90} height={90} className="object-cover rounded-md" />
//                   </div>
//                   <div className="flex flex-row sm:flex-row justify-between w-full">
//                     <p className="text-sm sm:text-base">{item.title}</p>
//                     <p className="text-sm sm:text-base">Rs. {item.price.toLocaleString()}</p>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       readOnly
//                       className="w-12 p-1 border rounded text-center"
//                     />
//                     <p className="text-sm sm:text-base">Rs. {(item.price * item.quantity).toLocaleString()}</p>
//                     {/* Removed the remove functionality */}
//                     <ImBin2 className="text-red-500 cursor-not-allowed text-lg" />
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="w-full lg:w-[35%] bg-[#FFF9E5] rounded-lg p-4">
//             <h2 className="text-center text-lg sm:text-xl font-bold">Cart Totals</h2>
//             <div className="mt-4 flex flex-col gap-4">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span className="text-gray-700">Rs. {cart.reduce((total: number, item: any) => total + (item.price * item.quantity), 0).toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Total</span>
//                 <span className="text-gray-700 font-semibold">Rs. {cart.reduce((total: number, item: any) => total + (item.price * item.quantity), 0).toLocaleString()}</span>
//               </div>
//               <Link href="/CheckOut" onClick={handleProceedToCheckout} className="bg-black text-white py-3 rounded-md text-center font-medium hover:bg-gray-800">
//                 Proceed to Checkout
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartPage;


// "use client"
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { ImBin2 } from "react-icons/im";
// import { FaChevronRight } from "react-icons/fa6";
// import Link from "next/link";
// import { useCart } from "@/app/api/add to card/useCart";

// const CartPage = () => {
//   const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
//   const [isHydrated, setIsHydrated] = useState(false);

//   useEffect(() => {
//     setIsHydrated(true);
//   }, []);

//   if (!isHydrated) return null;

//   // Function to store cart data in localStorage
//   const handleProceedToCheckout = () => {
//     localStorage.setItem('cart', JSON.stringify(cart)); // Store cart data
//   };

//   return (
//     <>
//       <div className="relative">
//         <Image
//           src={"/Spic1.png"}
//           alt="Cart Background"
//           width={1440}
//           height={316}
//           className="w-full min-h-[200px] lg:min-h-[350px] object-cover"
//         />
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//           <Image src={"/Spic2.png"} alt="Cart Icon" width={77} height={77} className="w-[50px] sm:w-[77px]" />
//           <p className="text-[24px] sm:text-[36px] md:text-[48px] font-bold">Cart</p>
//           <div className="text-gray-600 flex items-center text-sm sm:text-base">
//             <p>Home</p>
//             <FaChevronRight className="mx-1" />
//             <p>Cart</p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-[1440px] px-4 py-6 mx-auto">
//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="w-full lg:w-[60%] bg-white rounded-lg p-4">
//             <div className="bg-[#FFF9E5] p-4 rounded-md">
//               <ul className="grid grid-cols-4 text-center font-semibold text-sm sm:text-base">
//                 <li>Product</li>
//                 <li>Price</li>
//                 <li>Quantity</li>
//                 <li>Subtotal</li>
//               </ul>
//             </div>
//             {cart.length === 0 ? (
//               <p className="text-center py-4">Your cart is empty.</p>
//             ) : (
//               cart.map((item) => (
//                 <div key={item.id} className="flex flex-row sm:flex-row items-center gap-4 p-4 border-b">
//                   <div className="w-[90px] h-[90px] bg-[#FBEBB5] rounded-md flex flex-row justify-center">
//                     <Image src={item.image || "/placeholder.svg"} alt={item.title} width={90} height={90} className="object-cover rounded-md" />
//                   </div>
//                   <div className="flex flex-row sm:flex-row justify-between w-full">
//                     <p className="text-sm sm:text-base">{item.title}</p>
//                     <p className="text-sm sm:text-base">Rs. {item.price.toLocaleString()}</p>
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
//                       min="1"
//                       className="w-12 p-1 border rounded text-center"
//                     />
//                     <p className="text-sm sm:text-base">Rs. {(item.price * item.quantity).toLocaleString()}</p>
//                     <ImBin2 className="text-red-500 cursor-pointer text-lg" onClick={() => removeFromCart(item.id)} />
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="w-full lg:w-[35%] bg-[#FFF9E5] rounded-lg p-4">
//             <h2 className="text-center text-lg sm:text-xl font-bold">Cart Totals</h2>
//             <div className="mt-4 flex flex-col gap-4">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span className="text-gray-700">Rs. {getCartTotal().toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Total</span>
//                 <span className="text-gray-700 font-semibold">Rs. {getCartTotal().toLocaleString()}</span>
//               </div>
//               <Link href="/CheckOut" onClick={handleProceedToCheckout} className="bg-black text-white py-3 rounded-md text-center font-medium hover:bg-gray-800">
//                 Proceed to Checkout
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartPage;

