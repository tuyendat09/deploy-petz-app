import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/Cart";

interface CartState {
  items: CartItem[];
  openCart: boolean;
}

const initialState: CartState = {
  items: [],
  openCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggle(state) {
      state.openCart = !state.openCart;
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) =>
          i.productId === item.productId &&
          i.productOption === item.productOption,
      );

      if (existingItem) {
        existingItem.productQuantity += 1;
      } else {
        state.items.push({ ...item, productQuantity: 1 });
      }
    },
    removeFromCart(
      state,
      action: PayloadAction<{ productId: string; productOption: string }>,
    ) {
      const { productId, productOption } = action.payload;
      state.items = state.items.filter(
        (item) =>
          item.productId !== productId || item.productOption !== productOption,
      );
    },

    decreaseQuantity(
      state,
      action: PayloadAction<{ productId: string; productOption: string }>,
    ) {
      const { productId, productOption } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.productId === productId && item.productOption === productOption,
      );
      if (existingItem && existingItem.productQuantity > 1) {
        existingItem.productQuantity -= 1;
      }
    },

    increaseQuantity(
      state,
      action: PayloadAction<{ productId: string; productOption: string }>,
    ) {
      const { productId, productOption } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.productId === productId && item.productOption === productOption,
      );
      if (existingItem) {
        existingItem.productQuantity += 1;
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const cartAction = cartSlice.actions;

// Selectors to access cart data
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartOpen = (state: { cart: CartState }) =>
  state.cart.openCart;

export default cartSlice;
