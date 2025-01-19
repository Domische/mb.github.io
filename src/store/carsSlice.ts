import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICars {
    name: string;
    imageURL: string;
    carbody: string,
    color: string,
    price: number,
    rating: number,
    year: number,
    id: number,
    power: number
}

interface IfetchCarsProps {
    page?: number;
    colors?: string[];
    carbodies?: string[];
    sortName?: string;
    sortProperty?: string;
    searchName?: string;
    priceFrom?: string;
    priceTo?: string;
}

interface ICarsState {
    carsList: ICars[];
    loading: boolean;
    error: string | null;
}

export const fetchCars = createAsyncThunk<ICars[], IfetchCarsProps, { rejectValue: string }>(
    'cars/fetchCars',
    async ({ page, colors, carbodies, sortName, sortProperty, searchName, priceFrom, priceTo }, { rejectWithValue }) => {
        const pageUrl = page ?`_page=${page + 1}` : '';
        const colorsUrl = colors ?`${colors.map((item) => `&color=${item}`).join('')}` : '';
        const carbodiesUrl = carbodies ?`${carbodies.map((item) => `&carbody=${item}`).join('')}` : '';
        const sortUrl = sortName ?`&_sort=${sortName}` : '';
        const orderUrl = sortProperty ?`&_order=${sortProperty}` : '';
        const searchUrl = searchName ?`&name_like=${searchName}` : '';
        const priceFromUrl = priceFrom ?`&price_gte=${priceFrom}` : '';
        const priceToUrl = priceTo ?`&price_lte=${priceTo}` : '';
        try {
            const response = await fetch(`http://localhost:3002/cars?${pageUrl}&_limit=6${colorsUrl}${carbodiesUrl}${sortUrl}${orderUrl}${searchUrl}${priceFromUrl}${priceToUrl}`);
            if (!response.ok) {
                return rejectWithValue('CarsError')
            }
            const data = await response.json();
            if(data.length===0){
                return rejectWithValue('Not Found')
            }
            return data as ICars[];
        } catch (error) {
            console.log(error);
            return rejectWithValue('CarsError')
        }

    }
)

const initialState: ICarsState = {
    carsList: [],
    loading: false,
    error: null
}

const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.loading = true;
                state.error = null;
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

export default carsSlice.reducer;