import { createAsyncThunk } from "@reduxjs/toolkit";
import { Photo } from "./types";

export const fetchPhoto = createAsyncThunk<Photo[], undefined, { rejectValue: string }>(
    'photo/fetchPhoto',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:3001/photo');

            if (!response.ok) {
                return rejectWithValue('SliderError');
            }

            const data = await response.json();

            return data as Photo[];
        } catch (error) {
            return rejectWithValue('SliderError')
        }
    }
)