import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    price: {
        from: '',
        to: ''
    }
}

const priceSlice = createSlice({
    name: 'price',
    initialState,
    reducers: {
        setPriceFrom: (state, action: PayloadAction<string>) => {
            state.price.from=action.payload;
        },
        setPriceTo: (state, action: PayloadAction<string>)=> {
            state.price.to=action.payload;
        },
        clearPrice: (state)=> {
            state.price.from='';
            state.price.to='';
        }
    }
})

export const {setPriceFrom, setPriceTo, clearPrice} = priceSlice.actions;

export default priceSlice.reducer;