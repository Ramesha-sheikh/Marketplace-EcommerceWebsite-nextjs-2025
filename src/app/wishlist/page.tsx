'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface WishlistItem {
  productId: string
  name: string
  price: string
  imageUrl: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const response = await fetch("/api/wishlist", {
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`, // Use dynamic API key
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch wishlist")
      }
      const data = await response.json()
      console.log("Wishlist Data:", data)
      setWishlistItems(Array.isArray(data.wishlist) ? data.wishlist : [])
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching wishlist:", error.message)
      } else {
        console.error("An unexpected error occurred:", error)
      }
      setWishlistItems([])
    }
  }

  const removeFromWishlist = async (productId: string) => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`, // Use dynamic API key
        },
        body: JSON.stringify({ productId }),
      })
      if (!response.ok) {
        throw new Error("Failed to remove item from wishlist")
      }
      fetchWishlist()
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error removing from wishlist:", error.message)
      } else {
        console.error("An unexpected error occurred:", error)
      }
    }
  }

  const handleCardClick = (productId: string) => {
    router.push(`/Carddeatils/${productId}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      {wishlistItems && wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card
              key={item.productId}
              className="cursor-pointer"
              onClick={() => handleCardClick(item.productId)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromWishlist(item.productId)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  )
}

// 'use client'

// import { useEffect, useState } from "react"
// import Image from "next/image"
// import { Button } from "@/Components/ui/button"
// import { Card, CardContent } from "@/Components/ui/card"
// import { Trash2 } from "lucide-react"
// import { useRouter } from "next/navigation"

// interface WishlistItem {
//   productId: string
//   name: string
//   price: string
//   imageUrl: string
// }

// export default function WishlistPage() {
//   const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
//   const router = useRouter()

//   useEffect(() => {
//     fetchWishlist()
//   }, [])

//   const fetchWishlist = async () => {
//     try {
//       const response = await fetch("/api/wishlist", {
//         headers: {
//           "Authorization": "Bearer s0us43zv22",
//         },
//       })
//       if (!response.ok) {
//         throw new Error("Failed to fetch wishlist")
//       }
//       const data = await response.json()
//       console.log("Wishlist Data:", data)
//       setWishlistItems(Array.isArray(data.wishlist) ? data.wishlist : [])
//     } catch (error: any) {
//       console.error("Error fetching wishlist:", error.message || error)
//       setWishlistItems([])
//     }
//   }

//   const removeFromWishlist = async (productId: string) => {
//     try {
//       const response = await fetch("/api/wishlist", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": "Bearer s0us43zv22",
//         },
//         body: JSON.stringify({ productId }),
//       })
//       if (!response.ok) {
//         throw new Error("Failed to remove item from wishlist")
//       }
//       fetchWishlist()
//     } catch (error: any) {
//       console.error("Error removing from wishlist:", error.message || error)
//     }
//   }

//   const handleCardClick = (productId: string) => {
//     router.push(`/Carddeatils/${productId}`)
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
//       {wishlistItems && wishlistItems.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {wishlistItems.map((item) => (
//             <Card
//               key={item.productId}
//               className="cursor-pointer"
//               onClick={() => handleCardClick(item.productId)}
//             >
//               <CardContent className="p-4">
//                 <div className="flex items-center space-x-4">
//                   <Image
//                     src={item.imageUrl || "/placeholder.svg"}
//                     alt={item.name}
//                     width={80}
//                     height={80}
//                     className="rounded-md"
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold">{item.name}</h3>
//                     <p className="text-sm text-gray-500">${item.price}</p>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={(e) => {
//                       e.stopPropagation()
//                       removeFromWishlist(item.productId)
//                     }}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <p>Your wishlist is empty.</p>
//       )}
//     </div>
//   )
// }



