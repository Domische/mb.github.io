import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Photo = {
    id: number;
    url: string;
}

type PhotoState = {
    photoList: Photo[];
    loading: boolean;
    error: string | null;
};

const initialState: PhotoState = {
    photoList: [],
    loading: false,
    error: null
}

export const fetchPhoto = createAsyncThunk<Photo[], undefined, { rejectValue: string }>(
    'photo/fetchPhoto',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3001/photo');

            if (!response.ok) {
                return rejectWithValue('SliderError');
            }

            const data = await response.json();

            return data as Photo[];
        } catch (error) {
            return rejectWithValue('SliderError')
        }
    }
)

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