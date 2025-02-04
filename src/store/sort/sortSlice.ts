import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISortState } from "./types";

const initialState: ISortState = {
    sortName: 'price',
    sortProperty: 'asc',
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<ISortState>) => {
            state.sortName=action.payload.sortName;
            state.sortProperty=action.payload.sortProperty;
        }
    }
})

export const {setSort} = sortSlice.actions;

export default sortSlice.reducer;