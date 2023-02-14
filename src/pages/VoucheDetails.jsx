import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import imagenotound from '../image/imagenotfound.jpg'
import parse from 'html-react-parser'
import useRazorpay from 'react-razorpay'
import axios from 'axios'
import { Base_Url } from '../base_url/Base_Url'
import { useEffect } from 'react'
import { animateScroll } from 'react-scroll'

const user_id = localStorage.getItem("user_id")
const email = localStorage.getItem("email")
const user_name = localStorage.getItem("user_name")
const mobile = localStorage.getItem("mobile")
const VoucheDetails = () => {
    const location = useLocation()
    // console.log(location.state);

    useEffect(() => {
        animateScroll.scrollToTop({
            duration:0
        })
    },[location.pathname])

    const navigate = useNavigate()

    const Razorpay = useRazorpay()

    const giftOrder = () => {
        const options = {
            key: "rzp_test_rdwV8xC3KlbcHe", // Enter the Key ID generated from the Dashboard
            amount: `${location.state.AMOUNT * 100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "WOW infotech",
            description: "Test Transaction",
            handler: function (response) {
            //   alert(response.razorpay_payment_id);
                axios.post(`${Base_Url}/GiftOrder`,
                {
                    
                        "GIFT_ORDER_ID": "",
                        "USER_ID": `${user_id}`,
                        "GIFT_ID": `${location.state.GIFT_ID}`,
                        "AMOUNT": `${location.state.AMOUNT}`,
                        "TRANSACTION_ID": `${response.razorpay_payment_id}`,
                        "TRANSACTION_STATUS": "SUCCESS",
                        "PAYMENT_STATUS": "SUCCESS",
                        "TASK": "ADD",
                        "GET_DATA": "",
                        "EXTRA1": "",
                        "EXTRA2": "",
                        "EXTRA3": "",
                        "LANG_ID": ""
                      
                }).then((res) => {
                    console.log(res.data);
                    navigate('/purchase-gift')
                })
            },
            prefill: {
              name: `${user_name}`,
              email: `${email}`,
              contact: `${mobile}`,
            },
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#3399cc",
            },
          };
        
          const rzp1 = new Razorpay(options);
          rzp1.open();
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>

                            {/* <span className="breadcrumb-item active">Product Detail</span> */}
                            <div className="two">
                                <h1>Voucher Details
                                    <span></span>
                                </h1>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid pb-5">
                <div className="row px-xl-5">

                    <div className="col-lg-5 mb-30">


                        <div id="product-carousel" className="carousel slide" data-ride="carousel" style={{ background: "none" }}>
                            <div className="carousel-inner bg-light">                                
                                            <div  >
                                                <img className="w-100 h-100" src={imagenotound} alt="Image" />
                                            </div>
                                           
                                 
                               
                            </div>
                            <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                                <i className="fa fa-2x fa-angle-left text-dark"></i>
                            </a>
                            <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                                <i className="fa fa-2x fa-angle-right text-dark"></i>
                            </a>
                        </div>

                    </div>


                    <div className="col-lg-7 h-auto mb-30">
                        <div className="h-100 bg-light p-30">
                            <h3>{location.state.GIFT_NAME}</h3>
                            <div className="d-flex mb-3"></div>


                            <div style={{ display: "flex", gap: "15px" }}>
                                <h3 className="font-weight-semi-bold mb-4" style={{fontSize:"20px"}}>Gift Voucher Price- Rs. {location.state.AMOUNT}</h3>
                            </div>
                           

                            <p className="mb-4">{parse(location.state.GIFT_DESCRTIPTION)}</p>
                            <div className="d-flex mb-3">

                            </div>

                            <div className="d-flex align-items-center mb-4 pt-2">
                                
                                <button className="btn btn-primary px-3 btn-new-apply-1" onClick={() => giftOrder()}><i className="fa fa-shopping-cart mr-1"></i>Buy Now</button>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default VoucheDetails