import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productsAPI } from "./features/services/product";
import { authAPI } from "./features/services/auth";
import { categoriesAPI } from "./features/services/categories";
import { subCategoriesAPI } from "./features/services/subcategories";
import { vouchersAPI } from "./features/services/voucher";
import { cartAPI } from "./features/services/cart";
import { servicesAPI } from "./features/services/services";
import { bookingsAPI } from "./features/services/booking";
import { orderAPI } from "./features/services/order";
import { orderStatsAPI } from "./features/services/orderStatsAPI";
import { userAPI } from "./features/services/user";
import cartSlice from "./features/cart/cart";
import userSlice from "./features/user/user";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { paymentAPI } from "./features/services/payment";
import { shopAPI } from "./features/services/shop";

const encryptor = encryptTransform({
  secretKey: "your-secret-key", 
  onError: (error) => {
    console.error("Encryption error:", error);
  },
});

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  user: userSlice.reducer,
  [productsAPI.reducerPath]: productsAPI.reducer,
  [categoriesAPI.reducerPath]: categoriesAPI.reducer,
  [subCategoriesAPI.reducerPath]: subCategoriesAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [vouchersAPI.reducerPath]: vouchersAPI.reducer,
  [cartAPI.reducerPath]: cartAPI.reducer,
  [servicesAPI.reducerPath]: servicesAPI.reducer,
  [bookingsAPI.reducerPath]: bookingsAPI.reducer,
  [orderAPI.reducerPath]: orderAPI.reducer,
  [orderStatsAPI.reducerPath]: orderStatsAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [paymentAPI.reducerPath]: paymentAPI.reducer,
  [shopAPI.reducerPath]: shopAPI.reducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "user"], 
  transforms: [encryptor], 
};

// Enhance rootReducer with persist capabilities and encryption
const persistedReducer = persistReducer(persistConfig, rootReducer as any);

// Initialize the store with the persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      productsAPI.middleware,
      categoriesAPI.middleware,
      subCategoriesAPI.middleware,
      authAPI.middleware,
      vouchersAPI.middleware,
      cartAPI.middleware,
      servicesAPI.middleware,
      bookingsAPI.middleware,
      orderAPI.middleware,
      orderStatsAPI.middleware,
      userAPI.middleware,
      paymentAPI.middleware,
      shopAPI.middleware
    ),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
