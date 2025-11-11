import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState } from "../interfaces/cart";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
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

      removeFromCart: (id) => {},

      clearCart: () => {},

      get totalPrice() {},
    }),
    {
      name: "cart-storage",
    }
  )
);
