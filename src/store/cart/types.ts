import { ICars } from "../cars/types";

export interface ICartState {
    cartList: ICars[];
    loading: boolean;
    error: string | undefined;
}

export interface IPatchCartItems {
    id: number;
    count: number|undefined;
}