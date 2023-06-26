import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    //bu veriler localStorage te varsa ordan al yoksa boş bir array aç dicez. Kullanıcının carta eklediği ürünler sayfa yenileyince sıfırlanmaması için.
    cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).cartItems : [],
    total: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).total : 0,
    tax: 8,
  },
  reducers: {
    //fonksiyonlarım
    //bu fonskiyon sağdaki cartıtem kısmına ürünlere tıklanıldığında o bölüme ürünü ekleyecek fiyatı ve adeti ile birlikte. eğer card daha önce varsa adeti yükselecek eğer yoksa yeni bir ürün ekleyecek sepete.
    //yukarıdaki cartItems içindeki elemanların id si ile benim tıkladığımda gönderdiğim itemin ıdsi birse adet arttır yoksa yeni eleman gibi ekle.
    addProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (findCartItem) {
        findCartItem.quantity = findCartItem.quantity + 1;
      } else {
        state.cartItems.push(action.payload);
      }

      state.total += action.payload.price;
    },
    deleteCart: (state, action) => {
      //tıkladığım ürünü bul ve sil.
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
    increase: (state, action) => {
      //tıkladığım ürünü bul
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      cartItem.quantity += 1;
      state.total += cartItem.price;
    },
    decrease: (state, action) => {
      //tıkladığım ürünü bul
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      cartItem.quantity -= 1;
      if (cartItem.quantity === 0) {
        //tıkladığım ürünü bul ve sil.
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
      state.total -= cartItem.price;
    },
    reset: (state,action) => {
        state.cartItems = [];
        state.total = 0;
    }
  },
});

export const { addProduct, deleteCart, increase, decrease, reset } = cartSlice.actions;
export default cartSlice.reducer;
