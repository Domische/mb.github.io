import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartState } from "./types";
import { changeCartItems, deleteCartItems, getCartItems, postCartItems } from "./asyncActions";

const initialState: ICartState = {
    cartList: [],
    loading: false,
    error: undefined
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        deleteCartUI: (state, action)=> {
            const find = state.cartList.findIndex(item=>item.id===action.payload);
            if(find){
                state.cartList.splice(find, 1);
            }
        },
        clearCartUI: (state)=> {
            state.cartList=[];
        },
        setCountPlus: (state, action)=> {
            const find = state.cartList.find(item=>item.id===action.payload);
            if(find&&find.count<10){
                find.count+=1;
            }
        },
        setCountMinus: (state, action)=> {
            const find = state.cartList.find(item=>item.id===action.payload);
            if(find){
                find.count-=1
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.cartList = action.payload;
            })
            .addCase(getCartItems.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                if (state.error) {
                    state.error = action.payload;
                }
            })
            .addCase(postCartItems.pending, (state) => {
                // state.loading = true;
                state.error = undefined;
            })
            .addCase(postCartItems.fulfilled, (state, action) => {
                state.cartList.push(action.payload)
                // state.loading = false;
            })
            .addCase(postCartItems.rejected, (state, action: PayloadAction<string | undefined>) => {
                // state.loading = false;
                if (state.error) {
                    state.error = action.payload;
                }
            })
            .addCase(deleteCartItems.fulfilled, (state, action)=> {
                state.cartList=state.cartList.filter(item=>item.id!==action.payload)
            })
            .addCase(changeCartItems.pending, (state)=> {
                state.error=undefined;
                // state.loading=true;
            })
            .addCase(changeCartItems.fulfilled, (state, action)=> {
                // state.loading=false;
                const find = state.cartList.find(item=>item.id===action.payload.id);
                if(find){
                    find.count=action.payload.count;
                }
            })
            .addCase(changeCartItems.rejected, (state, action)=> {
                // state.loading=false;
                if (state.error) {
                    state.error = action.payload;
                }
            })
    },
})

export const { deleteCartUI, clearCartUI, setCountMinus, setCountPlus } = cartSlice.actions;

export default cartSlice.reducer;