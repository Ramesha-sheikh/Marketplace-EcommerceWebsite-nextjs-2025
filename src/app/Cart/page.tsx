"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ImBin2 } from "react-icons/im";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { useCart } from "@/app/api/add to card/useCart";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure the component is hydrated before rendering
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null; // Prevent rendering until hydration is complete
  }

  return (
    <>
      <div className="relative">
        <Image
          src={"/Spic1.png"}
          alt="pic1"
          width={1440}
          height={316}
          className="w-full min-h-[200px] lg:min-h-[350px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Image
            src={"/Spic2.png"}
            alt="pic2"
            width={77}
            height={77}
            className="w-[7%] md:w-[77px] md:h-[77px] "
          />
          <p className="font-[500] text-[24px] sm:text-[36px] md:text-[48px] lg:text-[56px] leading-[36px] sm:leading-[48px] md:leading-[72px] lg:leading-[80px] text-black">
            Cart
          </p>
          <div className="text-[12px] sm:text-[16px] text-gray-600 flex items-center space-x-1">
            <p>Home</p>
            <FaChevronRight className="text-gray-800" />
            <p>Cart</p>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] min-h-[525px] bg-white flex justify-center items-center px-4 py-6">
        <div className="w-full md:w-[1240px] flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
          <div className="w-full md:w-[60%] rounded-md p-4">
            <div className="w-full py-3 bg-[#FFF9E5] rounded-md px-4 sm:px-8 mt-11">
              <ul className="flex flex-wrap sm:flex-nowrap justify-between">
                <li className="text-[14px] sm:text-[16px] font-semibold">Product</li>
                <li className="text-[14px] sm:text-[16px] font-semibold ">Price</li>
                <li className="text-[14px] sm:text-[16px] font-semibold">Quantity</li>
                <li className="text-[14px] sm:text-[16px] font-semibold">Subtotal</li>
              </ul>
            </div>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex flex-wrap md:flex-nowrap gap-4 sm:gap-6 mt-4 items-center bg-white">
                  <div className="w-[106px] h-[106px] rounded-lg bg-[#FBEBB5] flex items-center justify-center">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-between gap-4 w-full items-start">
                    <ul className="flex flex-col md:flex-row justify-between w-full gap-2">
                      <li className="text-[12px] sm:text-[14px] md:text-[16px] text-[#9F9F9F]">{item.title}</li>
                      <li className="text-[12px] sm:text-[14px] md:text-[16px] text-[#9F9F9F]">
                        Rs. {item.price.toLocaleString()}
                      </li>
                      <li className="text-[12px] sm:text-[14px] md:text-[16px] text-[#9F9F9F]">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
                          min="1"
                          className="w-16 p-1 border rounded"
                        />
                      </li>
                      <li className="text-[12px] sm:text-[14px] md:text-[16px] text-[#9F9F9F]">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </li>
                    </ul>
                    <div className="mt-2 sm:mt-0">
                      <ImBin2
                        className="text-[#FBEBB5] text-base sm:text-lg md:text-xl cursor-pointer"
                        onClick={() => removeFromCart(item.id)}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="w-full md:w-[35%] bg-[#FFF9E5] rounded-md p-4">
            <h1 className="text-[20px] sm:text-[24px] md:text-[28px] text-black text-center">Cart Totals</h1>

            <div className="flex flex-col gap-4 sm:gap-6 mt-4">
              <div className="flex justify-between">
                <h2 className="text-[14px] sm:text-[16px]">Subtotal</h2>
                <h2 className="text-[14px] sm:text-[16px] text-[#9F9F9F]">Rs. {getCartTotal().toLocaleString()}</h2>
              </div>

              <div className="flex justify-between">
                <h2 className="text-[14px] sm:text-[16px]">Total</h2>
                <h2 className="text-[14px] sm:text-[16px] text-[#9F9F9F]">Rs. {getCartTotal().toLocaleString()}</h2>
              </div>

              <div className="flex justify-center mt-4">
                <Link
                  href="/CheckOut"
                  className="flex items-center justify-center text-center w-full sm:w-[200px] md:w-[250px] h-[40px] sm:h-[50px] md:h-[58px] rounded-lg text-sm text-black border-2 border-black hover:bg-black hover:text-white"
                >
                  Check Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;



// "use client"

// import React from "react"
// import Image from "next/image"
// import { ImBin2 } from "react-icons/im"
// import { FaChevronRight } from "react-icons/fa6"
// import Link from "next/link"
// import { useCart } from "@/app/api/add to card/useCart"

// const CartPage = () => {
//   const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()

