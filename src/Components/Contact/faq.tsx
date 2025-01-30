

'use client'
import type React from "react"
import { useState, useEffect } from "react"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import { client } from "@/sanity/lib/client"
import Link from "next/link"

interface FAQ {
  _id: string
  question: string
  answer: string
  category: string
  isTopQuestion: boolean
}

const FAQHelpCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [openTopFAQ, setOpenTopFAQ] = useState<string | null>(null) // State for Top FAQ
  const [openCategoryFAQs, setOpenCategoryFAQs] = useState<{
    [category: string]: string | null
  }>({}) // State for each category FAQ

  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    const query = `
      *[_type == "faq"] {
        _id,
        question,
        answer,
        category,
        isTopQuestion
      }
    `
    try {
      const faqData = await client.fetch(query)

      // Cast the fetched data to the appropriate type
      const typedFaqData: FAQ[] = faqData as FAQ[]

      setFaqs(typedFaqData)

      // Extract unique categories from the fetched FAQs
      const uniqueCategories = [
        ...new Set(typedFaqData.map((faq) => faq.category)),
      ]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error("Error fetching FAQs:", error)
    }
  }

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Function to toggle top FAQ
  const toggleTopFAQ = (faqId: string) => {
    setOpenTopFAQ(openTopFAQ === faqId ? null : faqId)
  }

  // Function to toggle category FAQ
  const toggleCategoryFAQ = (category: string, faqId: string) => {
    setOpenCategoryFAQs((prevState) => ({
      ...prevState,
      [category]: prevState[category] === faqId ? null : faqId, // Toggle the clicked FAQ
    }))
  }

  return (
    <div className="bg-white p-8 rounded-lg relative max-w-4xl ">
      <h2 className="text-3xl font-extrabold text-black mb-6">FAQ & Help Center</h2>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full px-6 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-4 top-3 h-5 w-5 text-gray-500" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Display Top Questions First */}
        {filteredFAQs
          .filter((faq) => faq.isTopQuestion)
          .map((faq) => (
            <div key={faq._id} className="bg-white rounded-lg border-b pb-4 ">
              <button
                className="flex justify-between items-center w-full text-left font-semibold text-gray-800 py-3 px-4"
                onClick={() => toggleTopFAQ(faq._id)}
              >
                <span>{faq.question} <span className="text-sm text-gray-500">[Top Question]</span></span>
                {openTopFAQ === faq._id ? <ChevronUp className="h-5 w-5 text-[#B88E2F]" /> : <ChevronDown className="h-5 w-5 text-[#B88E2F]" />}
              </button>
              {openTopFAQ === faq._id && <p className="mt-2 text-gray-600 px-4">{faq.answer}</p>}
            </div>
          ))}

        {/* Display FAQs by Dynamically Fetched Categories */}
        {categories.map((category) => {
          const categoryFAQs = filteredFAQs.filter((faq) => faq.category === category)
          if (categoryFAQs.length > 0) {
            return (
              <div key={category} className="bg-white rounded-lg shadow-md border-b pb-4">
                <button
                  className="flex justify-between items-center w-full text-left font-semibold text-[#B88E2F] py-3 px-4"
                  onClick={() => {
                    setOpenCategoryFAQs((prevState) => ({
                      ...prevState,
                      [category]: prevState[category] ? null : categoryFAQs[0]._id, // Open first FAQ in category (initially)
                    }))
                  }}
                >
                  <span>{category}</span>
                  {openCategoryFAQs[category] ? (
                    <ChevronUp className="h-5 w-5 text-[#B88E2F]" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#B88E2F]" />
                  )}
                </button>
                {openCategoryFAQs[category] && (
                  <div className="ml-4 space-y-2">
                    {categoryFAQs.map((faq) => (
                      <div key={faq._id} className="border-b pb-2">
                        <button
                          className="flex justify-between items-center text-[#B88E2F] w-full text-left font-semibold py-2 px-4"
                          onClick={() => toggleCategoryFAQ(category, faq._id)}
                        >
                          <span>{faq.question}</span>
                          {openCategoryFAQs[category] === faq._id ? (
                            <ChevronUp className="h-5 w-5 text-[#B88E2F]" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-[#B88E2F]" />
                          )}
                        </button>
                        {openCategoryFAQs[category] === faq._id && (
                          <p className="mt-2 text-gray-600 px-4">{faq.answer}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          }
          return null
        })}
      </div>

      {/* Footer Section for Contact Button */}
      <footer className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-white mb-4">Need more help?</h3>
        <Link href="/contact">
          <button className="bg-black text-white px-6 py-3 rounded-md hover:opacity-80 transition-opacity duration-300">
            Contact Support
          </button>
        </Link>
      </footer>
    </div>
  )
}

export default FAQHelpCenter
