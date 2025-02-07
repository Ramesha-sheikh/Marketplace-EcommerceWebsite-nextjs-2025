"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import Filters from "@/Components/shoppage/filter";
import Pagination from '@/Components/shoppage/pagination';
import SearchBar from "@/Components/shoppage/searchbar";
import { CiHeart } from "react-icons/ci";

// Define the Product interface
interface Product {
  _id: string;
  title: string;
  price: string;
  rating: number;
  reviewCount: number;
  description: string;
  imageThumbnails: string[];
  mainImage: string;
  socialMediaLinks: { url: string; icon: string }[];
  category: string;
  subCategory: string;
  colors: { name: string; hex: string }[] | null;
}

const Shoppage = () => {
  const [productItems, setProductItems] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>("");
  const [colorFilter, setColorFilter] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [progress, setProgress] = useState<number>(100)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(8);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch<Product[]>(`
          *[_type == "productDetails"] {
            _id,
            title,
            price,
            rating,
            reviewCount,
            description,
            "imageThumbnails": imageThumbnails[].asset->url,
            "mainImage": mainImage.asset->url,
            "socialMediaLinks": socialMediaLinks[platform match "facebook"]{
              "url": url,
              "icon": icon.asset->url,
            },
            category,
            subCategory,
            colors
          }
        `);

        // Shuffling products and updating state
        const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
        setProductItems(shuffledProducts);
        setFilteredProducts(shuffledProducts);

        // Updating categories, subcategories, and colors
        const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
        setCategories(uniqueCategories);

        const uniqueSubCategories = Array.from(new Set(products.map((product) => product.subCategory)));
        setSubCategories(uniqueSubCategories);

        const uniqueColors = Array.from(
          new Set(products.flatMap((product) => (product.colors ? product.colors.map((color) => color.name) : [])))
        );
        setColors(uniqueColors);
      } catch (error) {
        console.error("Error fetching product items:", error);
      }
    };
    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    const applyFilters = () => {
      let filtered = productItems;

      if (searchTerm) {
        filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
      }

      if (categoryFilter) {
        filtered = filtered.filter((product) => product.category === categoryFilter);
      }

      if (subCategoryFilter) {
        filtered = filtered.filter((product) => product.subCategory === subCategoryFilter);
      }

      if (colorFilter) {
        filtered = filtered.filter((product) => product.colors?.some((color) => color.name === colorFilter));
      }

      // Shuffle filtered products again
      const shuffledFilteredProducts = [...filtered].sort(() => Math.random() - 0.5);
      setFilteredProducts(shuffledFilteredProducts);
    };

    applyFilters();
  }, [categoryFilter, subCategoryFilter, colorFilter, searchTerm, productItems]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleAddToWishlist = async (product: Product) => {
      if (!product) return;
  
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer s0us43zv22",
          // "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`, // ✅ Secure API key
        },
        body: JSON.stringify({
          productId: product._id,
          name: product.title, // ✅ Correct name field
          price: product.price,
          imageUrl: product.mainImage, // ✅ Correct image field
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add item to wishlist");
      }
  
      setSuccessMessage("Successfully added to wishlist!");
      setTimeout(() => setSuccessMessage(""), 3000);
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
  


  return (
    <div className="relative">
      {/* Your header and background images */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-center mb-8">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearch} />
        </div>
      </div>

      <Filters
        categories={categories}
        subCategories={subCategories}
        colors={colors}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        subCategoryFilter={subCategoryFilter}
        setSubCategoryFilter={setSubCategoryFilter}
        colorFilter={colorFilter}
        setColorFilter={setColorFilter}
        filteredProductsLength={filteredProducts.length}
        productItemsLength={productItems.length}
      />

      <div className="bg-gray-50 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <div key={product._id} className="relative">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
                      <div className="absolute bottom-2 right-2 z-10">
            <button
              onClick={() => handleAddToWishlist(product)}
              className="py-2 px-3 text-xl font-extrabold "
              aria-label={`Add ${product.title} to wishlist`}
            >
              <CiHeart />
            </button>
                      </div>
                      <Link href={`/cardproduct/${product._id}`}>

                      <Image
                        src={product.mainImage || "/placeholder.svg"}
                        alt={`Image of ${product.title}`}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                       </Link>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                        <p className="text-gray-600 mt-2">{product.price}</p>
                      </div>
                    </div>
                 
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products available based on the selected filters or search term.
              </p>
            )}
          </div>
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default Shoppage;
function setSuccessMessage(arg0: string) {
  throw new Error("Function not implemented.");
}

