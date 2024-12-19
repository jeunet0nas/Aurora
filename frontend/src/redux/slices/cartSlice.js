import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  validCoupon: {
    name: "",
    discount: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      let bookItem = state.cartItems.find(
        (book) => book.book_id === item.book_id
      );
      if (bookItem) {
        toast.info("Sản phẩm đã có trong giỏ hàng");
      } else {
        state.cartItems = [item, ...state.cartItems];
        toast.success("Sản phẩm đã được thêm vào giỏ hàng");
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.validCoupon = {
        name: "",
        discount: 0,
      };
      toast.success("Giỏ hàng đã được xóa sạch");
    },
    incrementQ(state, action) {
      const item = action.payload;
      let bookItem = state.cartItems.find(
        (book) => book.book_id === item.book_id
      );
      if (bookItem.qty === bookItem.maxQty) {
        toast.info(`Chỉ có tối đa ${bookItem.maxQty} sản phẩm`);
      } else {
        bookItem.qty += 1;
      }
    },
    decrementQ(state, action) {
      const item = action.payload;
      let bookItem = state.cartItems.find(
        (book) => book.book_id === item.book_id
      );
      bookItem.qty -= 1;
      if (bookItem.qty === 0) {
        state.cartItems = state.cartItems.filter(
          (book) => book.book_id !== item.book_id
        );
      }
    },
    removeFromCart(state, action) {
      const item = action.payload;
      state.cartItems = state.cartItems.filter(
        (book) => book.book_id !== item.book_id
      );
      toast.warning("Sản phẩm đã được xóa khỏi giỏ hàng");
    },
    setValidCoupon(state, action) {
      state.validCoupon = action.payload;
    },
    addCouponIdToCartItem(state, action) {
      const coupon_id = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        return { ...item, coupon_id };
      });
    },
    clearCartItems(state, action) {
      state.cartItems = [];
    },
  },
});

const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  clearCart,
  incrementQ,
  decrementQ,
  removeFromCart,
  setValidCoupon,
  addCouponIdToCartItem,
  clearCartItems,
} = cartSlice.actions;

export default cartReducer;
