


"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import AboveFooter from "../../Components/AboveFooter";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/card", { method: "GET" });
        if (response.ok) {
          const cartData = await response.json();
          setCart(cartData);
        } else {
          console.error("Failed to fetch cart data.");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
      setLoading(false);
    };

    fetchCart();
  }, []);

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Top Section with Background Image and Title */}
      <div className="relative bg-[#FBEBB5]">
        <Image
          src={"/Spic1.png"}
          alt="Background Image"
          width={1440}
          height={316}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Image
            src={"/Spic2.png"}
            alt="Logo Image"
            width={77}
            height={77}
            className="w-[7%] md:w-[77px] md:h-[77px]"
          />
          <p className="font-medium text-[24px] sm:text-[36px] md:text-[48px] lg:text-[56px] leading-[36px] sm:leading-[48px] md:leading-[72px] lg:leading-[80px] text-black">
            Checkout
          </p>
          <div className="text-[12px] sm:text-[16px] text-gray-600 flex items-center space-x-1">
            <p>Home</p>
            <FaChevronRight className="text-gray-800" />
            <p>Checkout</p>
          </div>
        </div>
      </div>

      {/* Billing Details and Order Details Section */}
      <div className="flex flex-wrap gap-12 py-16 px-16 bg-white">
        {/* Left Section: Billing Details */}
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-[36px] font-semibold mb-6">Billing Details</h2>
          <form className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="firstName" className="block mb-2 text-[16px]">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full border rounded-md p-4 text-[16px]"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="lastName" className="block mb-2 text-[16px]">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full border rounded-md p-4 text-[16px]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="companyName" className="block mb-2 text-[16px]">
                Company Name (Optional)
              </label>
              <input
                id="companyName"
                type="text"
                className="w-full border rounded-md p-4 text-[16px]"
              />
            </div>

            <div>
              <label htmlFor="country" className="block mb-2 text-[16px]">
                Country / Region
              </label>
              <select
                id="country"
                className="w-full border rounded-md p-4 text-[16px] bg-white"
              >
                <option value="">Select a country</option>
                <option value="pakistan">Pakistan</option>
                <option value="india">India</option>
              </select>
            </div>

            <div>
              <label htmlFor="streetAddress" className="block mb-2 text-[16px]">
                Street Address
              </label>
              <input
                id="streetAddress"
                type="text"
                className="w-full border rounded-md p-4 text-[16px]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="city" className="block mb-2 text-[16px]">
                  Town / City
                </label>
                <input
                  id="city"
                  type="text"
                  className="w-full border rounded-md p-4 text-[16px]"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="province" className="block mb-2 text-[16px]">
                  Province
                </label>
                <input
                  id="province"
                  type="text"
                  className="w-full border rounded-md p-4 text-[16px]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="zip" className="block mb-2 text-[16px]">
                ZIP Code
              </label>
              <input
                id="zip"
                type="text"
                className="w-full border rounded-md p-4 text-[16px]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 text-[16px]">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full border rounded-md p-4 text-[16px]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-[16px]">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full border rounded-md p-4 text-[16px]"
              />
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block mb-2 text-[16px]">
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                rows={4}
                className="w-full border rounded-md p-4 text-[16px]"
              ></textarea>
            </div>
          </form>
        </div>

        {/* Right Section: Order Details */}
        <div className="flex-1 min-w-[300px] p-2 rounded-md">
          <h2 className="text-[32px] font-semibold mb-9">Your Order</h2>

          {loading ? (
            <p>Loading order details...</p>
          ) : cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="mb-8 text-[16px]">
              {cart.map((item) => (
                <div key={item.productId} className="flex justify-between mb-4">
                  <p className="text-gray-400">
                    {item.name} x {item.quantity}
                  </p>
                  <p>Rs. {item.price * item.quantity}</p>
                </div>
              ))}
              <div className="flex justify-between mb-6">
                <p>Subtotal</p>
                <p>Rs. {subtotal}</p>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold mb-6">
                <p>Total</p>
                <p className="text-[24px] font-bold text-[#B88E2F]">Rs. {subtotal}</p>
              </div>
            </div>
          )}

          {/* Payment Options */}
          <div className="space-y-4">
            <label className="block">
              <input type="radio" name="payment" className="mr-2" />
              Direct Bank Transfer
            </label>
            <p className="text-[14px] text-gray-500 ml-6">
              Make your payment directly into our bank account. Please use your Order ID as the payment reference.
            </p>
            <label className="block">
              <input type="radio" name="payment" className="mr-2" />
              Cash on Delivery
            </label>
            <p className="text-[14px]">
              Your personal data will be used to support your experience on our website.
            </p>
          </div>
          <div className="flex justify-center">
            <button className="w-[318px] rounded-xl text-black border-2 border-black text-[20px] font-medium py-4 mt-6 bg-white hover:bg-[#FBEBB5] transition-all duration-300 ease-in-out shadow-lg">
              Place Order
            </button>
          </div>
        </div>
      </div>

      <AboveFooter />
    </>
  );
};

