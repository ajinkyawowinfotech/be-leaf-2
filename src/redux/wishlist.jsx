import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Base_Url } from "../base_url/Base_Url"


const initialState = {
    wishlist: [],
    product:{},
    loading: false,
    error: null
}

const user_id = localStorage.getItem("user_id")

export const fetchWishlist = createAsyncThunk('fetchwishlist', async () => {
    const response = await axios.post(`${Base_Url}/Get_Data`,
        {
            "START": "0",
            "END": "100000",
            "WORD": "",
            "GET_DATA": "Get_MyProductWishList",
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

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchWishlist.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlist = action.payload;
        });
        builder.addCase(fetchWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        
    }
})

export default wishlistSlice.reducer