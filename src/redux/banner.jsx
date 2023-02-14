import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import {Base_Url} from '../base_url/Base_Url'


const initialState = {
    banner:[],
    product:[],
    error:null,
    loading:false
}



export const bannerList = createAsyncThunk('fetachBanner',async () => {
    const response = await axios.post(`${Base_Url}/Get_Data`, {
        START: 0,
        END: 100000,
        WORD: "",
        GET_DATA: "Get_Banner",
        ID1: "33",
        ID2: "",
        ID3: "",
        STATUS: "",
        START_DATE: "",
        END_DATE: "",
        EXTRA1: "",
        EXTRA2: "",
        EXTRA3: "",
        LANG_ID: "",
    })

    return response.data.DATA
})


const bannerSlice = createSlice({
    name:"banner",
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(bannerList.pending, (state) => {
            state.loading = true;
            state.error = null
        });
        builder.addCase(bannerList.fulfilled, (state, action) => {
            state.loading = false;
            state.banner = action.payload
        });
        builder.addCase(bannerList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})


export default bannerSlice.reducer