//   return (
//     <>
//       <div className="relative ">
//         <Image
//           src={"/Spic1.png"}
//           alt="pic1"
//           width={1440}
//           height={316}
//           className="w-full min-h-[200px] lg:min-h-[350px] object-cover"
//         />
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//           <Image src={"/Spic2.png"} alt="pic2" width={77} height={77} className="w-[7%] md:w-[77px] md:h-[77px] " />
//           <p className="font-[500] text-[24px] sm:text-[36px] md:text-[48px] lg:text-[56px] leading-[36px] sm:leading-[48px] md:leading-[72px] lg:leading-[80px] text-black">
//             Cart
//           </p>
//           <div className="text-[12px] sm:text-[16px]  text-gray-600 flex items-center space-x-1">
//             <p>Home</p>
//             <FaChevronRight className="text-gray-800" />
//             <p>Cart</p>
//           </div>
//         </div>
//       </div>
//       <div className="max-w-[1440px] min-h-[525px] bg-white flex justify-center items-center px-4 py-6 ">
//         {/* Main container */}
//         <div className="w-full md:w-[1240px] flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
//           {/* Left Section */}
//           <div className="w-full md:w-[60%] rounded-md p-4">
//             {/* Header Section */}
//             <div className="w-full py-3 bg-[#FFF9E5] rounded-md px-4 sm:px-8 mt-11">
//               <ul className="flex flex-wrap sm:flex-nowrap justify-between">
//                 <li className="text-[14px] sm:text-[16px] font-semibold">Product</li>
//                 <li className="text-[14px] sm:text-[16px] font-semibold ">Price</li>
//                 <li className="text-[14px] sm:text-[16px] font-semibold">Quantity</li>
//                 <li className="text-[14px] sm:text-[16px] font-semibold">Subtotal</li>
//               </ul>
//             </div>

//             {/* Content Section */}
//             {cart.map((item) => (
//               <div key={item.id} className="flex flex-wrap md:flex-nowrap gap-4 sm:gap-6 mt-4 items-center bg-white">
//                 {/* Product Image */}
//                 <div className="w-[106px] h-[106px] rounded-lg bg-[#FBEBB5] flex items-center justify-center">
//                   <Image
//                     src={item.image || "/placeholder.svg"}
//                     alt={item.title}
//                     width={100}
//                     height={100}
//                     className="object-contain"
//                   />
//                 </div>

//                 {/* Product Details */}
//                 <div className="flex flex-col md:flex-row md:justify-between gap-4 w-full items-start">
//                   <ul className="flex flex-col md:flex-row justify-between w-full gap-2">
//                     <li className="text-[12px] sm:text-[14px] md:text-[16px] text-[#9F9F9F]">{item.title}</li>
//                     <li className="text-[12px] sm:text-[14px] md:text-[16px] text-[#9F9F9F]">
//                       Rs. {item.price.toLocaleString()}
//                     </li>
//                     <li className="text-[12px] sm:text-[14px] md:text-[16px] text-[#9F9F9F]">
//                       <input
//                         type="number"
//                         value={item.quantity}
//                         onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value))}
//                         min="1"
//                         className="w-16 p-1 border rounded"
//                       />
//                     </li>
//                     <li className="text-[12px] sm:text-[14px] md:text-[16px] text-[#9F9F9F]">
//                       Rs. {(item.price * item.quantity).toLocaleString()}
//                     </li>
//                   </ul>
//                   {/* Trash Icon */}
//                   <div className="mt-2 sm:mt-0">
//                     <ImBin2
//                       className="text-[#FBEBB5] text-base sm:text-lg md:text-xl cursor-pointer"
//                       onClick={() => removeFromCart(item.id)}
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right Section */}
//           <div className="w-full md:w-[35%] bg-[#FFF9E5] rounded-md p-4">
//             {/* Title Section */}
//             <h1 className="text-[20px] sm:text-[24px] md:text-[28px] text-black text-center">Cart Totals</h1>

//             {/* Content Section */}
//             <div className="flex flex-col gap-4 sm:gap-6 mt-4">
//               {/* Subtotal */}
//               <div className="flex justify-between">
//                 <h2 className="text-[14px] sm:text-[16px]">Subtotal</h2>
//                 <h2 className="text-[14px] sm:text-[16px] text-[#9F9F9F]">Rs. {getCartTotal().toLocaleString()}</h2>
//               </div>

//               {/* Total */}
//               <div className="flex justify-between">
//                 <h2 className="text-[14px] sm:text-[16px]">Total</h2>
//                 <h2 className="text-[14px] sm:text-[16px] text-[#9F9F9F]">Rs. {getCartTotal().toLocaleString()}</h2>
//               </div>

//               {/* Checkout Button */}
//               <div className="flex justify-center mt-4">
//                 <Link
//                   href="/checkout"
//                   className="flex items-center justify-center text-center w-full sm:w-[200px] md:w-[250px] h-[40px] sm:h-[50px] md:h-[58px] rounded-lg text-sm text-black border-2 border-black hover:bg-black hover:text-white"
//                 >
//                   Check Out
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default CartPage

