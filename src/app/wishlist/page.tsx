// "use client";
// import { useEffect, useState } from "react";
// import { CiHeart } from "react-icons/ci"; // Heart icon import

// const Wishlist = () => {
//   const [items, setItems] = useState<string[]>([]);
  
//   // Wishlist ko fetch karna
//   const fetchWishlist = async () => {
//     const res = await fetch("/api/wishlist");
//     const data = await res.json();
//     setItems(data.wishlist);
//   };

//   // Wishlist me item add karna
//   const addItem = async (item: string) => {
//     const res = await fetch("/api/wishlist", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ item }),
//     });
//     const data = await res.json();
//     setItems(data.wishlist);
//   };

//   // Wishlist se item remove karna
//   const removeItem = async (item: string) => {
//     const res = await fetch("/api/wishlist", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ item }),
//     });
//     const data = await res.json();
//     setItems(data.wishlist);
//   };

//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-xl font-bold text-center mb-4">My Wishlist</h2>
//       <ul className="space-y-2">
//         {items.length > 0 ? (
//           items.map((wish, index) => (
//             <li
//               key={index}
//               className="flex justify-between items-center bg-gray-100 p-2 rounded"
//             >
//               <span>{wish}</span>
//               <button
//                 onClick={() => removeItem(wish)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 Remove
//               </button>
//             </li>
//           ))
//         ) : (
//           <li className="text-center text-gray-500">Your wishlist is empty.</li>
//         )}
//       </ul>

//       {/* Wishlist me product add karne ka button */}
//       <div className="mt-4 flex justify-center gap-2">
//         {/* Heart Button for Product 1 */}
//         <button
//           onClick={() => addItem("Product 1")}
//           className={`py-2 px-3 text-xl font-bold rounded-full transition ${
//             items.includes("Product 1") ? "text-red-500" : "text-gray-500"
//           }`}
//         >
//           <CiHeart />
//         </button>

//         {/* Heart Button for Product 2 */}
//         <button
//           onClick={() => addItem("Product 2")}
//           className={`py-2 px-3 text-xl font-bold rounded-full transition ${
//             items.includes("Product 2") ? "text-red-500" : "text-gray-500"
//           }`}
//         >
//           <CiHeart />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Wishlist;