export default CheckoutPage;








//  "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { FaChevronRight } from "react-icons/fa6";
// import AboveFooter from "../../Components/AboveFooter";

// const CheckoutPage = () => {
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Component mount hote hi cart data fetch karo
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await fetch("/api/card", { method: "GET" });
//         if (response.ok) {
//           const cartData = await response.json();
//           setCart(cartData);
//         } else {
//           console.error("Cart data fetch nahi hui.");
//         }
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }
//       setLoading(false);
//     };

//     fetchCart();
//   }, []);

//   // Total calculate karne ka code
//   const subtotal = cart.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   return (
//     <>
//       <div className="relative bg-[#FBEBB5]">
//         <Image
//           src={"/Spic1.png"}
//           alt="pic1"
//           width={1440}
//           height={316}
//           className="w-full h-auto object-cover"
//         />
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//           <Image
//             src={"/Spic2.png"}
//             alt="pic2"
//             width={77}
//             height={77}
//             className="w-[7%] md:w-[77px] md:h-[77px]"
//           />
//           <p className="font-[500] text-[24px] sm:text-[36px] md:text-[48px] lg:text-[56px] leading-[36px] sm:leading-[48px] md:leading-[72px] lg:leading-[80px] text-black">
//             CheckOut
//           </p>
//           <div className="text-[12px] sm:text-[16px] text-gray-600 flex items-center space-x-1">
//             <p>Home</p>
//             <FaChevronRight className="text-gray-800" />
//             <p>CheckOut</p>
//           </div>
//         </div>
//       </div>

//       {/* Billing Details aur Order Details */}
//       <div className="flex flex-wrap gap-12 py-16 px-16 bg-white">
//         {/* Left Section: Billing Details */}
//         <div className="flex-1 min-w-[300px]">
//           <h2 className="text-[36px] font-[600] mb-6">Billing details</h2>
//           <form className="space-y-6">
//             {/* Yahan apne form ke inputs add karo */}
//             <div className="flex flex-wrap gap-3">
//               <div className="flex-1 min-w-[200px]">
//                 <label htmlFor="firstName" className="block mb-2 text-[16px] font-normal">
//                   First Name
//                 </label>
//                 <input id="firstName" type="text" className="w-full border rounded-md p-4 text-[16px]" />
//               </div>
//               <div className="flex-1 min-w-[200px]">
//                 <label htmlFor="lastName" className="block mb-2 text-[16px] font-normal">
//                   Last Name
//                 </label>
//                 <input id="lastName" type="text" className="w-full border rounded-md p-4 text-[16px]" />
//               </div>
//             </div>
//             {/* Aur bhi form fields add kar sakte ho */}
//           </form>
//         </div>

//         {/* Right Section: Order Details */}
//         <div className="flex-1 min-w-[300px] p-2 rounded-md">
//           <h2 className="text-[32px] font-[600] mb-9">Your Order</h2>

//           {loading ? (
//             <p>Order details load ho rahe hain...</p>
//           ) : cart.length === 0 ? (
//             <p>Aapka cart khaali hai.</p>
//           ) : (
//             <div className="mb-8 text-[16px]">
//               {cart.map((item) => (
//                 <div key={item.productId} className="flex justify-between mb-4">
//                   <p className="text-gray-400">
//                     {item.name} x {item.quantity}
//                   </p>
//                   <p>Rs. {item.price * item.quantity}</p>
//                 </div>
//               ))}
//               <div className="flex justify-between mb-6">
//                 <p>Subtotal</p>
//                 <p>Rs. {subtotal}</p>
//               </div>
//               <div className="flex justify-between text-gray-800 font-semibold mb-6">
//                 <p>Total</p>
//                 <p className="text-[24px] font-700 text-[#B88E2F]">Rs. {subtotal}</p>
//               </div>
//             </div>
//           )}

//           {/* Payment Options */}
//           <div className="space-y-4">
//             <label className="block">
//               <input type="radio" name="payment" className="mr-2" />
//               Direct Bank Transfer
//             </label>
//             <p className="text-[14px] text-gray-500 ml-6">
//               Apni payment seedha hamare bank account mein bhejein. Order ID ko payment reference ke roop mein use karein.
//             </p>
//             <label className="block">
//               <input type="radio" name="payment" className="mr-2" />
//               Cash on Delivery
//             </label>
//             <p className="text-[14px]">
//               Aapke personal data ko ham website per aapke experience ko support karne ke liye use karenge.
//             </p>
//           </div>
//           <div className="flex justify-center">
//             <button className="w-[318px] rounded-xl text-black border-2 border-black text-[20px] font-medium py-4 mt-6 bg-white hover:bg-[#FBEBB5] transition-all duration-300 ease-in-out shadow-lg">
//               Place Order
//             </button>
//           </div>
//         </div>
//       </div>

//       <AboveFooter />
//     </>
//   );
// };

// export default CheckoutPage;
