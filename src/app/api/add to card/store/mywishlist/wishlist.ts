import { create } from "zustand";

export interface WishlistItem {
  id: string;
  title: string;
  image: string;
  discountedPrice: number
}

interface WishlistStore {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (item: WishlistItem) => void;
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  wishlist: [],

  addToWishlist: (item) =>
    set((state) => {
      const itemExists = state.wishlist.some((wishlistItem) => wishlistItem.id === item.id);
      if (!itemExists) {
        return { wishlist: [...state.wishlist, item] };
      }
      return state;
    }),

  removeFromWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.id !== id),
    })),

  toggleWishlist: (item) =>
    set((state) => {
      const itemExists = state.wishlist.some((wishlistItem) => wishlistItem.id === item.id);
      if (itemExists) {
        return { wishlist: state.wishlist.filter((wishlistItem) => wishlistItem.id !== item.id) };
      } else {
        return { wishlist: [...state.wishlist, item] };
      }
    }),
}));
