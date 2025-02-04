import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICarsState } from "./types";
import { fetchCars } from "./asyncActions";

//сделать patch для count в корзине и здесь, чтобы count синхронизировались

const initialState: ICarsState = {
    carsList: [],
    loading: false,
    error: undefined
}

const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        setCountMinus: (state, action) => {
            const find = state.carsList.find(item => item.id === action.payload);
            if (find) {
                find.count -= 1;
            }
        },
        setCountPlus: (state, action) => {
            const find = state.carsList.find(item => item.id === action.payload);
            if (find) {
                find.count += 1;
            }
        },
        setCount: (state, action) => {
            const find = state.carsList.find(item => item.id === action.payload);
            if (find) {
                find.count = 10
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.carsList = action.payload;
                state.loading = false;
            })
            .addCase(fetchCars.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                if (action.payload) {
                    state.error = action.payload;
                }
            })
    }
})

export const { setCountMinus, setCountPlus, setCount } = carsSlice.actions;

export default carsSlice.reducer;