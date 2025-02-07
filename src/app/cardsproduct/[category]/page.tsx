
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { CiHeart } from "react-icons/ci"; // Heart icon for wishlist

// Define the product type
type Product = {
  _id: string;
  title: string;
  price: string;
  mainImage: string | null;
  category: string;
  subCategory: string;
  tags: string[];
};

const CategoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [progress, setProgress] = useState<number>(100);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const params = useParams();
  const category = params.category as string;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!category) {
        console.error("Category is undefined. Please check the URL.");
        return;
      }

      const formattedCategory = category.replace(/-/g, "_").toLowerCase();

      try {
        const query = `*[_type == "productDetails" && (
            lower(category) == $formattedCategory || 
            lower(subCategory) == $formattedCategory ||
            $formattedCategory in tags[] 
          )] {
            _id,
            title,
            price,
            "mainImage": mainImage.asset->url,
            category,
            subCategory,
            tags
          }`;

        const res = await client.fetch(query, { formattedCategory });
        setProducts(res);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  const handleAddToWishlist = async (product: Product) => {
    if (!product) return;

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer s0us43zv22", // Replace with actual API key
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.title,
          price: product.price,
          imageUrl: product.mainImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to wishlist");
      }

      setSuccessMessage("Successfully added to wishlist!");
      setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
      setProgress(100);
      setLoading(true);

      setTimeout(() => {
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev <= 0) {
              clearInterval(progressInterval);
              setSuccessMessage("");
              setLoading(false);
              return 0;
            }
            return prev - 5;
          });
        }, 50);
      }, 300);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      setError("Failed to add item to wishlist. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold mb-6 text-center uppercase text-black bg-clip-text tracking-wide animate-pulse"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        PRODUCTS IN {category.replace(/-/g, " ").toUpperCase()}
      </h1>
      {loading && (
  <div className="text-center text-blue-500 mt-4">
    Loading... {progress}%
  </div>
)}
{error && (
  <div className="text-center text-red-500 mt-4">
    ⚠️ {error}
  </div>
)}


      {/* Success Message */}
      {successMessage && (
        <div className="text-center text-green-500 mb-4">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg flex flex-col items-center shadow-md hover:shadow-xl transition-all duration-300 bg-white w-full pt-2 pl-2 py-2 pr-2 relative"
          >
            <Link href={`/cardproduct/${product._id}`}>
              <Image
                src={product.mainImage || "/placeholder.svg"}
                alt={product.title}
                width={500}
                height={250}
                className="object-cover rounded-lg mb-3 w-full h-48"
              />
            </Link>
            <h3 className="text-lg font-semibold text-center mb-1 text-gray-800">
              {product.title}
            </h3>
            <p className="text-gray-700 font-bold mb-1 text-base">
              Price: {product.price}
            </p>
            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>
            <p className="text-sm text-gray-500">
              Subcategory: {product.subCategory}
            </p>
            {product.tags && product.tags.length > 0 && (
              <div className="mt-2 w-full text-center">
                <p className="text-sm text-gray-500">Tags:</p>
                <div className="flex flex-wrap justify-center gap-1 mt-1">
                  {product.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Button */}
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={() => handleAddToWishlist(product)}
                className="py-2 px-3 text-xl font-bold "
                aria-label={`Add ${product.title} to wishlist`}
              >
                <CiHeart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { client } from "../../../sanity/lib/client";
// import Image from "next/image";
// import Link from "next/link";
// import { CiHeart } from "react-icons/ci"; // Heart icon for wishlist

// // Define the product type
// type Product = {
//   _id: string;
//   title: string;
//   price: string;
//   mainImage: string | null;
//   category: string;
//   subCategory: string;
//   tags: string[];
// };

// const CategoryPage = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   // const [loading, setLoading] = useState(true);
//   const [progress, setProgress] = useState<number>(100)
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string>("")

//   const params = useParams();
//   const category = params.category as string;



//   useEffect(() => {
//     const fetchCategoryProducts = async () => {
//       if (!category) {
//         console.error("Category is undefined. Please check the URL.");
//         return;
//       }

//       console.log("Category from URL:", category);
//       const formattedCategory = category.replace(/-/g, "_").toLowerCase();
//       console.log("Formatted category:", formattedCategory);

//       try {
//         const query = `*[_type == "productDetails" && (
//             lower(category) == $formattedCategory || 
//             lower(subCategory) == $formattedCategory ||
//             $formattedCategory in tags[] 
//           )] {
//             _id,
//             title,
//             price,
//             "mainImage": mainImage.asset->url,
//             category,
//             subCategory,
//             tags
//           }`;

//         const res = await client.fetch(query, { formattedCategory });
//         setProducts(res);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryProducts();
//   }, [category]);


//   if (loading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   if (products.length === 0) {
//     return (
//       <div className="text-center py-10">
//         No products found in this category.
//       </div>
//     );
//   }

//   const handleAddToWishlist = async (product: Product) => {
//       if (!product) return;
    
//       try {
//         const response = await fetch("/api/wishlist", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer s0us43zv22",
//             // "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`, // ✅ Secure API key
//           },
//           body: JSON.stringify({
//             productId: product._id,
//             name: product.title, // ✅ Correct name field
//             price: product.price,
//             imageUrl: product.mainImage, // ✅ Correct image field
//           }),
//         });
    
//         if (!response.ok) {
//           throw new Error("Failed to add item to wishlist");
//         }
    
//         setSuccessMessage("Successfully added to wishlist!");
//         setTimeout(() => setSuccessMessage(""), 3000);
//         setProgress(100);
//         setLoading(true);
    
//         setTimeout(() => {
//           const progressInterval = setInterval(() => {
//             setProgress((prev) => {
//               if (prev <= 0) {
//                 clearInterval(progressInterval);
//                 setSuccessMessage("");
//                 setLoading(false);
//                 return 0;
//               }
//               return prev - 5;
//             });
//           }, 50);
//         }, 300);
//       } catch (error) {
//         console.error("Error adding to wishlist:", error);
//         setError("Failed to add item to wishlist. Please try again.");
//       }
//     };
  

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1
//         className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold mb-6 text-center uppercase text-black bg-clip-text tracking-wide animate-pulse"
//         style={{ fontFamily: "'Poppins', sans-serif" }}
//       >
//         PRODUCTS IN {category.replace(/-/g, " ").toUpperCase()}
//       </h1>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="border border-gray-200 rounded-lg flex flex-col items-center shadow-md hover:shadow-xl transition-all duration-300 bg-white w-full pt-2 pl-2 py-2 pr-2 relative"
//           >
//             <Link href={`/cardproduct/${product._id}`}>
//               <Image
//                 src={product.mainImage || "/placeholder.svg"}
//                 alt={product.title}
//                 width={500}
//                 height={250}
//                 className="object-cover rounded-lg mb-3 w-full h-48"
//               />
//             </Link>
//             <h3 className="text-lg font-semibold text-center mb-1 text-gray-800">
//               {product.title}
//             </h3>
//             <p className="text-gray-700 font-bold mb-1 text-base">
//               Price: {product.price}
//             </p>
//             <p className="text-sm text-gray-500">
//               Category: {product.category}
//             </p>
//             <p className="text-sm text-gray-500">
//               Subcategory: {product.subCategory}
//             </p>
//             {product.tags && product.tags.length > 0 && (
//               <div className="mt-2 w-full text-center">
//                 <p className="text-sm text-gray-500">Tags:</p>
//                 <div className="flex flex-wrap justify-center gap-1 mt-1">
//                   {product.tags.map((tag: string, index: number) => (
//                     <span
//                       key={index}
//                       className="bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded-md"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Wishlist Button */}
//             <div className="absolute top-2 right-2 z-10">
//             <button
//               onClick={() => handleAddToWishlist(product)}
//               className="py-2 px-3 text-xl font-bold "
//               aria-label={`Add ${product.title} to wishlist`}
//             >
//               <CiHeart />
//             </button>
//               {/* <button className="flex items-center justify-center w-8 h-8 bg-white rounded-full border border-gray-300 shadow-md">
//                 <CiHeart/>
//               </button> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;


// function setSuccessMessage(arg0: string) {
//   throw new Error("Function not implemented.");
// }
















// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { client } from "../../../sanity/lib/client";
// import Image from "next/image";
// import Link from "next/link";
// import { CiHeart } from "react-icons/ci"; // Heart icon for wishlist

// // Define the product type
// type Product = {
//   _id: string;
//   title: string;
//   price: string;
//   mainImage: string | null;
//   category: string;
//   subCategory: string;
//   tags: string[];
// };

// const CategoryPage = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   // const [loading, setLoading] = useState(true);
//   const [progress, setProgress] = useState<number>(100)
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string>("")

//   const params = useParams();
//   const category = params.category as string;



//   useEffect(() => {
//     const fetchCategoryProducts = async () => {
//       if (!category) {
//         console.error("Category is undefined. Please check the URL.");
//         return;
//       }

//       console.log("Category from URL:", category);
//       const formattedCategory = category.replace(/-/g, "_").toLowerCase();
//       console.log("Formatted category:", formattedCategory);

//       try {
//         const query = `*[_type == "productDetails" && (
//             lower(category) == $formattedCategory || 
//             lower(subCategory) == $formattedCategory ||
//             $formattedCategory in tags[] 
//           )] {
//             _id,
//             title,
//             price,
//             "mainImage": mainImage.asset->url,
//             category,
//             subCategory,
//             tags
//           }`;

//         const res = await client.fetch(query, { formattedCategory });
//         setProducts(res);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryProducts();
//   }, [category]);


//   if (loading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   if (products.length === 0) {
//     return (
//       <div className="text-center py-10">
//         No products found in this category.
//       </div>
//     );
//   }

//   const handleAddToWishlist = async () => {
//     if (!product) return;
  
//     try {
//       const response = await fetch("/api/wishlist", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Bearer s0us43zv22",
//           // "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`, // ✅ Secure API key
//         },
//         body: JSON.stringify({
//           productId: product.id,
//           name: product.title, // ✅ Correct name field
//           price: product.price,
//           imageUrl: product.mainImage, // ✅ Correct image field
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to add item to wishlist");
//       }
  
//       setSuccessMessage("Successfully added to wishlist!");
//       setTimeout(() => setSuccessMessage(""), 3000);
//       setProgress(100);
//       setLoading(true);
  
//       setTimeout(() => {
//         const progressInterval = setInterval(() => {
//           setProgress((prev) => {
//             if (prev <= 0) {
//               clearInterval(progressInterval);
//               setSuccessMessage("");
//               setLoading(false);
//               return 0;
//             }
//             return prev - 5;
//           });
//         }, 50);
//       }, 300);
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//       setError("Failed to add item to wishlist. Please try again.");
//     }
//   };
  

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1
//         className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold mb-6 text-center uppercase text-black bg-clip-text tracking-wide animate-pulse"
//         style={{ fontFamily: "'Poppins', sans-serif" }}
//       >
//         PRODUCTS IN {category.replace(/-/g, " ").toUpperCase()}
//       </h1>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="border border-gray-200 rounded-lg flex flex-col items-center shadow-md hover:shadow-xl transition-all duration-300 bg-white w-full pt-2 pl-2 py-2 pr-2 relative"
//           >
//             <Link href={`/cardproduct/${product._id}`}>
//               <Image
//                 src={product.mainImage || "/placeholder.svg"}
//                 alt={product.title}
//                 width={500}
//                 height={250}
//                 className="object-cover rounded-lg mb-3 w-full h-48"
//               />
//             </Link>
//             <h3 className="text-lg font-semibold text-center mb-1 text-gray-800">
//               {product.title}
//             </h3>
//             <p className="text-gray-700 font-bold mb-1 text-base">
//               Price: {product.price}
//             </p>
//             <p className="text-sm text-gray-500">
//               Category: {product.category}
//             </p>
//             <p className="text-sm text-gray-500">
//               Subcategory: {product.subCategory}
//             </p>
//             {product.tags && product.tags.length > 0 && (
//               <div className="mt-2 w-full text-center">
//                 <p className="text-sm text-gray-500">Tags:</p>
//                 <div className="flex flex-wrap justify-center gap-1 mt-1">
//                   {product.tags.map((tag: string, index: number) => (
//                     <span
//                       key={index}
//                       className="bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded-md"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Wishlist Button */}
//             <div className="absolute top-2 right-2 z-10">
//             <button
//               onClick={handleAddToWishlist}
//               className="py-2 px-3 text-xl font-bold"
//               aria-label={`Add ${product.name} to wishlist`}
//             >
//               <CiHeart />
//             </button>
//               {/* <button className="flex items-center justify-center w-8 h-8 bg-white rounded-full border border-gray-300 shadow-md">
//                 <CiHeart/>
//               </button> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;


// function setSuccessMessage(arg0: string) {
//   throw new Error("Function not implemented.");
// }

