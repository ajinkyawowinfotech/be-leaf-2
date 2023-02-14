import axios from 'axios'
import React, { useEffect } from 'react'
import gift from '../image/giftcard.webp'
import imagenotound from '../image/imagenotfound.jpg'
import { Base_Url } from '../base_url/Base_Url'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'


const GiftVouchers = () => {
    const [giftData, setGiftData] = useState([])

    const location = useLocation()

    useEffect(() => {
        animateScroll.scrollToTop({
            duration:0
        })
    },[location.pathname]) 

    const navigate = useNavigate()
    useEffect(() => {
        axios.post(`${Base_Url}/Gift`,
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "",
                "EXTRA1": "",
                "EXTRA2": "",
                "EXTRA3": "",
                "LANG_ID": ""
            }
        )
            .then((res) => {
                console.log(res.data.DATA);
                setGiftData(res.data.DATA)
            })
    }, [])

    const giftCard = (product) => {
        navigate('/voucher-details', {state:product})
    }
    return (
        <div >
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-8">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>
                            <div className="two ">
                                <h1 className='cat_name'>Gift Vouchers
                                    <span></span>
                                </h1>
                            </div>
                        </nav>
                    </div>
                    <div className="col-4">
                        <button className='btn' style={{ float: "right", color: "white", background: "#459544",marginTop: "12px", borderRadius: "5px" }} onClick={() => navigate('/purchase-gift')}>My Purchase Gift Vouchers</button>
                    </div>
                </div>
            </div>
            <div className='container  pb-3'>
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-12" style={{ textAlign: "center" }}>
                            <img className='img-fluid' src={gift} alt="image not found" style={{ width: "61%" }} />
                        </div>
                    </div>
                </div>
                <div className="row px-xl-5 mb-30" style={{ border: "1px solid #d3caca", padding: "10px" }}>
                    {giftData.map((gifts,index) => {
                        return (
                            <div className="col-lg-3 col-md-4 col-sm-6 col-6 pb-1" key={index} >
                                <div className="product-item bg-light mb-4" onClick={() => giftCard(gifts)} style={{ border: "1px solid #d3c9c9", borderRadius: "10px", cursor:"pointer" }}>
                                    <div className="product-img position-relative overflow-hidden">
                                        <img className="img-fluid w-100 " src={imagenotound} alt="image not found" />
                                    </div>
                                    <div className="text-center py-4" style={{ borderBottom: "2px solid green", backgroundColor: "rgb(221 180 86 / 88%", borderRadius: "6px" }}>
                                        <a className="h6 text-decoration-none text-truncate" style={{ color: "white" }}>{gifts.GIFT_NAME}</a>
                                        <div className="d-flex align-items-center justify-content-center mt-2">
                                            <h5 style={{ color: "white" }}>Rs. {gifts.AMOUNT}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}


                </div>
            </div>

        </div>
    )
}

export default GiftVouchers