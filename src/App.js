import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Footer from './pages/Footer'
import Home from './pages/Home'
import MyOrders from './pages/MyOrders'
import Navbar from './pages/Navbar'
import OrderDetails from './pages/OrderDetails'
import Product_Details from './pages/Product_Details'
import Shop from './pages/Shop'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import SignupOtp from './pages/SignupOtp'
import Wishlist from './pages/Wishlist'
import AllProduct from './Products/AllProduct'
import { RotatingLines } from 'react-loader-spinner'
import Cat_Shop from './pages/Cat_Shop'
import SigninOtp from './pages/SigninOtp'
import ProtectedRoute from '../src/ProtectedRoute/ProtectedRoute'
import MyProfile from './pages/MyProfile'
import RewardWallet from './pages/RewardWallet'
import Complaint from './pages/Complaint'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import RefundPolicy from './pages/RefundPolicy'
import GiftVouchers from './pages/GiftVouchers'
import VoucheDetails from './pages/VoucheDetails'
import PurchaseGift from './pages/PurchaseGift'
import Coupon from './pages/Coupon'

const App = () => {

  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, [1000])
  }, [])
  return (
    <div>
      <BrowserRouter>
        {loading ?
          (
            <div className='App'>
              <RotatingLines
                strokeColor="green"
                strokeWidth="3"
                animationDuration="0.75"
                width="50"
                visible={true}
              />
            </div>
          ) : (
            <>
              <Navbar />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/product-details' element={<Product_Details />} />
                <Route path='/order-details' element={<OrderDetails />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signupotp' element={<SignupOtp />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/allproduct' element={<AllProduct />} />
                <Route path='/cat-shop' element={<Cat_Shop />} />
                <Route path='/signinotp' element={<SigninOtp />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/terms-conditions' element={<TermsConditions />} />
                <Route path='/refund-policy' element={<RefundPolicy />} />

                <Route element={<ProtectedRoute/>}>
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path='/my-order' element={<MyOrders />} />
                <Route path='/my-profile' element={<MyProfile />} />
                <Route path='/reward-wallet' element={<RewardWallet />} />
                <Route path='/complaints' element={<Complaint />} />       
                <Route path='/gift-voucher' element={<GiftVouchers />} /> 
                <Route path='/voucher-details' element={<VoucheDetails />} />   
                <Route path='/purchase-gift' element={<PurchaseGift />} />
                <Route path='/coupon' element={<Coupon />} />        
                </Route>
              </Routes>
              <Footer />
            </>
           )

        } 

      </BrowserRouter>
    </div>
  )
}

export default App