import { NextResponse } from "next/server"

interface WishlistItem {
  productId: string
  name: string
  price: string
  imageUrl: string
}

// Explicit type for wishlist to prevent type conflicts
export let wishlist: WishlistItem[] = [] 

// Fetch the secret key from environment variables (without NEXT_PUBLIC_ prefix)
const API_SECRET_KEY = process.env.API_SECRET_KEY

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("Authorization")
  return authHeader === `Bearer ${API_SECRET_KEY}` // Make sure the Authorization header matches the secret key
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return NextResponse.json(wishlist)
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const item: WishlistItem = await request.json()

    if (!item.productId || !item.name || !item.price || !item.imageUrl) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
    }

    const exists = wishlist.some((i) => i.productId === item.productId)
    if (!exists) {
      wishlist.push(item)
    }

    return NextResponse.json(wishlist)
  } catch {
    return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    wishlist = wishlist.filter((item) => item.productId !== productId)
    return NextResponse.json(wishlist)
  } catch {
    return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 })
  }
}
