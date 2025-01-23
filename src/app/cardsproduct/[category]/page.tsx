



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
  const [products, setProducts] = useState<Product[]>([]); // Use the Product type here
  const [loading, setLoading] = useState(true);

  // Get category from URL params
  const params = useParams();
  const category = params.category as string;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!category) {
        console.error("Category is undefined. Please check the URL.");
        return;
      }

      console.log("Category from URL:", category);

      // Convert URL parameter to match Sanity schema format
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
        console.log("Sanity query:", query);

        const res = await client.fetch(query, { formattedCategory });

        console.log("Fetched Products:", res);

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
      <h1 className="text-3xl font-bold mb-6 text-center">
        Products in {category.replace(/-/g, " ").replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/cardproduct/${product._id}`}>
              <Image
                src={product.mainImage || "/placeholder.svg"}
                alt={product.title}
                width={300}
                height={300}
                className="object-cover rounded-lg mb-4 w-full h-64"
              />
            </Link>
            <h3 className="text-lg font-semibold text-center mb-2">{product.title}</h3>
            <p className="text-gray-600 font-bold mb-2">Price: {product.price}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
            <p className="text-sm text-gray-500">Subcategory: {product.subCategory}</p>
            {product.tags && product.tags.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Tags:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.tags.map((tag: string, index: number) => (
                    <span key={index} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
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
