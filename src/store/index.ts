import { configureStore } from "@reduxjs/toolkit";
import photoReducer from './photo/photoSlice';
import filterReducer from './filter/filterSlice';
import carsReducer from './cars/carsSlice';
import sortReducer from './sort/sortSlice'
import searchReducer from './search/searchSlice'
import priceReducer from "./price/priceSlice";
import cartReducer from './cart/cartSlice'

const store = configureStore({
    reducer: {
        photo: photoReducer,
        filter: filterReducer,
        cars: carsReducer,
        sort: sortReducer,
        search: searchReducer,
        price: priceReducer,
        cart: cartReducer,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;