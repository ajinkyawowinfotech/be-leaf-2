import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { Base_Url } from '../base_url/Base_Url'

const user_id = localStorage.getItem("user_id")
const PurchaseGift = () => {
    const [purchasedGift, setPurchasedGift] = useState([])
    const [newGift, setNewGift] = useState([])

    const location = useLocation()

    useEffect(() => {
        animateScroll.scrollToTop({
            duration: 0
        })
    }, [location.pathname])

    useEffect(() => {
        axios.post(`${Base_Url}/Get_Data`,
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "Get_UserGiftOrderedList",
                "ID1": `${user_id}`,
                "ID2": "",
                "ID3": "",
                "STATUS": "",
                "START_DATE": "",
                "END_DATE": "",
                "EXTRA1": "",
                "EXTRA2": "",
                "EXTRA3": "",
                "LANG_ID": ""
            }).then((res) => {
                console.log(res.data);
                const data = res.data.DATA
                setPurchasedGift(res.data.DATA)
                // setPurchasedGift(purchasedGift.reverse())
                setNewGift(purchasedGift.reverse())

            })
    }, [newGift])
    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>

                            {/* <span className="breadcrumb-item active">Product Detail</span> */}
                            <div className="two">
                                <h1>Purchased Gift Vouchers
                                    <span></span>
                                </h1>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {purchasedGift.length === 0 ? (
                <div className="row mb-30">
                    <div className="col-12 text-center">
                        <h4>No Data Found</h4>
                    </div>
                </div>
            ) : (
                <section id="cart-view" style={{ paddingBottom: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="cart-view-area" style={{ border: "outset" }}>
                                    <div className="cart-view-table aa-wishlist-table">
                                        <form action="">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr className='header-1'>
                                                            <th></th>
                                                            <th>Gift Voucher Id</th>
                                                            <th>Orderd</th>
                                                            <th>Voucher Code</th>
                                                            <th>Transaction Id</th>
                                                            <th>Amount</th>
                                                            {/* <th>Remove</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {newGift.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td></td>
                                                                    <td><p>{item.GIFT_ORDER_ID}</p></td>
                                                                    <td >{item.REG_DATE}</td>
                                                                    <td> {item.GIFT_UNIQUE_NO}</td>
                                                                    {
                                                                        item.TRANSACTION_ID === null ? (
                                                                            <td style={{ fontWeight: "bold" }}>-</td>
                                                                        ) : (
                                                                            <td> {item.TRANSACTION_ID}</td>

                                                                        )
                                                                    }
                                                                    <td>Rs. {item.AMAUNT}</td>

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

export default PurchaseGift