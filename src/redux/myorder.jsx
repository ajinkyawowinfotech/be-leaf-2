import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import {Base_Url} from '../base_url/Base_Url'


const initialState = {
    orderList:[],
    loading:false,
    error:null
}


export const fetchOrderList = createAsyncThunk('fetchorder', async () => {
    const user_id = localStorage.getItem("user_id")
    const response = await axios.post(`${Base_Url}/Get_Data`,
    {
        "START": "0",
        "END": "100000",
        "WORD": "",
        "GET_DATA": "Get_MyOrderList",
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


const orderSlice = createSlice({
    name:"orderList",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(fetchOrderList.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchOrderList.fulfilled, (state, action) => {
            state.loading = false;
            state.orderList = action.payload;
        });
        builder.addCase(fetchOrderList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        });
    }
})

export default orderSlice.reducer