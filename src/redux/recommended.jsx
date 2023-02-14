import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Base_Url } from "../base_url/Base_Url"


const initialState = {
    recommendedProducts: [],
    error: null,
    loading: false
}

export const fetchRecommendedProducts = createAsyncThunk('fetchrecommendedproduct', async () => {
    const response = await axios.post(`${Base_Url}/Get_Data`,
        {
            "START": "0",
            "END": "10000",
            "WORD": "",
            "GET_DATA": "Get_RandomProducts",
            "ID1": "1",
            "ID2": "",
            "ID3": "",
            "STATUS": "",
            "START_DATE": "",
            "END_DATE": "",
            "EXTRA1": "",
            "EXTRA2": "",
            "EXTRA3": "",
            "LANG_ID": ""
        })

    return response.data.DATA
})

const recommendedProductsSlice = createSlice({
    name: "recommended",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRecommendedProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchRecommendedProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.recommendedProducts = action.payload;
        });
        builder.addCase(fetchRecommendedProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default recommendedProductsSlice.reducer