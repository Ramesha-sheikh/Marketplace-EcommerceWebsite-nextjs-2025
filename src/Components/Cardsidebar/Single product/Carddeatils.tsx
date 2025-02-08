/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"


import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import Image from "next/image"
import { client } from "@/sanity/lib/client"
import { FaEye, FaRegStar, FaStar } from "react-icons/fa6"
import { CiHeart } from "react-icons/ci" // Heart icon
import { useCart, type CartItem } from "@/app/api/add to card/useCart"
import RelatedProduct from "@/Components/shoppage/Related product"
import { toast } from "react-toastify"
import { BiShareAlt } from "react-icons/bi"


interface Review {
  name: string
  rating: number
  comment: string
  date: string
}

interface Product {
  image: string
  name: string
  id: string
  title: string
  price: number
  mainImage: string
  rating: number
  reviewCount: number
  description: string
  imageThumbnails: string[]
  category: string
  subCategory: string
  reviews?: Review[]
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
        subCategory,
         reviews[] {
          name,
          rating,
          comment,
          date
        }
      }
    `)

    return fetchData.map((prod: Record<string, unknown>) => ({
      id: prod._id as string,
      title: (prod.title as string) || "Untitled",
      price: typeof prod.price === "number" ? prod.price : Number.parseFloat(prod.price as string) || 0,
      rating: (prod.rating as number) || 0,
      reviewCount: (prod.reviewCount as number) || 0,
      description: (prod.description as string) || "No description available",
      mainImage: (prod.mainImage as string) || "/placeholder.svg",
      imageThumbnails: (prod.imageThumbnails as string[]) || [],
      category: (prod.category as string) || "",
      subCategory: (prod.subCategory as string) || "",
      reviews: (prod.reviews as Review[]) || [],
    }))
  } catch (err) {
    console.error("Error fetching data:", err)
    return []
  }
}

const ProductPage = () => {
  const params = useParams()
  const productId = params?.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [currentImage, setCurrentImage] = useState<string>("")
  const [progress, setProgress] = useState<number>(100)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [review, setReview] = useState<Review>({
    name: "",
    rating: 0,
    comment: "",
    date: "",
  })

  const { addToCart } = useCart()
  const [successMessage, setSuccessMessage] = useState<string>("")

  useEffect(() => {
    if (!productId) {
      notFound()
      return
    }

    const fetchData = async () => {
      const products = await getData()

      const foundProduct = products.find((prod) => prod.id === productId)

      if (foundProduct) {
        setProduct(foundProduct)
        setCurrentImage(foundProduct.mainImage)

        const related = products.filter(
          (prod) =>
            prod.id !== productId &&
            prod.category === foundProduct.category &&
            prod.subCategory === foundProduct.subCategory,
        )
        setRelatedProducts(related)
      } else {
        notFound()
      }
    }

    fetchData()
  }, [productId])

  const handleAddToCart = () => {
    if (product) {
      const cartItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.mainImage,
      }
      addToCart(cartItem)

      setSuccessMessage("Product successfully added to cart!")
      setTimeout(() => setSuccessMessage(""), 3000)
    }
  }
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReview((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setReview((prev) => ({ ...prev, rating }))
  }

  const handleSubmitReview = async () => {
    if (!product || !review.name || !review.comment || review.rating === 0) {
      toast.error("Please fill out all fields and provide a rating.")
      return
    }

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SANITY_WRITE_TOKEN || ''}`, // ✅ Sanity API token

          // "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`, // Use dynamic API key

        },
        body: JSON.stringify({
          productId: product.id,
          review: {
            ...review,
            date: new Date().toISOString(),
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review.")
      }

      setProduct((prevProduct) => {
        if (!prevProduct) return data.updatedProduct
        return {
          ...prevProduct,
          reviews: data.updatedProduct.reviews,
        }
      })

      toast.success("Review submitted successfully!")
      setReview({ name: "", rating: 0, comment: "", date: "" })
    } catch (error) {
      console.error("Error submitting review:", error)
      toast.error(error instanceof Error ? error.message : "Failed to submit review.")
    }
  }

  const handleShare = () => {
    if (!product) {
      toast.error("Product is not available.")
      return
    }

    if (navigator.share) {
      navigator
        .share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
        .then(() => {
          toast.success("Product shared successfully!")
        })
        .catch((error) => {
          console.error("Error sharing the product: ", error)
          toast.error("Error sharing the product.")
        })
    } else {
      toast.error("Sharing is not supported on your device.")
    }
  }

  const handleAddToWishlist = async () => {
    if (!product) return;
  
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`, // Use dynamic API key
          // "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`, // ✅ Secure API key
        },
        body: JSON.stringify({
          productId: product.id,
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
  
  
  if (!productId || !product) return <div>Loading...</div>

  // Check if the product is in the wishlist
  const averageRating =
  (product.reviews?.reduce((sum, review) => sum + review.rating, 0) || 0) /
  (product.reviews?.length || 1); // Avoid division by zero

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
            <div className="flex justify-center sm:justify-start items-center mt-4">
            <div className="flex text-[#F3CD03] gap-2">
              {[...Array(5)].map((_, index) =>
                index < averageRating ? (
                  <FaStar key={index} size={24} />
                ) : (
                  <FaRegStar key={index} size={24} />
                )
              )}
            </div>
            <span className="ml-2 text-[#737373] font-bold text-[14px]">
              {product.reviews?.length || 0} Reviews
            </span>
          </div>
            <p className="text-gray-600 my-4">{product.description}</p>
            <div className="text-lg font-bold text-gray-700 mb-2">Price: Rs. {product.price.toLocaleString()}</div>

            <div className="flex items-center space-x-4">
              <button
                className="flex-grow bg-black text-white py-2 px-4 rounded-full font-bold"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button
              onClick={handleAddToWishlist}
              className="py-2 px-3 text-xl font-extrabold "
              aria-label={`Add ${product.name} to wishlist`}
            >
              <CiHeart />
            </button>
              <button className="py-2 px-3 text-xl font-bold">
                <FaEye />
              </button>
              <button className="py-2 px-3 text-xl font-bold" onClick={handleShare}>
                <BiShareAlt />
              </button>
            </div>
            {successMessage && (
              <div className="fixed top-28 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl transition-opacity duration-500 animate-fadeIn">
                {successMessage}
              </div>
            )}
            {/* Review Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-[#252B42] mb-4">Leave a Review</h3>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={review.name}
                  onChange={handleReviewChange}
                  className="p-2 border border-[#E8E8E8] rounded-lg"
                />
                <textarea
                  name="comment"
                  placeholder="Your Review"
                  value={review.comment}
                  onChange={handleReviewChange}
                  className="p-2 border border-[#E8E8E8] rounded-lg"
                  rows={4}
                />
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      className={`text-2xl ${star <= review.rating ? "text-[#F3CD03]" : "text-[#BDBDBD]"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <button onClick={handleSubmitReview} className="px-6 py-2 bg-yellow-500 text-white rounded-md mt-4">
                  Submit Review
                </button>
              </div>
            </div>

            {/* Reviews Display */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-[#252B42] mb-4">Customer Reviews</h3>
              {product.reviews?.map((review, index) => (
                <div key={index} className="mb-6">
                  <div className="flex items-center space-x-4">
                    <h4 className="font-semibold text-lg">{review.name}</h4>
                    <div className="flex space-x-1">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <span key={i} className="text-yellow-500">
                          ★
                        </span>
                      ))}
                      {Array.from({ length: 5 - review.rating }, (_, i) => (
                        <span key={i} className="text-gray-300">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-400">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <RelatedProduct relatedProducts={relatedProducts} />
      </div>
    </div>
  )
}

export default ProductPage


// function setProgress(update: number | ((prev: number) => number)) {
//   throw new Error("Function not implemented.")
// }

// function setLoading(arg0: boolean) {
//   throw new Error("Function not implemented.")
// }

// function setError(arg0: string) {
//   throw new Error("Function not implemented.")
// }



