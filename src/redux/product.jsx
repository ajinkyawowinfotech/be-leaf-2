import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { Base_Url } from "../base_url/Base_Url";

const initialState = {
    products: [],
    error:null,
    loading:false
}

export const fetchProduct = createAsyncThunk('fetchproduct', async () => {
    const response = await axios.post(`${Base_Url}/Get_Data`,
    {
        "START": "0",
        "END": "10000",
        "WORD": "",
        "GET_DATA": "Get_CategoryList",
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


const productSlice = createSlice({
    name:"product",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchProduct.pending, (state) => {
            state.loading = true;
            state.error = null
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer