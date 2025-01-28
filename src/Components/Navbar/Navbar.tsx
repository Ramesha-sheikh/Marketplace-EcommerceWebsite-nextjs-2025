

"use client"
import { useState, useEffect } from "react"
import { RiAccountCircleLine } from "react-icons/ri"
import { FiSearch } from "react-icons/fi"
import { FaRegHeart } from "react-icons/fa"
import { IoCartOutline, IoCloseOutline } from "react-icons/io5"
import { TiThMenu } from "react-icons/ti"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { client } from "../../sanity/lib/client"

interface Product {
  _id: string
  title: string
  price: string
  mainImage: string
  description: string
  category: string
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [showResults, setShowResults] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await client.fetch<Product[]>(`
          *[_type == "productDetails"] {
            _id,
            title,
            price,
            description,
            "mainImage": mainImage.asset->url,
            category
          }
        `)
        setProducts(fetchedProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.length > 0) {
      const results = products.filter(
        (product) =>
          product.title.toLowerCase().includes(term.toLowerCase()) ||
          product.description.toLowerCase().includes(term.toLowerCase()) ||
          product.category.toLowerCase().includes(term.toLowerCase()),
      )
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  const handleProductClick = (category: string) => {
    setSearchOpen(false)
    setSearchTerm("")
    setSearchResults([])
    router.push(`/cardsproduct/${category}`)
  }

  return (
    <div>
      <nav className="relative z-50 max-w-[1440px] h-[100px] bg-[#FBEBB5] flex flex-row sm:flex-row justify-between items-center px-4 sm:px-8 py-4">
        <button className="text-black text-xl sm:hidden mr-auto" onClick={() => setIsOpen(!isOpen)}>
          <TiThMenu />
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} absolute sm:static top-20 right-0 w-full sm:w-auto bg-[#FBEBB5] sm:flex sm:flex-1 flex-col sm:flex-row items-center text-black text-[16px] font-[500] leading-[24px] z-50`}
        >
          <div className="flex flex-col sm:flex-1 sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
            <Link href="/" className="text-black text-[14px] sm:text-[16px] font-[500] leading-[24px]">
              Home
            </Link>
            <Link href="/shopnow" className="text-black text-[14px] sm:text-[16px] font-[500] leading-[24px]">
              Shop
            </Link>
            <Link href="/About" className="text-black text-[14px] sm:text-[16px] font-[500] leading-[24px]">
              About
            </Link>
            <Link href="/contact" className="text-black text-[14px] sm:text-[16px] font-[500] leading-[24px]">
              Contact
            </Link>
            <Link href="/faq" className="text-black text-[14px] sm:text-[16px] font-[500] leading-[24px]">
              FAQ
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4 sm:space-x-6 text-[20px] sm:text-[24px] sm:mt-0">
          <button onClick={() => setSearchOpen(!searchOpen)}>
            <FiSearch />
          </button>
          <button>
            <FaRegHeart />
          </button>
          <button>
            <RiAccountCircleLine />
          </button>
          <button>
            <Link href={`/Cart`}>
              <IoCartOutline />
            </Link>
          </button>
        </div>
      </nav>

      {/* Search Dropdown */}
      <div
        className={`${searchOpen ? "translate-y-0" : "-translate-y-full"} transition-transform duration-500 ease-in-out fixed top-0 left-0 w-full bg-[#B88E2F] shadow-md z-50`}
      >
        {/* Close Icon */}
        <button
          onClick={() => {
            setSearchTerm("")
            setSearchResults([])
            setSearchOpen(false)
          }}
          className="absolute top-4 right-4 text-gray-600 text-2xl"
        >
          <IoCloseOutline />
        </button>

        {/* Search Input */}
        <div className="p-4 max-w-2xl mx-auto flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="flex-grow py-3 px-6 text-sm border border-gray-300 rounded-l-md focus:outline-none shadow-lg"
          />
        </div>

        {/* Search Results */}
        {showResults && searchResults.length > 0 && (
          <div className="p-4 max-w-2xl mx-auto space-y-2">
            {searchResults.map((product) => (
              <button
                key={product._id}
                onClick={() => handleProductClick(product.category)}
                className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                {product.title} - {product.category}
              </button>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {showResults && searchResults.length === 0 && (
          <div className="p-4 max-w-2xl mx-auto text-gray-500 text-center">No results found.</div>
        )}
      </div>
    </div>
  )
}

export default Navbar













