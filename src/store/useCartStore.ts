import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartState } from "../interfaces/cart";

/**
 * Zustand store for managing shopping cart state.
 *
 * Provides actions for:
 * - Adding/removing items
 * - Updating item quantity
 * - Clearing cart
 * - Calculating cart item count
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      /**
       * Add an item to the cart or increase quantity if it exists
       */
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

      /**
       * Remove an item from the cart by its ID
       */
      removeFromCart: (id: string) =>
        set({ cart: get().cart.filter((i) => i.id !== id) }),

      /**
       * Clear all items from the cart
       */
      clearCart: () => set({ cart: [] }),

      /**
       * Calculate the total number of items in the cart
       */
      cartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),

      /**
       * Update the quantity of a specific item
       */
      updateQuantity: (id: string, quantity: number) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
