// import { NextResponse } from "next/server";

// let wishlist: string[] = []; // In-memory storage for wishlist (for demo purposes)

// // GET Wishlist
// export async function GET() {
//   return NextResponse.json({ wishlist });
// }

// // POST - Add item to Wishlist
// export async function POST(request: Request) {
//   const body = await request.json();
//   const { item } = body;

//   // Agar item already wishlist me nahi hai to add karo
//   if (item && !wishlist.includes(item)) {
//     wishlist.push(item);
//   }

//   return NextResponse.json({ wishlist });
// }

// // DELETE - Remove item from Wishlist
// export async function DELETE(request: Request) {
//   const body = await request.json();
//   const { item } = body;

//   // Remove item from wishlist
//   wishlist = wishlist.filter((wishlistItem) => wishlistItem !== item);

//   return NextResponse.json({ wishlist });
// }
