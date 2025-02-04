import { ICars, IPatchCars } from "../cars/types";
import { changeCars } from "../cars/asyncActions";
import { ICartState, IPatchCartItems } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearCartUI, deleteCartUI, setCountMinus, setCountPlus } from "./cartSlice";


export const getCartItems = createAsyncThunk<ICars[], undefined, { rejectValue: string }>(
    'cart/getCartItems',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch('http://localhost:3003/cart');
            if (!response.ok) {
                return rejectWithValue('CartError');
            }
            const data = await response.json();
            if (data.length === 0) {
                return rejectWithValue('Not Found')
            }
            return data as ICars[];
        } catch (error) {
            console.log(error);
            return rejectWithValue('Not Found');
        }
    }
)

export const postCartItems = createAsyncThunk<ICars, ICars, { rejectValue: string }>(
    'cart/postCartItems',
    async (car, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3003/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(car)
            });
            if (!response.ok) {
                return rejectWithValue('ServerError');
            }
            const data = await response.json();
            console.log(data);
            
            return data as ICars;
        } catch (error) {
            console.log(error);
            return rejectWithValue('ServerError')
        }
    }
)

export const patchCartItems = createAsyncThunk<ICars, IPatchCars, {rejectValue: string, state: {cart: ICartState}}>(
    'cart/patchCartItems',
    async({id, math}, {rejectWithValue, dispatch, getState})=> {
        if (math === '' || math === '+') {
            dispatch(setCountPlus(id))
        } else if (math === '-') {
            dispatch(setCountMinus(id))
        }

        const find = getState().cart.cartList.find(item => item.id === id);
        
        if (find) {
            try {
                const response = await fetch(`http://localhost:3003/cart/${id}`, {
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
    
                console.log(data);
    
                if (data.count === 0) {
                    dispatch(deleteCartItems(id))
                }
                
                dispatch(changeCars({ id, count: data.count }))
                
                return data as ICars;

            } catch (error) {
                console.log(error);
                return rejectWithValue('ServerError')
            }
        } else {
            return rejectWithValue('ServerError')
        }
    }
)

export const changeCartItems = createAsyncThunk<ICars, IPatchCartItems, {rejectValue: string}>(
    'cart/patchCartItems',
    async function ({id, count}, {rejectWithValue}) {
        if(count&&count<=10){
            try {
                const response = await fetch(`http://localhost:3003/cart/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
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
        } else {
            return rejectWithValue('ServerError')
        }
            
    }
)

export const deleteCars = createAsyncThunk<number, number, {rejectValue: string}>(
    'cart/deleteCars',
    async (id, {rejectWithValue})=> {
        try {
            const response = await fetch(`http://localhost:3002/cars/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    count: 0
                })
            })
            if(!response.ok){
                return rejectWithValue('ServerError')
            }
            return id
        } catch (error) {
            return rejectWithValue('ServerError')
        }
        
    }
)

export const deleteCartItems = createAsyncThunk<number, number, {rejectValue: string}>(
    'cart/deleteCartItems',
    async (id, {rejectWithValue, dispatch})=> {
        dispatch(deleteCartUI(id))
        dispatch(deleteCars(id))
        try {
            const response = await fetch(`http://localhost:3003/cart/${id}`, {
                method: 'DELETE'
            });
            if(!response.ok){
                return rejectWithValue('ServerError')
            }
            return id
        } catch (error) {
            return rejectWithValue('ServerError')
        }
        
    }
)


export const clearCartItems = createAsyncThunk<string, undefined, {rejectValue: string, state: {cart: ICartState}}>(
    'cart/clearCartItems',
    async (_, {rejectWithValue, getState})=> {
        Promise.all(getState().cart.cartList.map(item=>fetch(`http://localhost:3003/cart/${item.id}`, {
            method: 'DELETE'
        })))
        .then(responses=> console.log(responses))
        .catch(error => console.log(error))
        return rejectWithValue('ServerError');
    }
)

export const clearCars = createAsyncThunk<string, undefined, { rejectValue: string, state: { cart: ICartState } }>(
    'cart/clearCars',
    async (_, { rejectWithValue, getState, dispatch }) => {
        Promise.all(getState().cart.cartList.map(item => fetch(`http://localhost:3002/cars/${item.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                count: 0
            })

        })))
        .then(responses=>{
            console.log(responses)
            dispatch(clearCartItems())
            dispatch(clearCartUI())
        })
        .catch(error=>console.log(error))
        return rejectWithValue('ServerError');
    }
)