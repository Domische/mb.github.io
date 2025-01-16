import { createSlice } from "@reduxjs/toolkit";

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
        setSearch: (state, action)=> {
            state.searchName=action.payload;
        }
    }
})

export const {setSearch} = searchSlice.actions;

export default searchSlice.reducer;