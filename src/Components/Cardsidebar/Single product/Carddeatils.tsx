"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { FaEye } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { useCart, type CartItem } from "@/app/api/add to card/useCart";
import RelatedProduct from "@/Components/shoppage/Related product";

interface Product {
  id: string;
  title: string;
  price: number;
  mainImage: string;
  rating: number;
  reviewCount: number;
  description: string;
  imageThumbnails: string[];
  category: string;
  subCategory: string;
}

async function getData(): Promise<Product[]> {
  try {
    const fetchData = await client.fetch(`
      *[_type == "productDetails"]{
        _id,
        title,
        price,
        rating,
        reviewCount,
        description,
        "imageThumbnails": imageThumbnails[].asset->url,
        "mainImage": mainImage.asset->url,
        category,
        subCategory
      }
    `);

    return fetchData.map((prod: Record<string, unknown>) => ({
      id: prod._id as string,
      title: (prod.title as string) || "Untitled",
      price: typeof prod.price === "number" ? prod.price : parseFloat(prod.price as string) || 0,
      rating: (prod.rating as number) || 0,
      reviewCount: (prod.reviewCount as number) || 0,
      description: (prod.description as string) || "No description available",
      mainImage: (prod.mainImage as string) || "/placeholder.svg",
      imageThumbnails: (prod.imageThumbnails as string[]) || [],
      category: (prod.category as string) || "",
      subCategory: (prod.subCategory as string) || "",
    }));
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
}

const ProductPage = () => {
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [currentImage, setCurrentImage] = useState<string>("");
  const { addToCart } = useCart();
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    if (!productId) {
      notFound();
      return;
    }

    const fetchData = async () => {
      const products = await getData();

      const foundProduct = products.find((prod) => prod.id === productId);

      if (foundProduct) {
        setProduct(foundProduct);
        setCurrentImage(foundProduct.mainImage);

        const related = products.filter(
          (prod) =>
            prod.id !== productId &&
            prod.category === foundProduct.category &&
            prod.subCategory === foundProduct.subCategory
        );
        setRelatedProducts(related);
      } else {
        notFound();
      }
    };

    fetchData();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.mainImage,
      };
      addToCart(cartItem);

      setSuccessMessage("Product successfully added to cart!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  if (!productId || !product) return <div>Loading...</div>;

  return (
    <div className="bg-white-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <Image
              src={currentImage || "/placeholder.svg"}
              alt={product.title}
              width={600}
              height={600}
              className="rounded-lg shadow-md mb-4 object-cover w-full h-auto"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product.imageThumbnails.map((src, index) => (
                <Image
                  key={index}
                  src={src || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="cursor-pointer rounded-md border border-gray-300 shadow-sm hover:opacity-70 object-cover"
                  onClick={() => setCurrentImage(src)}
                />
              ))}
            </div>
          </div>

          <div className="md:flex-1 px-4">
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
            <div className="mb-2">
              {Array.from({ length: product.rating }, (_, i) => (
                <span key={i} className="text-yellow-500 text-3xl">
                  ★
                </span>
              ))}
              {Array.from({ length: 5 - product.rating }, (_, i) => (
                <span key={i} className="text-gray-300">
                  ★
                </span>
              ))}
              <span className="font-bold text-xl text-gray-500">{product.reviewCount} Reviews</span>
            </div>
            <p className="text-gray-600 my-4">{product.description}</p>
            <div className="text-lg font-bold text-gray-700 mb-2">
              Price: Rs. {product.price.toLocaleString()}
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="flex-grow bg-black text-white py-2 px-4 rounded-full font-bold"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button className="py-2 px-3 text-xl font-bold">
                <CiHeart />
              </button>
              <button className="py-2 px-3 text-xl font-bold">
                <FaEye />
              </button>
            </div>

            {successMessage && (
              <div className="mt-4 text-green-500 font-semibold p-4 bg-green-100 rounded-lg shadow-lg">
                {successMessage}
              </div>
            )}
          </div>
        </div>
        <RelatedProduct relatedProducts={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;

// "use client";
// import { useEffect, useState } from "react";
// import { useParams, notFound } from "next/navigation";
// import Image from "next/image";
// import { client } from "@/sanity/lib/client";
// import { FaEye } from "react-icons/fa6";
// import { CiHeart } from "react-icons/ci";
// import { useCart, type CartItem } from "@/app/api/add to card/useCart";
// import RelatedProduct from "@/Components/shoppage/Related product";

// interface Product {
//   id: string;
//   title: string;
//   price: number;
//   mainImage: string;
//   rating: number;
//   reviewCount: number;
//   description: string;
//   imageThumbnails: string[];
//   category: string;
//   subCategory: string;
// }

// async function getData(): Promise<Product[]> {
//   try {
//     const fetchData = await client.fetch(`
//       *[_type == "productDetails"]{
//         _id,
//         title,
//         price,
//         rating,
//         reviewCount,
//         description,
//         "imageThumbnails": imageThumbnails[].asset->url,
//         "mainImage": mainImage.asset->url,
//         category,
//         subCategory
//       }
//     `);

//     return fetchData.map((prod: Record<string, unknown>) => ({
//       id: prod._id as string,
//       title: (prod.title as string) || "Untitled",
//       price: typeof prod.price === "number" ? prod.price : parseFloat(prod.price as string) || 0,
//       rating: (prod.rating as number) || 0,
//       reviewCount: (prod.reviewCount as number) || 0,
//       description: (prod.description as string) || "No description available",
//       mainImage: (prod.mainImage as string) || "/placeholder.svg",
//       imageThumbnails: (prod.imageThumbnails as string[]) || [],
//       category: (prod.category as string) || "",
//       subCategory: (prod.subCategory as string) || "",
//     }));
//   } catch (err) {
//     console.error("Error fetching data:", err);
//     return [];
//   }
// }

// const ProductPage = () => {
//   const params = useParams();
//   const productId = params?.id as string;

//   if (!productId) {
//     notFound();
//     return <div>Product not found.</div>;
//   }

//   const [product, setProduct] = useState<Product | null>(null);
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
//   const [currentImage, setCurrentImage] = useState<string>("");
//   const { addToCart } = useCart();
//   const [successMessage, setSuccessMessage] = useState<string>("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const products = await getData();

//       const foundProduct = products.find((prod) => prod.id === productId);

//       if (foundProduct) {
//         setProduct(foundProduct);
//         setCurrentImage(foundProduct.mainImage);

//         const related = products.filter(
//           (prod) =>
//             prod.id !== productId &&
//             prod.category === foundProduct.category &&
//             prod.subCategory === foundProduct.subCategory
//         );
//         setRelatedProducts(related);
//       } else {
//         notFound();
//       }
//     };

//     fetchData();
//   }, [productId]);

//   const handleAddToCart = () => {
//     if (product) {
//       const cartItem: CartItem = {
//         id: product.id,
//         title: product.title,
//         price: product.price,
//         quantity: 1,
//         image: product.mainImage,
//       };
//       addToCart(cartItem);

//       setSuccessMessage("Product successfully added to cart!");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     }
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="bg-white-100 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col md:flex-row -mx-4">
//           <div className="w-full md:w-1/2 px-4 mb-8">
//             <Image
//               src={currentImage || "/placeholder.svg"}
//               alt={product.title}
//               width={600}
//               height={600}
//               className="rounded-lg shadow-md mb-4 object-cover w-full h-auto"
//             />
//             <div className="flex gap-4 py-4 justify-center overflow-x-auto">
//               {product.imageThumbnails.map((src, index) => (
//                 <Image
//                   key={index}
//                   src={src || "/placeholder.svg"}
//                   alt={`Thumbnail ${index + 1}`}
//                   width={100}
//                   height={100}
//                   className="cursor-pointer rounded-md border border-gray-300 shadow-sm hover:opacity-70 object-cover"
//                   onClick={() => setCurrentImage(src)}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="md:flex-1 px-4">
//             <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
//             <div className="mb-2">
//               {Array.from({ length: product.rating }, (_, i) => (
//                 <span key={i} className="text-yellow-500 text-3xl">
//                   ★
//                 </span>
//               ))}
//               {Array.from({ length: 5 - product.rating }, (_, i) => (
//                 <span key={i} className="text-gray-300">
//                   ★
//                 </span>
//               ))}
//               <span className="font-bold text-xl text-gray-500">{product.reviewCount} Reviews</span>
//             </div>
//             <p className="text-gray-600 my-4">{product.description}</p>
//             <div className="text-lg font-bold text-gray-700 mb-2">
//               Price: Rs. {product.price.toLocaleString()}
//             </div>

//             <div className="flex items-center space-x-4">
//               <button
//                 className="flex-grow bg-black text-white py-2 px-4 rounded-full font-bold"
//                 onClick={handleAddToCart}
//               >
//                 Add to Cart
//               </button>
//               <button className="py-2 px-3 text-xl font-bold">
//                 <CiHeart />
//               </button>
//               <button className="py-2 px-3 text-xl font-bold">
//                 <FaEye />
//               </button>
//             </div>

//             {successMessage && (
//               <div className="mt-4 text-green-500 font-semibold p-4 bg-green-100 rounded-lg shadow-lg">
//                 {successMessage}
//               </div>
//             )}
//           </div>
//         </div>
//         <RelatedProduct relatedProducts={relatedProducts} />
//       </div>
//     </div>
//   );
// };

// export default ProductPage;




// // "use client";
// // import { useEffect, useState } from "react";
// // import { useParams, notFound } from "next/navigation";
// // import Image from "next/image";
// // import { client } from "@/sanity/lib/client";
// // import { FaEye } from "react-icons/fa6";
// // import { CiHeart } from "react-icons/ci";
// // import { useCart, type CartItem } from "@/app/api/add to card/useCart";
// // import RelatedProduct from "@/Components/shoppage/Related product";

// // interface Product {
// //   id: string;
// //   title: string;
// //   price: number;
// //   mainImage: string;
// //   rating: number;
// //   reviewCount: number;
// //   description: string;
// //   imageThumbnails: string[];
// //   category: string;
// //   subCategory: string;
// // }

// // async function getData(): Promise<Product[]> {
// //   try {
// //     const fetchData = await client.fetch(`
// //       *[_type == "productDetails"]{
// //         _id,
// //         title,
// //         price,
// //         rating,
// //         reviewCount,
// //         description,
// //         "imageThumbnails": imageThumbnails[].asset->url,
// //         "mainImage": mainImage.asset->url,
// //         category,
// //         subCategory
// //       }
// //     `);

// //     return fetchData.map((prod: any) => ({
// //       id: prod._id,
// //       title: prod.title || "Untitled",
// //       price: typeof prod.price === "number" ? prod.price : parseFloat(prod.price) || 0,
// //       rating: prod.rating || 0,
// //       reviewCount: prod.reviewCount || 0,
// //       description: prod.description || "No description available",
// //       mainImage: prod.mainImage || "/placeholder.svg",
// //       imageThumbnails: prod.imageThumbnails || [],
// //       category: prod.category || "",
// //       subCategory: prod.subCategory || "",
// //     }));
// //   } catch (err) {
// //     console.error("Error fetching data:", err);
// //     return [];
// //   }
// // }

// // const ProductPage = () => {
// //   const params = useParams();
// //   const productId = params?.id as string;

// //   if (!productId) {
// //     notFound();
// //     return <div>Product not found.</div>;
// //   }

// //   const [productItems, setProductItems] = useState<Product[]>([]);
// //   const [product, setProduct] = useState<Product | null>(null);
// //   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
// //   const [currentImage, setCurrentImage] = useState("");
// //   const { addToCart } = useCart();
// //   const [successMessage, setSuccessMessage] = useState<string>("");

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const products = await getData();
// //       setProductItems(products);

// //       const foundProduct = products.find((prod) => prod.id === productId);

// //       if (foundProduct) {
// //         setProduct(foundProduct);
// //         setCurrentImage(foundProduct.mainImage);

// //         const related = products.filter(
// //           (prod) =>
// //             prod.id !== productId &&
// //             prod.category === foundProduct.category &&
// //             prod.subCategory === foundProduct.subCategory
// //         );
// //         setRelatedProducts(related);
// //       } else {
// //         notFound();
// //       }
// //     };

// //     fetchData();
// //   }, [productId]);

// //   const handleAddToCart = () => {
// //     if (product) {
// //       const cartItem: CartItem = {
// //         id: product.id,
// //         title: product.title,
// //         price: product.price,
// //         quantity: 1,
// //         image: product.mainImage,
// //       };
// //       addToCart(cartItem);

// //       setSuccessMessage("Product successfully added to cart!");
// //       setTimeout(() => setSuccessMessage(""), 3000);
// //     }
// //   };

// //   if (!product) return <div>Loading...</div>;

// //   return (
// //     <div className="bg-white-100 py-8">
// //       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex flex-col md:flex-row -mx-4">
// //           <div className="w-full md:w-1/2 px-4 mb-8">
// //             <Image
// //               src={currentImage || "/placeholder.svg"}
// //               alt={product.title}
// //               width={600}
// //               height={600}
// //               className="rounded-lg shadow-md mb-4 object-cover w-full h-auto"
// //             />
// //             <div className="flex gap-4 py-4 justify-center overflow-x-auto">
// //               {product.imageThumbnails.map((src, index) => (
// //                 <Image
// //                   key={index}
// //                   src={src || "/placeholder.svg"}
// //                   alt={`Thumbnail ${index + 1}`}
// //                   width={100}
// //                   height={100}
// //                   className="cursor-pointer rounded-md border border-gray-300 shadow-sm hover:opacity-70 object-cover"
// //                   onClick={() => setCurrentImage(src)}
// //                 />
// //               ))}
// //             </div>
// //           </div>

// //           <div className="md:flex-1 px-4">
// //             <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
// //             <div className="mb-2">
// //               {Array.from({ length: product.rating }, (_, i) => (
// //                 <span key={i} className="text-yellow-500 text-3xl">
// //                   ★
// //                 </span>
// //               ))}
// //               {Array.from({ length: 5 - product.rating }, (_, i) => (
// //                 <span key={i} className="text-gray-300">
// //                   ★
// //                 </span>
// //               ))}
// //               <span className="font-bold text-xl text-gray-500">{product.reviewCount} Reviews</span>
// //             </div>
// //             <p className="text-gray-600 my-4">{product.description}</p>
// //             <div className="text-lg font-bold text-gray-700 mb-2">
// //               Price: Rs. {product.price.toLocaleString()}
// //             </div>

// //             <div className="flex items-center space-x-4">
// //               <button
// //                 className="flex-grow bg-black text-white py-2 px-4 rounded-full font-bold"
// //                 onClick={handleAddToCart}
// //               >
// //                 Add to Cart
// //               </button>
// //               <button className="py-2 px-3 text-xl font-bold">
// //                 <CiHeart />
// //               </button>
// //               <button className="py-2 px-3 text-xl font-bold">
// //                 <FaEye />
// //               </button>
// //             </div>

// //             {successMessage && (
// //               <div className="mt-4 text-green-500 font-semibold p-4 bg-green-100 rounded-lg shadow-lg">
// //                 {successMessage}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //         <RelatedProduct relatedProducts={relatedProducts} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductPage;
