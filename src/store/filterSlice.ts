import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilterItemProps } from "../components/Filter/FilterBlock/FilterList/FilterItem/FilterItem";

type FilterState = {
    [key: string]: string[];
    colors: string[];
    carbodies: string[];
}

const initialState: FilterState = {
    colors: [],
    carbodies: [],
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<IFilterItemProps>) => {
            function set(item: string) {
                const find = state[item].findIndex(item => item === action.payload.value)
                if (find !== -1) {
                    state[item].splice(find, 1);
                } else {
                    state[item].push(action.payload.value);
                }
            }
            if (action.payload.title === 'Цвет') {
                set('colors')
            } else if (action.payload.title === 'Кузов') {
                set('carbodies')
            }

        },
        clearFilter: (state) => {
            state.colors = [];
            state.carbodies = [];
        }
    }
})

export const { setFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;

