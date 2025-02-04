import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PhotoState } from "./types";
import { fetchPhoto } from "./asyncActions";


const initialState: PhotoState = {
    photoList: [],
    loading: false,
    error: null
}

const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.photoList = action.payload;
            })
            .addCase(fetchPhoto.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                if (action.payload) {
                    state.error = action.payload;
                }
            })
    }
})

export default photoSlice.reducer;