// "use client";

// import React, { useEffect } from "react";
// import Image from "next/image";
// import { useCart } from "@/app/api/add to card/useCart";
// import Link from "next/link";

// interface SidebarProps {
//   cartOpen: boolean;
//   onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ cartOpen, onClose }) => {
//   const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

//   return (
//     <>
//       <div
//         className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg transition-transform transform ${
//           cartOpen ? "translate-x-0" : "translate-x-full"
//         } z-50`}
//       >
//         <div className="p-4 flex justify-between items-center border-b">
//           <h2 className="text-lg font-semibold">Shopping Cart</h2>
//           <button onClick={onClose} className="text-xl font-bold">
//             &times;
//           </button>
//         </div>

//         <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
//           {cart.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             cart.map((item) => (
//               <div key={item.id} className="flex space-x-4 border-b pb-4">
//                 <Image
//                   src={item.image || "/placeholder.svg"}
//                   alt={item.title}
//                   width={80}
//                   height={80}
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-sm font-bold">{item.title}</h3>
//                   <p className="text-gray-500">
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       className="w-12 p-1 border rounded"
//                       onChange={(e) =>
//                         updateQuantity(item.id, parseInt(e.target.value, 10))
//                       }
//                     />
//                     × Rs. {item.price.toLocaleString()}
//                   </p>
//                   <button
//                     className="text-red-500 text-sm"
//                     onClick={() => removeFromCart(item.id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="p-4">
//           <p className="font-medium">
//             Subtotal:{" "}
//             <span className="text-[#B88E2F]">Rs. {getCartTotal().toLocaleString()}</span>
//           </p>
//         </div>

//         <div className="p-4 flex justify-between space-x-2 border-t-[1px] border-[#D9D9D9]">
//           <Link href="/Cart">
//             <button className="px-9 py-2 bg-white text-sm font-medium border-[1px] border-black rounded-full hover:bg-black hover:text-white">
//               View Cart
//             </button>
//           </Link>
//           <Link href="/CheckOut">
//             <button className="px-9 py-2 bg-white text-sm font-medium border-[1px] border-black rounded-full hover:bg-black hover:text-white">
//               Checkout
//             </button>
//           </Link>
//         </div>
//       </div>

//       {cartOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;



// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useCart } from "@/app/api/add to card/useCart";
// import Link from "next/link";

// interface SidebarProps {
//   cartOpen: boolean;
//   onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ cartOpen, onClose }) => {
//   const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  
//   // Local state to trigger re-render when cart is updated
//   const [cartState, setCartState] = useState(cart);

//   useEffect(() => {
//     setCartState(cart); // Update the local state whenever the cart changes
//   }, [cart]); // This effect runs whenever the cart changes

//   return (
//     <>
//       <div
//         className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg transition-transform transform ${
//           cartOpen ? "translate-x-0" : "translate-x-full"
//         } z-50`}
//       >
//         <div className="p-4 flex justify-between items-center border-b">
//           <h2 className="text-lg font-semibold">Shopping Cart</h2>
//           <button onClick={onClose} className="text-xl font-bold">
//             &times;
//           </button>
//         </div>

//         <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
//           {cartState.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             cartState.map((item) => (
//               <div key={item.id} className="flex space-x-4 border-b pb-4">
//                 <Image
//                   src={item.image || "/placeholder.svg"}
//                   alt={item.title}
//                   width={80}
//                   height={80}
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-sm font-bold">{item.title}</h3>
//                   <p className="text-gray-500">
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       className="w-12 p-1 border rounded"
//                       onChange={(e) =>
//                         updateQuantity(item.id, parseInt(e.target.value))
//                       }
//                     />
//                     × Rs. {item.price.toLocaleString()}
//                   </p>
//                   <button
//                     className="text-red-500 text-sm"
//                     onClick={() => removeFromCart(item.id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="p-4">
//           <p className="font-medium">
//             Subtotal:{" "}
//             <span className="text-[#B88E2F]">Rs. {getCartTotal().toLocaleString()}</span>
//           </p>
//         </div>

//         <div className="p-4 flex justify-between space-x-2 border-t-[1px] border-[#D9D9D9]">
//           <Link href="/Cart">
//             <button className="px-9 py-2 bg-white text-sm font-medium border-[1px] border-black rounded-full hover:bg-black hover:text-white">
//               View Cart
//             </button>
//           </Link>
//           <Link href="/CheckOut">
//             <button className="px-9 py-2 bg-white text-sm font-medium border-[1px] border-black rounded-full hover:bg-black hover:text-white">
//               Checkout
//             </button>
//           </Link>
//         </div>
//       </div>

//       {cartOpen && <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>}
//     </>
//   );
// };

// export default Sidebar;








