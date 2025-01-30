"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ImBin2 } from "react-icons/im";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";
import { useCart } from "@/app/api/add to card/useCart";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return (
    <>
      <div className="relative">
        <Image
          src={"/Spic1.png"}
          alt="Cart Background"
          width={1440}
          height={316}
          className="w-full min-h-[200px] lg:min-h-[350px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Image src={"/Spic2.png"} alt="Cart Icon" width={77} height={77} className="w-[50px] sm:w-[77px]" />
          <p className="text-[24px] sm:text-[36px] md:text-[48px] font-bold">Cart</p>
          <div className="text-gray-600 flex items-center text-sm sm:text-base">
            <p>Home</p>
            <FaChevronRight className="mx-1" />
            <p>Cart</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] px-4 py-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[60%] bg-white rounded-lg p-4">
            <div className="bg-[#FFF9E5] p-4 rounded-md">
              <ul className="grid grid-cols-4 text-center font-semibold text-sm sm:text-base">
                <li>Product</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
              </ul>
            </div>
            {cart.length === 0 ? (
              <p className="text-center py-4">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex flex-row sm:flex-row items-center gap-4 p-4 border-b">
                  <div className="w-[90px] h-[90px] bg-[#FBEBB5] rounded-md flex flex-row justify-center">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} width={90} height={90} className="object-cover rounded-md" />
                  </div>
                  <div className="flex flex-row sm:flex-row justify-between w-full">
                    <p className="text-sm sm:text-base">{item.title}</p>
                    <p className="text-sm sm:text-base">Rs. {item.price.toLocaleString()}</p>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      min="1"
                      className="w-12 p-1 border rounded text-center"
                    />
                    <p className="text-sm sm:text-base">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    <ImBin2 className="text-red-500 cursor-pointer text-lg" onClick={() => removeFromCart(item.id)} />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="w-full lg:w-[35%] bg-[#FFF9E5] rounded-lg p-4">
            <h2 className="text-center text-lg sm:text-xl font-bold">Cart Totals</h2>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-700">Rs. {getCartTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span className="text-gray-700 font-semibold">Rs. {getCartTotal().toLocaleString()}</span>
              </div>
              <Link href="/CheckOut" className="bg-black text-white py-3 rounded-md text-center font-medium hover:bg-gray-800">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;