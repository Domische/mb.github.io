import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISearchState {
    searchName: string;
}

const initialState: ISearchState = {
    searchName: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>)=> {
            state.searchName=action.payload;
        }
    }
})

export const {setSearch} = searchSlice.actions;

export default searchSlice.reducer;