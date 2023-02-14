import axios from 'axios'
import React, { useEffect } from 'react'
import { Base_Url } from '../base_url/Base_Url'
import { useState } from 'react'
import logo from '../image/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWishlist } from '../redux/wishlist'
import { useLocation, useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { toast } from 'react-toastify'

const user_id = localStorage.getItem("user_id")

const Wishlist = () => {
    const location = useLocation()

    useEffect(() => {
        animateScroll.scrollToTop({
            duration:0
        })
    },[location.pathname])

    const {wishlist} = useSelector((state) => state.wishlist)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
       dispatch(fetchWishlist())
    }, [wishlist])



    const proDetails = (product) => {
        navigate('/product-details', { state: product })
    }

    const remove = (item) => {
        axios.post(`${Base_Url}/Update_Data`,
        {
            "TASK": "AddRemoveFavouriteProduct",
            "ID1": `${user_id}`,
            "ID2": `${item.PRODUCT_ID}`,
            "ID3": "",
            "STATUS": "",
            "DATE1": "",
            "DATE2": "",
            "EXTRA1": "",
            "EXTRA2": "",
            "EXTRA3": "",
            "EXTRA4": "",
            "EXTRA5": "",
            "LANG_ID": ""
        }
    ).then((res) => {
        console.log(res.data);
        toast.success("Wishlist updated successfully")
    })
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>
                            {/* <span className="breadcrumb-item active">Product Detail</span> */}
                            <div className="two">
                                <h1>Wishlist
                                    <span></span>
                                </h1>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {wishlist.length === 0 ? (
                <div className="row mb-30">
                    <div className="col-12 text-center">
                        <h4>Wishlist is Empty</h4>
                    </div>
                </div>
            ) : (
                <section id="cart-view" style={{ paddingBottom: "20px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="cart-view-area" style={{ border: "1px solid lightslategray" }}>
                                <div className="cart-view-table aa-wishlist-table">
                                    <form action="">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr className='header-1'>
                                                        <th></th>
                                                        <th>Image</th>
                                                        <th>Product</th>
                                                        <th>Amount</th>
                                                        <th>Actual Amount</th>
                                                        <th>Cart</th>
                                                        <th>Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>                                                    
                                                        {wishlist.map((item,index) => {
                                                            return (
                                                                <tr key={index}>
                                                            <td><a className="remove" ></a></td>
                                                            <td><a ><img className='img-wishlist' src={item.PRODUCT_IMAGE === null ? logo : item.PRODUCT_IMAGE} alt="img" /></a></td>
                                                            <td ><a className="aa-cart-title">{item.PRODUCT_NAME}</a></td>
                                                            <td>&#8377; {item.PRICE}</td>
                                                            <td><s>&#8377; {item.PRICE * item.DISCOUNT / 100}</s></td>
                                                            <td><a  className="aa-add-to-cart-btn hover" style={{ cursor: "pointer" }}  onClick={() => proDetails(item)}>Add To Cart</a></td>
                                                            <td>
                                                                <a className="del-goods1" style={{ color: "red" }} onClick={() => remove(item)}><svg style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                                                </svg>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                            )
                                                        })}                                               
                                                </tbody>
                                            </table>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            )}          
        </div>
    )
}

export default Wishlist