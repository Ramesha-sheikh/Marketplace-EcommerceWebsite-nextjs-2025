
import { NextResponse } from "next/server";
import { serialize, parse } from "cookie";

interface CartItem {
  productId: string;
  quantity: number;
  name: string;
  price: string;
  imageUrl: string;
  size?: string;
}

const COOKIE_NAME = "cart"; // Cookie name to store the cart items

// Function to get cart from cookies
function getCartFromCookies(request: Request): CartItem[] {
  const cookies = request.headers.get('Cookie');
  if (cookies) {
    const parsedCookies = parse(cookies);
    const cart = parsedCookies[COOKIE_NAME];
    return cart ? JSON.parse(cart) : [];
  }
  return [];
}

// Function to save cart to cookies
function saveCartToCookies(cart: CartItem[]): NextResponse {
  const cookieValue = serialize(COOKIE_NAME, JSON.stringify(cart), {
    httpOnly: true, // Secure cookie flag
    maxAge: 60 * 60 * 24, // 1 day expiration
    path: '/', // Path for the cookie
  });
  const response = NextResponse.json(cart);
  response.headers.set('Set-Cookie', cookieValue);
  return response;
}

// Handle GET request (fetching cart)
export async function GET(request: Request) {
  console.log("GET request received");

  const cart = getCartFromCookies(request); // Fetching cart from cookies
  console.log("Returning cart data:", cart);
  return NextResponse.json(cart);
}

// Handle POST request (adding item to cart)
export async function POST(request: Request) {
  console.log("POST request received");

  try {
    // Parse the request body to get the item
    const item: CartItem = await request.json();
    console.log("Received item:", item);

    const cart = getCartFromCookies(request); // Fetch current cart from cookies

    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.productId === item.productId
    );
    
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += item.quantity; // Update existing item
    } else {
      cart.push(item); // Add new item to cart
    }

    return saveCartToCookies(cart); // Save the updated cart to cookies
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json({ error: "Failed to process the request" }, { status: 500 });
  }
}

// Handle DELETE request (removing item from cart)
export async function DELETE(request: Request) {
  console.log("DELETE request received");

  try {
    // Parse the request body to get the productId to be deleted
    const { productId }: { productId: string } = await request.json();
    console.log("Deleting productId:", productId);

    const cart = getCartFromCookies(request); // Fetching current cart from cookies

    // Create a new cart array without the deleted item
    const updatedCart = cart.filter((item) => item.productId !== productId);

    return saveCartToCookies(updatedCart); // Save the updated cart to cookies
  } catch (error) {
    console.error("Error processing DELETE request:", error);
    return NextResponse.json({ error: "Failed to process the request" }, { status: 500 });
  }
}


// import { NextResponse } from "next/server";
// import { serialize, parse } from "cookie";

// interface CartItem {
//   productId: string;
//   quantity: number;
//   name: string;
//   price: string;
//   imageUrl: string;
//   size?: string;
// }

// const COOKIE_NAME = "cart"; // Cookie name to store the cart items

// // Function to get cart from cookies
// function getCartFromCookies(request: Request): CartItem[] {
//   const cookies = request.headers.get('Cookie');
//   if (cookies) {
//     const parsedCookies = parse(cookies);
//     const cart = parsedCookies[COOKIE_NAME];
//     return cart ? JSON.parse(cart) : [];
//   }
//   return [];
// }

// // Function to save cart to cookies
// function saveCartToCookies(cart: CartItem[]): NextResponse {
//   const cookieValue = serialize(COOKIE_NAME, JSON.stringify(cart), {
//     httpOnly: true, // Secure cookie flag
//     maxAge: 60 * 60 * 24, // 1 day expiration
//     path: '/', // Path for the cookie
//   });
//   const response = NextResponse.json(cart);
//   response.headers.set('Set-Cookie', cookieValue);
//   return response;
// }

// // Handle GET request (fetching cart)
// export async function GET(request: Request) {
//   console.log("GET request received");

//   const cart = getCartFromCookies(request); // Fetching cart from cookies
//   console.log("Returning cart data:", cart);
//   return NextResponse.json(cart);
// }

// // Handle POST request (adding item to cart)
// export async function POST(request: Request) {
//   console.log("POST request received");

//   try {
//     // Parse the request body to get the item
//     const item: CartItem = await request.json();
//     console.log("Received item:", item);

//     let cart = getCartFromCookies(request); // Fetch current cart from cookies

