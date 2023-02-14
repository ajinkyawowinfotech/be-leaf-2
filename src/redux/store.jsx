import { configureStore } from "@reduxjs/toolkit";
import bannerSliceReducer from './banner'
import productSliceReducer from './product'
import newLaunchProductSliceReducer from './newLaunch'
import recommendedProductsSliceReducer from './recommended'
import allProductSliceReducer from './allProduct'
import wishlistSliceReducer from './wishlist'
import cartSliceReducer from './cart'
import orderSliceReducer from './myorder'




const store = configureStore({
    reducer:{
        banner:bannerSliceReducer,
        product:productSliceReducer,
        newLaunchProduct:newLaunchProductSliceReducer,
        recommendedProduct:recommendedProductsSliceReducer,
        allProduct:allProductSliceReducer,
        wishlist:wishlistSliceReducer,
        cart:cartSliceReducer,
        orderlist:orderSliceReducer

    }
})

export default store