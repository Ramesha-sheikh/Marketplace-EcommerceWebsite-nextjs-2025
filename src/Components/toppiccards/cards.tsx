import React from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "../../sanity/lib/client";

const HomeCards = async () => {
  interface Product {
    id: string;
    _id: string; // Include _id to match the fetched data
    title: string;
    price: string;
    mainImage: string;
    category: string;
  }

  // Fetch data from Sanity, including the category
  const res = await client.fetch<Product[]>(`
    *[_type == "productDetails"] | order(_createdAt asc) {
      _id,
      title,
      price,
      category,
      "mainImage": mainImage.asset->url
    }
  `);

  // Filtering duplicates based on category
  const limitedProducts: Product[] = res
    .slice(0, 4) // Limiting to first 4 products
    .filter((product, index, self) => 
      // Filter out duplicates based on category
      index === self.findIndex((p) => p.category === product.category)
    )
    .map((product): Product => ({
      id: product._id,
      _id: product._id, // Map _id to the Product interface
      title: product.title,
      price: product.price,
      mainImage: product.mainImage || "/default-image.jpg", // Fallback to default image
      category: product.category, // Map category to the product
    }));

  return (
    <div className="max-w-[1440px] min-h-[800px]">
      <div className="flex flex-col items-center text-center">
        <p className="font-[500] text-[36px] leading-[54px] mt-20">
          Top Picks For You
        </p>
        <p className="font-[500] text-[16px] leading-[24px] text-[#9F9F9F] mt-5 max-w-2xl">
          Find a bright ideal to suit your taste with our great selection of suspension, floor, and table lights.
        </p>
      </div>

      <div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 px-4 sm:px-6">
            {limitedProducts.map((product) => (
              <Link
                href={`/cardsproduct/${product.category}`} // Use the product category for the URL
                key={product.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
              >
                <div>
                  <Image
                    src={product.mainImage}
                    alt={`Image of ${product.title}`}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-28">
          <Link href="/shopnow">
            <p className="underline underline-offset-8 mt-2 cursor-pointer font-[500] text-[16px] transition-transform hover:scale-105 hover:text-gray-700">
              View More
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
