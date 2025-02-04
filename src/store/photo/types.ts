export type Photo = {
    id: number;
    url: string;
}

export type PhotoState = {
    photoList: Photo[];
    loading: boolean;
    error: string | null;
};