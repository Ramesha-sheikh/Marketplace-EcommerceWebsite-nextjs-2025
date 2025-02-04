import { create } from 'zustand';

interface CartStore {
  cartCount: number;
  wishlistCount: number;
  setCartCount: (count: number) => void;
  setWishlistCount: (count: number) => void;
}

const useCartStore = create<CartStore>((set) => ({
  cartCount: 0,
  wishlistCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  setWishlistCount: (count) => set({ wishlistCount: count }),
}));

export default useCartStore;
