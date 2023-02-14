import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Base_Url } from "../base_url/Base_Url"



const initialState = {
    newLaunchProduct: [],
    error: null,
    loading: false
}

export const fetchNewLaunchProduct = createAsyncThunk('fetchnewproduct', async () => {
    const response = await axios.post(`${Base_Url}/Get_Data`,
        {
            "START": "0",
            "END": "10000",
            "WORD": "",
            "GET_DATA": "Get_NewlyLaunchedProducts",
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

const newLaunchProductSlice = createSlice({
    name: "newProduct",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchNewLaunchProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchNewLaunchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.newLaunchProduct = action.payload;
        });
        builder.addCase(fetchNewLaunchProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default newLaunchProductSlice.reducer