import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartState } from "../interfaces/cart";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item: CartItem) => {
        const existingItem = get().cart.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ cart: [...get().cart, item] });
        }
      },

      removeFromCart: (id: string) =>
        set({ cart: get().cart.filter((i) => i.id !== id) }),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
