import { ICars, ICarsState, IChangeCars, IFetchCarsProps, IPatchCars } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCountMinus, setCountPlus } from "./carsSlice";
import { changeCartItems, deleteCartItems, postCartItems } from "../cart/asyncActions";

export const fetchCars = createAsyncThunk<ICars[], IFetchCarsProps, { rejectValue: string }>(
    'cars/fetchCars',
    async ({ page, colors, carbodies, sortName, sortProperty, searchName, priceFrom, priceTo }, { rejectWithValue }) => {

        const pageUrl = page && `_page=${page + 1}`;
        const colorsUrl = colors && `${colors.map((item) => `&color=${item}`).join('')}`;
        const carbodiesUrl = carbodies && `${carbodies.map((item) => `&carbody=${item}`).join('')}`;
        const sortUrl = sortName && `&_sort=${sortName}`;
        const orderUrl = sortProperty && `&_order=${sortProperty}`;
        const searchUrl = searchName && `&name_like=${searchName}`;
        const priceFromUrl = priceFrom && `&price_gte=${priceFrom}`;
        const priceToUrl = priceTo && `&price_lte=${priceTo}`;

        try {
            const response = await fetch(`http://localhost:3002/cars?${pageUrl}&_limit=6${colorsUrl}${carbodiesUrl}${sortUrl}${orderUrl}${searchUrl}${priceFromUrl}${priceToUrl}`);
            if (!response.ok) {
                return rejectWithValue('CarsError')
            }
            const data = await response.json();
            if (data.length === 0) {
                return rejectWithValue('Not Found')
            }
            return data as ICars[];
        } catch (error) {
            console.log(error);
            return rejectWithValue('CarsError')
        }
    }
)

export const patchCars = createAsyncThunk<ICars, IPatchCars, { rejectValue: string, state: { cars: ICarsState } }>(
    'cars/patchCars',
    async ({ id, math }, { rejectWithValue, getState, dispatch }) => {
        if (math === '' || math === '+') {
            dispatch(setCountPlus(id))
        } else if (math === '-') {
            dispatch(setCountMinus(id))
        }

        const find = getState().cars.carsList.find(item => item.id === id);
        if (find) {
            try {
                const response = await fetch(`http://localhost:3002/cars/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        count: find.count
                    })
    
                });
    
                if (!response.ok) {
                    return rejectWithValue('ServerError')
                }
    
                const data = await response.json();
    
                if (data.count === 0) {
                    dispatch(deleteCartItems(id))
                }
    
                if (math === '') {
                    dispatch(postCartItems(data))
                } else {
                    dispatch(changeCartItems({ id, count: data.count }))
                }
    
                return data as ICars;
            } catch (error) {
                return rejectWithValue('ServerError')
            }
        } else {
            return rejectWithValue('ServerError')
        }


    }
)

export const changeCars = createAsyncThunk<ICars, IChangeCars, {rejectValue: string}>(
    'cars/changeCars',
    async({id, count}, {rejectWithValue})=> {
        try {
            const response = await fetch(`http://localhost:3002/cars/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    count: count
                })
            })
            if(!response.ok){
                return rejectWithValue('ServerError')
            }
            return (await response.json()) as ICars;
        } catch (error) {
            return rejectWithValue('ServerError')
        }
        
    }
)