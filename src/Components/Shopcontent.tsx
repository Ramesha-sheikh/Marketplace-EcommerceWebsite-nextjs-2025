"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { FaChevronRight, FaSearch } from "react-icons/fa"
import Link from "next/link"
import { client } from "../sanity/lib/client"
import Filters from "@/Components/shoppage/filter"

// Define the Product interface
interface Product {
  _id: string
  title: string
  price: string
  rating: number
  reviewCount: number
  description: string
  imageThumbnails: string[]
  mainImage: string
  socialMediaLinks: { url: string; icon: string }[]
  category: string
  subCategory: string
  colors: { name: string; hex: string }[] | null
}

const Shoppage = () => {
  const [productItems, setProductItems] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string>("")
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>("")
  const [colorFilter, setColorFilter] = useState<string>("")
  const [categories, setCategories] = useState<string[]>([])
  const [subCategories, setSubCategories] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch<Product[]>(
          `*[_type == "productDetails"] {
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
          }`,
        )

        const shuffledProducts = [...products].sort(() => Math.random() - 0.5)
        setProductItems(shuffledProducts)
        setFilteredProducts(shuffledProducts)

        const uniqueCategories = Array.from(new Set(products.map((product) => product.category)))
        setCategories(uniqueCategories)

        const uniqueSubCategories = Array.from(new Set(products.map((product) => product.subCategory)))
        setSubCategories(uniqueSubCategories)

        const uniqueColors = Array.from(
          new Set(products.flatMap((product) => (product.colors ? product.colors.map((color) => color.name) : []))),
        )
        setColors(uniqueColors)
      } catch (error) {
        console.error("Error fetching product items:", error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const applyFilters = () => {
      let filtered = productItems

      if (searchTerm) {
        filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
      }

      if (categoryFilter) {
        filtered = filtered.filter((product) => product.category === categoryFilter)
      }
      if (subCategoryFilter) {
        filtered = filtered.filter((product) => product.subCategory === subCategoryFilter)
      }
      if (colorFilter) {
        filtered = filtered.filter((product) => product.colors?.some((color) => color.name === colorFilter))
      }

      const shuffledFilteredProducts = [...filtered].sort(() => Math.random() - 0.5)
      setFilteredProducts(shuffledFilteredProducts)
    }

    applyFilters()
  }, [categoryFilter, subCategoryFilter, colorFilter, productItems, searchTerm])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="relative">
      <div className="relative">
        <Image
          src="/Spic1.png"
          alt="Main Background"
          width={1440}
          height={316}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Image src="/Spic2.png" alt="Logo" width={77} height={77} className="w-[7%] md:w-[77px] md:h-[77px]" />
          <p className="font-[500] text-[24px] sm:text-[36px] md:text-[48px] lg:text-[56px] leading-[36px] text-black">
            Shop
          </p>
          <div className="text-[12px] sm:text-[16px] text-gray-600 flex items-center space-x-1">
            <p>Home</p>
            <FaChevronRight className="text-gray-800" />
            <p>Shop</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link href={`/cardproduct/${product._id}`} key={product._id}>
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
                    <Image
                      src={product.mainImage || "/placeholder.svg"}
                      alt={`Image of ${product.title}`}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                      <p className="text-gray-600 mt-2">{product.price}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products available based on the selected filters or search term.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shoppage