//     // Check if the item already exists in the cart
//     const existingItemIndex = cart.findIndex((cartItem) => cartItem.productId === item.productId);
    
//     if (existingItemIndex !== -1) {
//       cart[existingItemIndex].quantity += item.quantity; // Update existing item
//     } else {
//       cart.push(item); // Add new item to cart
//     }

//     return saveCartToCookies(cart); // Save the updated cart to cookies
//   } catch (error) {
//     console.error("Error processing POST request:", error);
//     return NextResponse.json({ error: "Failed to process the request" }, { status: 500 });
//   }
// }

// // Handle DELETE request (removing item from cart)
// export async function DELETE(request: Request) {
//   console.log("DELETE request received");

//   try {
//     // Parse the request body to get the productId to be deleted
//     const { productId }: { productId: string } = await request.json();
//     console.log("Deleting productId:", productId);

//     const cart = getCartFromCookies(request); // Fetching current cart from cookies

//     // Create a new cart array without the deleted item
//     const updatedCart = cart.filter((item) => item.productId !== productId);

//     return saveCartToCookies(updatedCart); // Save the updated cart to cookies
//   } catch (error) {
//     console.error("Error processing DELETE request:", error);
//     return NextResponse.json({ error: "Failed to process the request" }, { status: 500 });
//   }
// }

// // import { NextResponse } from "next/server";
// // import { serialize, parse } from 'cookie';

// // interface CartItem {
// //   productId: string;
// //   quantity: number;
// //   name: string;
// //   price: string;
// //   imageUrl: string;
// //   size?: string;
// // }

// // const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY;

// // const COOKIE_NAME = "cart"; // Cookie name to store the cart items

// // // Function to get cart from cookies
// // function getCartFromCookies(request: Request): CartItem[] {
// //   const cookies = request.headers.get('Cookie');
// //   if (cookies) {
// //     const parsedCookies = parse(cookies);
// //     const cart = parsedCookies[COOKIE_NAME];
// //     return cart ? JSON.parse(cart) : [];
// //   }
// //   return [];
// // }

// // // Function to save cart to cookies
// // function saveCartToCookies(cart: CartItem[]): NextResponse {
// //   const cookieValue = serialize(COOKIE_NAME, JSON.stringify(cart), {
// //     httpOnly: true, // Secure cookie flag
// //     maxAge: 60 * 60 * 24, // 1 day expiration
// //     path: '/', // Path for the cookie
// //   });
// //   const response = NextResponse.json(cart);
// //   response.headers.set('Set-Cookie', cookieValue);
// //   return response;
// // }

// // // Handle GET request (fetching cart)
// // export async function GET(request: Request) {
// //   console.log("GET request received");

// //   const cart = getCartFromCookies(request); // Fetching cart from cookies
// //   console.log("Returning cart data:", cart);
// //   return NextResponse.json(cart);
// // }

// // // Handle POST request (adding item to cart)
// // export async function POST(request: Request) {
// //   console.log("POST request received");

// //   try {
// //     // Parse the request body to get the item
// //     const item: CartItem = await request.json();
// //     console.log("Received item:", item);

// //     let cart = getCartFromCookies(request); // Fetch current cart from cookies

// //     // Check if the item already exists in the cart
// //     const existingItemIndex = cart.findIndex((cartItem) => cartItem.productId === item.productId);
    
// //     if (existingItemIndex !== -1) {
// //       cart[existingItemIndex].quantity += item.quantity; // Update existing item
// //     } else {
// //       cart.push(item); // Add new item to cart
// //     }

// //     return saveCartToCookies(cart); // Save the updated cart to cookies
// //   } catch (error) {
// //     console.error("Error processing POST request:", error);
// //     return NextResponse.json({ error: "Failed to process the request" }, { status: 500 });
// //   }
// // }

// // // Handle DELETE request (removing item from cart)
// // export async function DELETE(request: Request) {
// //   console.log("DELETE request received");

// //   try {
// //     // Parse the request body to get the productId to be deleted
// //     const { productId }: { productId: string } = await request.json();
// //     console.log("Deleting productId:", productId);

// //     let cart = getCartFromCookies(request); // Fetching current cart from cookies

// //     // Remove the item from the cart
// //     cart = cart.filter((item) => item.productId !== productId);

// //     return saveCartToCookies(cart); // Save the updated cart to cookies
// //   } catch (error) {
// //     console.error("Error processing DELETE request:", error);
// //     return NextResponse.json({ error: "Failed to process the request" }, { status: 500 });
// //   }
// // }












