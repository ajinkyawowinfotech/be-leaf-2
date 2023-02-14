import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { useContext, useEffect } from "react"
import { Base_Url } from "../base_url/Base_Url"



const initialState = {
    allProduct : [],
    loading: false,
    error:null
}



export const fetchAllProduct = createAsyncThunk('fetchproduct', async () => {
    const response = await axios.post(`${Base_Url}/Get_Data`,
    {
        "START": "0",
        "END": "10000000",
        "WORD": "",
        "GET_DATA": "Get_SearchedProducts",
        "ID1": "126",
        "ID2": "",
        "ID3": "",
        "STATUS": "All",
        "START_DATE": "",
        "END_DATE": "",
        "EXTRA1": "",
        "EXTRA2": "",
        "EXTRA3": "",
        "LANG_ID": ""
      }
    )

    return response.data.DATA
})


const allProductSlice = createSlice({

    name:"allproduct",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchAllProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.allProduct = action.payload;
        });
        builder.addCase(fetchAllProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default allProductSlice.reducer