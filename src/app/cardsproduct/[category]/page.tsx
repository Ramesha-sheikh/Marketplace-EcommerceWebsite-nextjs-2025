
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
// import { CiHeart } from "react-icons/ci"; // Heart icon for wishlist

// Define the product type
type Product = {
  _id: string;
  title: string;
  price: string;
  mainImage: string | null;
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
            lower(category) == $formattedCategory
          )] {
            _id,
            title,
            price,
            "mainImage": mainImage.asset->url
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

  // const handleAddToWishlist = async (product: Product) => {
  //   if (!product) return;

  //   try {
  //     const response = await fetch("/api/wishlist", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`,
  //       },
  //       body: JSON.stringify({
  //         productId: product._id,
  //         name: product.title,
  //         price: product.price,
  //         imageUrl: product.mainImage,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to add item to wishlist");
  //     }

  //     setSuccessMessage("Successfully added to wishlist!");
  //     setTimeout(() => setSuccessMessage(""), 3000);
  //     setProgress(100);
  //     setLoading(true);

  //     setTimeout(() => {
  //       const progressInterval = setInterval(() => {
  //         setProgress((prev) => {
  //           if (prev <= 0) {
  //             clearInterval(progressInterval);
  //             setSuccessMessage("");
  //             setLoading(false);
  //             return 0;
  //           }
  //           return prev - 5;
  //         });
  //       }, 50);
  //     }, 300);
  //   } catch (error) {
  //     console.error("Error adding to wishlist:", error);
  //     setError("Failed to add item to wishlist. Please try again.");
  //   }
  // };

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
              RS: {product.price}
            </p>
            <div className="absolute top-2 right-2 z-10">
              {/* <button
                onClick={() => handleAddToWishlist(product)}
                className="py-2 px-3 text-xl font-bold "
                aria-label={`Add ${product.title} to wishlist`}
              >
                <CiHeart />
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;






