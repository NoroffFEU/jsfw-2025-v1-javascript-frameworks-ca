export interface CartItem {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  image?: string;
}

export interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: () => number;
  updateQuantity: (id: string, quantity: number) => void;
}
