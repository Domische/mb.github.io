import { configureStore } from "@reduxjs/toolkit";
import photoReducer from './photoSlice';
import filterReducer from './filterSlice';
import carsReducer from './carsSlice';
import sortReducer from './/sortSlice'
import searchReducer from './searchSlice'
import priceReducer from "./priceSlice";

const store = configureStore({
    reducer: {
        photo: photoReducer,
        filter: filterReducer,
        cars: carsReducer,
        sort: sortReducer,
        search: searchReducer,
        price: priceReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;