import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Base_Url } from "../base_url/Base_Url"


const initialState = {
    cart:[],
    loading:false,
    error:null
}

const user_id = localStorage.getItem("user_id")


export const fetchCart = createAsyncThunk('fetchcart', async () => {
    const response =await axios.post(`${Base_Url}/Get_Data`,
    {
        "START": "0",
        "END": "100000",
        "WORD": "",
        "GET_DATA": "Get_MyCartList",
        "ID1": `${user_id}`,
        "ID2": "",
        "ID3": "",
        "STATUS": "",
        "START_DATE": "",
        "END_DATE": "",
        "EXTRA1": "ALL",
        "EXTRA2": "",
        "EXTRA3": "",
        "LANG_ID": ""
      }
    )

    return response.data.DATA
})


const cartSlice = createSlice({
    name:"cart",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
        });
        builder.addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default cartSlice.reducer;