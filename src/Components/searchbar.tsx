import type React from "react"
import { useState, useEffect } from "react"
import { CiSearch } from "react-icons/ci"
import { useRouter } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { FiX } from "react-icons/fi"

interface Product {
  _id: string
  name: string
  description: string
}

interface SearchBarProps {
  onClose: () => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const router = useRouter()

  useEffect(() => {
    if (searchTerm) {
      const fetchSearchResults = async () => {
        const query = `*[_type == "product" && (name match "${searchTerm}*" || description match "${searchTerm}*")] {
          _id,
          name,
          description
        }`
        try {
          const results = await client.fetch(query)
          setSearchResults(results)
        } catch (error) {
          console.error("Error fetching search results:", error)
          setSearchResults([])
        }
      }
      fetchSearchResults()
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm) {
      router.push(`/category?search=${encodeURIComponent(searchTerm)}`)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-white z-50 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Search Products</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex items-center border-b-2 border-gray-300">
            <CiSearch size={24} className="text-gray-500 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 focus:outline-none text-lg"
              placeholder="Search products..."
              autoFocus
            />
          </div>
        </form>
        {searchResults.length > 0 ? (
          <ul className="max-h-[calc(100vh-200px)] overflow-auto">
            {searchResults.map((product) => (
              <li key={product._id} className="p-2 hover:bg-gray-100 cursor-pointer">
                <button
                  onClick={() => {
                    router.push(`/category?search=${encodeURIComponent(product.name)}`)
                    onClose()
                  }}
                  className="w-full text-left"
                >
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{product.description}</p>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          searchTerm && <p className="text-gray-600">No results found for &quot;{searchTerm}&quot;</p>
        )}
      </div>
    </div>
  )
}

export default SearchBar

