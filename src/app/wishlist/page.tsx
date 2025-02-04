"use client"
import { useWishlistStore } from "@/app/api/add to card/store/mywishlist/wishlist"
import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlistStore()

  return (
    <main className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-center mt-4 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-sm text-center relative flex flex-col">
              <Link href={`/product/${product.id}`} className="flex-grow">
                <div className="relative w-full pb-[100%] mb-2">
                  <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded absolute top-0 left-0 w-full h-full"
                  />
                </div>
              </Link>
              <h3 className="text-sm sm:text-base font-semibold mt-2 line-clamp-2">{product.title}</h3>
              <p className="text-gray-800 font-bold mt-1 mb-2">Rs {product.discountedPrice.toFixed(2)}</p>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 sm:p-2 rounded-full hover:bg-red-600 transition-colors"
                aria-label="Remove from wishlist"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
</main>
)
}