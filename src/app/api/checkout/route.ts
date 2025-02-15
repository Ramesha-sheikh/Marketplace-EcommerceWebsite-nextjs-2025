import { NextResponse } from "next/server";
import { parse, serialize } from "cookie";

const CART_COOKIE_NAME = "cart";

// Cookie se cart data retrieve karne ka function
function getCartFromCookies(request: Request) {
  const cookies = request.headers.get("Cookie");
  if (cookies) {
    const parsedCookies = parse(cookies);
    const cart = parsedCookies[CART_COOKIE_NAME];
    return cart ? JSON.parse(cart) : [];
  }
  return [];
}

// Checkout API: Order place karne ke liye POST method
export async function POST(request: Request) {
  try {
    // Cart ko cookies se retrieve karo
    const cart = getCartFromCookies(request);
    
    // Agar cart khaali hai tou error response bhejo
    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Cart khaali hai" }, { status: 400 });
    }

    // Yahan order processing ka logic likho
    // For example: order ko database mein save karo, payment integration, etc.
    // Abhi ke liye hum bas cart ka data response mein bhej rahe hain.
    console.log("Order process ke liye cart data:", cart);

    // Order process hone ke baad, cart clear karne ke liye empty cart set karo
    const emptyCart = [];
    const cookieValue = serialize(CART_COOKIE_NAME, JSON.stringify(emptyCart), {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 din ka expiration
      path: "/",
    });

    const response = NextResponse.json({
      message: "Order successfully place ho gaya",
      order: cart,
    });

    // Naya cookie set karo jo cart ko clear kar dega
    response.headers.set("Set-Cookie", cookieValue);
    return response;
  } catch (error) {
    console.error("Checkout process mein error:", error);
    return NextResponse.json({ error: "Checkout process failed" }, { status: 500 });
  }
}




