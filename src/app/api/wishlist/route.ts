import { NextResponse } from "next/server";

interface WishlistItem {
  productId: string;
  name: string;
  price: string;
  imageUrl: string;
}

// Temporary in-memory wishlist (Ideally, use a database)
let wishlist: WishlistItem[] = [];

// Environment variable
const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY;
if (!API_SECRET_KEY) {
  console.error("🚨 API_SECRET_KEY is missing in environment variables.");
}
console.log("🔑 Loaded API_SECRET_KEY:", API_SECRET_KEY);
// "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_SECRET_KEY}`, // Use dynamic API key


// 🔹 Authorization check function
function isAuthorized(request: Request) {
  const authHeader = request.headers.get("Authorization");
  console.log("🔍 Received Authorization Header:", authHeader);
  console.log("🔑 Expected API Key:", `Bearer ${API_SECRET_KEY}`);

  if (!authHeader) {
    console.warn("🚨 Authorization header missing!");
    return false;
  }

  if (authHeader !== `Bearer ${API_SECRET_KEY}`) {
    console.warn("🚨 Invalid API Key received!");
    return false;
  }

  return true;
}

// 🔹 GET Wishlist
export async function GET(request: Request) {
  console.log("📥 Received GET request to fetch wishlist.");

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  console.log("✅ Sending wishlist:", wishlist);
  return NextResponse.json({ success: true, wishlist });
}

// 🔹 POST Wishlist (Add Item)
export async function POST(request: Request) {
  console.log("📥 Received POST request to add item to wishlist.");

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const item: WishlistItem = await request.json();
    console.log("📩 Received Request Body:", item);

    if (!item.productId || !item.name || !item.price || !item.imageUrl) {
      console.warn("🚨 Missing required fields in request!", item);
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }

    if (!wishlist.some((i) => i.productId === item.productId)) {
      wishlist.push(item);
    }

    console.log("✅ Wishlist after adding:", wishlist);
    return NextResponse.json({ success: true, wishlist });
  } catch (error) {
    console.error("❌ Error in POST request:", error);
    return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 });
  }
}

// 🔹 DELETE Wishlist (Remove Item)
export async function DELETE(request: Request) {
  console.log("📥 Received DELETE request to remove item from wishlist.");

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { productId } = await request.json();
    console.log("📩 Received DELETE Request Body:", { productId });

    if (!productId) {
      console.warn("🚨 Missing Product ID in request!");
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const newWishlist = wishlist.filter((item) => item.productId !== productId);
    if (newWishlist.length === wishlist.length) {
      console.warn("🚨 Product not found in wishlist:", productId);
      return NextResponse.json({ error: "Product not found in wishlist" }, { status: 404 });
    }

    wishlist = newWishlist;
    console.log("✅ Wishlist after deletion:", wishlist);
    return NextResponse.json({ success: true, wishlist });
  } catch (error) {
    console.error("❌ Error in DELETE request:", error);
    return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 });
  }
}





// import { NextResponse } from "next/server"

// interface WishlistItem {
//   productId: string
//   name: string
//   price: string
//   imageUrl: string
// }

// let wishlist: WishlistItem[] = [] // Ideally, use a database

// const API_SECRET_KEY = process.env.API_SECRET_KEY

// function isAuthorized(request: Request) {
//   const authHeader = request.headers.get("Authorization")
//   return authHeader === `Bearer ${API_SECRET_KEY}`
// }

// export async function GET(request: Request) {
//   if (!isAuthorized(request)) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }
//   return NextResponse.json(wishlist)
// }

// export async function POST(request: Request) {
//   if (!isAuthorized(request)) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   try {
//     const item: WishlistItem = await request.json()

//     if (!item.productId || !item.name || !item.price || !item.imageUrl) {
//       return NextResponse.json({ error: "Invalid request data" }, { status: 400 })
//     }

//     const exists = wishlist.some((i) => i.productId === item.productId)
//     if (!exists) {
//       wishlist.push(item)
//     }

//     return NextResponse.json(wishlist)
//   } catch {
//     return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 })
//   }
// }

// export async function DELETE(request: Request) {
//   if (!isAuthorized(request)) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   try {
//     const { productId } = await request.json()

//     if (!productId) {
//       return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
//     }

//     wishlist = wishlist.filter((item) => item.productId !== productId)
//     return NextResponse.json(wishlist)
//   } catch {
//     return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 })
//   }
// }
