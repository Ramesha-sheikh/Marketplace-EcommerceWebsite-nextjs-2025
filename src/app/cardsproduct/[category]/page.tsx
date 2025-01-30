"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import Link from 'next/link';

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
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const category = params.category as string;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!category) {
        console.error("Category is undefined. Please check the URL.");
        return;
      }

      console.log("Category from URL:", category);
      const formattedCategory = category.replace(/-/g, "_").toLowerCase();
      console.log("Formatted category:", formattedCategory);

      try {
        const query = `
          *[_type == "productDetails" && (
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
          }
        `;

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

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-10">No products found in this category.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
<h1
  className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-extrabold mb-6 text-center uppercase text-black bg-clip-text tracking-wide animate-pulse"
  style={{ fontFamily: "'Poppins', sans-serif" }}
>
  PRODUCTS IN {category.replace(/-/g, " ").toUpperCase()}
</h1>



      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg flex flex-col items-center shadow-md hover:shadow-xl transition-all duration-300 bg-white w-full pt-2 pl-2 py-2 pr-2"
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
            <h3 className="text-lg font-semibold text-center mb-1 text-gray-800">{product.title}</h3>
            <p className="text-gray-700 font-bold mb-1 text-base">Price: {product.price}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
            <p className="text-sm text-gray-500">Subcategory: {product.subCategory}</p>
            {product.tags && product.tags.length > 0 && (
              <div className="mt-2 w-full text-center">
                <p className="text-sm text-gray-500">Tags:</p>
                <div className="flex flex-wrap justify-center gap-1 mt-1">
                  {product.tags.map((tag: string, index: number) => (
                    <span key={index} className="bg-gray-300 text-gray-800 text-xs px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;




