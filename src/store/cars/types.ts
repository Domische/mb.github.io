export interface IFetchCarsProps {
    page?: number;
    colors?: string[];
    carbodies?: string[];
    sortName?: string;
    sortProperty?: string;
    searchName?: string;
    priceFrom?: string;
    priceTo?: string;
}

export interface ICars {
    name: string;
    imageURL: string;
    carbody: string,
    color: string,
    price: number,
    rating: number,
    year: number,
    id: number,
    power: number,
    count: number
}

export interface IPatchCars {
    id: number;
    math: string;
}

export interface IChangeCars {
    id: number;
    count: number|undefined;
}

export interface ICarsState {
    carsList: ICars[];
    loading: boolean;
    error: string | undefined;
}