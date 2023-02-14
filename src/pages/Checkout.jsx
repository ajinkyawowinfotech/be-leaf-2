import axios from 'axios'
import moment from 'moment/moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import useRazorpay from 'react-razorpay'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { toast } from 'react-toastify'
import { Base_Url } from '../base_url/Base_Url'
import { fetchCart } from '../redux/cart'
import cancel from '../image/ivcancel.png'
import { useContext } from 'react'
import { AuthContext } from '../AuthContext/AuthContext'


const user_id = localStorage.getItem("user_id")
// const total_Price = localStorage.getItem("total_price")
const Checkout = () => {
    const [self, setSelf] = useState(false)
    const [gift, setGift] = useState(false)
    const [shippcharges, setShipcharges] = useState(0)
    const [inputMobile, setInputMobile] = useState("")
    const [deliveryInstruction, setDeliveryInstruction] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [coupon, setcoupon] = useState(0)
    const [wallet, setWallet] = useState(0)
    const [walletInput, setWalletInput] = useState(false)
    const [fullname, setFullname] = useState("")
    const [total_Pric, setTotal_Price] = useState("")
    const [giftname, setGiftname] = useState("")
    const [couponCode, setCouponCode] = useState([])
    const [inputButton, setInputButton] = useState({
        area: "", landmark: "", district: "", state: "", zipcode: ""
    })

    const { cart } = useSelector((state) => state.cart)

    const dispatch = useDispatch()
    const location = useLocation()
    // console.log("total_price",location.state.total_price)
    const total_Price = location.state.total_price

    const {applyCoupon, shippingCharges, setApplyCoupon} = useContext(AuthContext) 


    useEffect(() => {
        animateScroll.scrollToTop({
            duration: 0
        })
        
    }, [location.pathname])
    const Razorpay = useRazorpay()

    let new4 = 0
    let total_Price2 = 0
    const cartDetails = cart.forEach((i) => {
        console.log("i", i.PRICE * i.QTY);
        const new3 = ((i.PRICE * i.QTY) * i.DISCOUNT / 100);
        const total_Price1 = (i.PRICE * i.QTY);
        total_Price2 += total_Price1
        new4 += new3
        // console.log("new3",new4);
        // setSaveAmount(new4)
        console.log("total_Price2",total_Price2)
        // setTotal_Price(total_Price2)

    })
    console.log("total_Pric",total_Pric)

    const rewardWallet = () => {
        setWalletInput(!walletInput)
    }

    const navigate = useNavigate()

    const zipcodeNumber = (e) => {
        const value = e.target.value
        if (!Number(value)) {
            return setZipcode("")
        } else if (value.length == 7) {
            return;
        }

        setZipcode(value)

    }

    const total = `${(total_Price + shippingCharges) - (new4) - (coupon) - (wallet >= total_Price ? (Math.round(total_Price / 2)) : (Math.round(wallet / 2)))}`


    const mobileNumber = (e) => {
        const value = e.target.value
        if (!Number(value)) {
            return setInputMobile("")
        } else if (value.length == 11) {
            return;
        }

        setInputMobile(value)

    }

 

    const applyVoucherCode = () => {
        axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/Get_Data",
        {
            "START": "0",
            "END": "100000",
            "WORD": "",
            "GET_DATA": "Get_CoupenCodeList",
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
    ).then((res) => {
        console.log(res.data.DATA);
        setCouponCode(res.data.DATA)
        
})
    }


    useEffect(() => {
        dispatch(fetchCart())
        axios.post(`${Base_Url}/Get_Data`,
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "Get_Version",
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
        ).then((res) => {
            console.log("wallet", res.data.DATA[0].WALLET_AMOUNT);
            const newData = (res.data.DATA[0].WALLET_AMOUNT)
            setWallet(newData)
        })
    }, [])

    var today = moment().format("DD MMM YYYY")

const removeCoupon = () => {
    setApplyCoupon("")
}
    const walletAmmount = `${wallet >= total_Price ? (Math.round(total_Price / 2)) : (Math.round(wallet / 2))}`

    const placeOrder = () => {
        if (self || gift) {
            if (self) {
                if (!fullname || !inputMobile || !inputButton.area || !inputButton.landmark || !inputButton.district || !inputButton.state || !zipcode) {
                    return alert("Please all Field is mondatory")
                }
            } else if (gift) {
                if (!giftname || !inputMobile || !inputButton.area || !inputButton.landmark || !inputButton.district || !inputButton.state || !zipcode) {
                    return alert("Please all Field is mondatory ")
                }
            }

            const options = {
                key: "rzp_test_rdwV8xC3KlbcHe", // Enter the Key ID generated from the Dashboard
                amount: `${Math.round(total * 100)}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "WOW infotech",
                description: "Test Transaction",
                // image: "https://example.com/your_logo",
                // order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
                handler: function (response) {

                    axios.post('https://apiwowbeleafadapiapp.be-leaf.in/API/PlaceOrder',
                        // { "ORDER_ID": "", "USER_ID": `${user_id}`, "TOTAL_PRICE": `${Math.round(total)}`, "TOTAL_DISC": "0.0", "TOTAL_QTY": "1", "GST_NO": "", "WALLET_AMOUNT": "5", "COUPEN_AMOUNT": "", "COUPEN_ID": "", "COUPEN_CODE": "", "LATITUDE": "", "LONGITUDE": "", "TIME_SLOT": "", "SHIPPING_CHARGES": "100.0", "ORDER_ADDRESS": "Akash , 9730201227 , null , null , 422008 , Nashik , MAHARASHTRA", "ORDER_DATE": "01\/20\/2023", "ORDER_INSTRUCTION": "", "PAYMENT_METHOD": "ONLINE", "PAYMENT_TYPE": "", "TRANSACTION_ID": "pay_L6QCctb2DnjiZf", "PAYMENT_STATUS": "SUCCESS", "ORDER_FOR": "Gifted", "TASK": "ADD", "EXTRA1": "", "EXTRA2": "", "EXTRA3": "", "LANG_ID": "" }
                        {
                            "ORDER_ID": "",
                            "USER_ID": `${user_id}`,
                            "TOTAL_PRICE": `${Math.round(total)}`,
                            "TOTAL_DISC": `${Math.round(new4)}`,
                            "TOTAL_QTY": `${cart.length}`,
                            "GST_NO": "",
                            "WALLET_AMOUNT": `${walletAmmount}`,
                            "COUPEN_AMOUNT": `${coupon}`,
                            "COUPEN_ID": "",
                            "COUPEN_CODE": "",
                            "LATITUDE": "",
                            "LONGITUDE": "",
                            "TIME_SLOT": "",
                            "SHIPPING_CHARGES": `${shippingCharges}`,
                            "ORDER_ADDRESS": `${fullname} ${giftname}  ${inputButton.area}, ${inputButton.landmark}, ${inputButton.district}, ${inputButton.state}, Mobile Number :- ${inputMobile}, Pincode :- ${zipcode}`,
                            "ORDER_DATE": `${today}`,
                            "ORDER_INSTRUCTION": `${deliveryInstruction}`,
                            "PAYMENT_METHOD": "ONLINE",
                            "PAYMENT_TYPE": "",
                            "TRANSACTION_ID": ``,
                            "PAYMENT_STATUS": "SUCCESS",
                            "ORDER_FOR": `${paymentMethod}`,
                            "TASK": "ADD",
                            "EXTRA1": "",
                            "EXTRA2": "",
                            "EXTRA3": "",
                            "LANG_ID": ""
                        }
                    ).then((res) => {
                        console.log(res.data);
                        navigate('/')
                        toast.success("Order Placed Successfully")
                    })
                },
                prefill: {
                    name: "Piyush Garg",
                    email: "youremail@example.com",
                    contact: "9999999999",
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);

            rzp1.open();



        }

        else {
            alert("Please select address type")
        }

    }


    const selfAdd = () => {
        setGift(false)
        setSelf(true)
        setPaymentMethod("Self")

    }

    let value, name
    const changeInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setInputButton({ ...inputButton, [name]: value })
    }

    const giftAdd = () => {
        setSelf(false)
        setGift(true)
        setPaymentMethod("Gifted")

    }



    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>
                            <div className="two">
                                <h1 className='cat_name'>Checkout
                                    <span></span>
                                </h1>
                            </div>
                            {/* <span className="breadcrumb-item active" style={{ fontWeight: "bold" }}>Checkout</span> */}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        {/* <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order For</span></h5> */}
                        <div className="seven">
                            <h4 className='cat_name'>Order For</h4>
                        </div>
                        <div className="bg-light " style={{ paddingLeft: "30px" }}>
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <div className="row">
                                        <div className="col-md-6" >
                                            <input type="radio" id='self' value={self} onClick={() => selfAdd()} style={{ cursor: "pointer" }} name='order' />
                                            <label htmlFor='self' className='pl-2' style={{ cursor: "pointer" }}>Self</label>
                                        </div>
                                        <div className="col-md-6">
                                            <input type="radio" onClick={() => giftAdd()} value={gift} style={{ cursor: "pointer" }} placeholder="John" id='Gift to Other' name='order' />
                                            <label htmlFor='Gift to Other' style={{ cursor: "pointer" }} className='pl-2' s>Gift to Other</label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        {/* <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Shipping Address</span></h5> */}
                        <div className="seven">
                            <h4 className='cat_name'>Shipping Address</h4>
                        </div>
                        <div className="bg-light p-30 ">
                            <div className="row">
                                {gift ? (
                                    <div className="col-md-6 form-group">
                                        <label>Gifted Person Name</label>
                                        <input className="form-control" name='giftname' required value={giftname} onChange={(e) => {
                                            setGiftname(e.target.value)
                                            setFullname("")
                                        }} type="text" placeholder="Enter Full Name" />
                                    </div>
                                ) : (
                                    <div className="col-md-6 form-group">
                                        <label>Full Name</label>
                                        <input className="form-control" name='fullname' required value={fullname} onChange={(e) => {
                                            setFullname(e.target.value)
                                            setGiftname("")
                                        }} type="text" placeholder="Enter Full Name" />
                                    </div>
                                )}

                                <div className="col-md-6 form-group">
                                    <label>Mobile No</label>
                                    <input className="form-control" name='mobile' value={inputMobile} onChange={(e) => mobileNumber(e)} type="text" placeholder="Enter Mobile No" required />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Area</label>
                                    <input className="form-control" name='area' value={inputButton.area} onChange={(e) => changeInput(e)} type="text" placeholder="Enter Area" required />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Landmark</label>
                                    <input className="form-control" name='landmark' value={inputButton.landmark} onChange={(e) => changeInput(e)} type="text" required placeholder="Enter Landmark" />
                                </div>

                                <div className="col-md-6 form-group">
                                    <label>District</label>
                                    <input className="form-control" name='district' value={inputButton.district} onChange={(e) => changeInput(e)} type="text" required placeholder="Enter District" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>State</label>
                                    <input className="form-control" name='state' value={inputButton.state} onChange={(e) => changeInput(e)} type="text" placeholder="Enter State" required />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>ZIP Code</label>
                                    <input className="form-control" value={zipcode} onChange={(e) => zipcodeNumber(e)} type="text" placeholder="Enter Pincode" required />
                                </div>

                            </div>
                        </div>
                        <div >
                            {/* <h5 className="section-title position-relative text-uppercase"><span className="bg-secondary pr-3">Apply Gift Voucher</span></h5> */}
                            <div className="seven">
                                <h4 className='cat_name'>Apply Gift Voucher</h4>
                            </div>
                            <div className="bg-light p-30">
                                <div className="row">
                                    <div className="input-group">
                                        <input type="text" className="form-control border-0 p-4" placeholder="Enter Voucher Code" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary btn-new-apply-1" onClick={() => applyVoucherCode()} >Apply</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div >
                            {/* <h5 className="section-title position-relative text-uppercase "><span className="bg-secondary pr-3">Delivery Instruction</span></h5> */}
                            <div className="seven">
                                <h4 className='cat_name'>Delivery Instruction</h4>
                            </div>
                            <div className="bg-light p-30">
                                <div className="row">
                                    <div className="input-group">
                                        <input type="text" value={deliveryInstruction} onChange={(e) => setDeliveryInstruction(e.target.value)} className="form-control p-4" placeholder="Delivery Instruction" />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        {/* <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Billing Details</span></h5> */}
                        <div className="seven">
                            <h4 className='cat_name'>Billing Details</h4>
                        </div>
                        <div className="bg-light p-30 mb-5">

                            <div className="border-bottom" >
                                {/* <h6 className="mb-3">Products</h6> */}
                                <div className="d-flex justify-content-between">
                                    <p>Total Price</p>
                                    <p>&#8377;{Math.round(Number(total_Price2))}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p>Totals Product</p>
                                    <p>{cart.length}</p>
                                </div>
                                {cart.slice(0, 1).map((i, index) => {

                                    return (
                                        <div className="d-flex justify-content-between" key={index}>
                                            <p>Shipping Charges</p>
                                            <p>&#8377;{Number(i.SHIPPING_CHARGES)}</p>
                                        </div>
                                    )
                                })}

                                <div className="d-flex justify-content-between">
                                    <p>You Save</p>
                                    <p>&#8377;{Math.round(Number(new4))}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p>Applied Coupon Discount</p>
                                    {applyCoupon.COUPEN_AMOUNT ? (
                                    <p>&#8377;{total_Price * applyCoupon.COUPEN_AMOUNT / 100}</p>
                                    ) : (
                                        <p>{coupon}</p>
                                    )}
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p>Used Wallet Amount <input type="checkbox" style={{ marginLeft: "5px" }} value={walletInput} onChange={rewardWallet} /></p>
                                    {walletInput === false ? (
                                        <p>0</p>
                                    ) : (
                                        <p>&#8377;{wallet >= total_Price ? (Math.round(Number(total_Price / 2))) : (Math.round(Number(wallet / 2)))}</p>
                                    )}
                                </div>
                            </div>
                            {/* )
                            })} */}


                            <div className="pt-2">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5>Grand Total</h5>
                                    {applyCoupon.COUPEN_AMOUNT ? (
                                        <h5>&#8377;{(total_Price + shippingCharges) - (new4) - (total_Price * applyCoupon.COUPEN_AMOUNT / 100) - (walletInput === false ?
                                            (0) : (wallet >= total_Price ? (Math.round(total_Price / 2)) : (Math.round(wallet / 2))))}</h5>
                                    ) : (
                                        <h5>&#8377;{(total_Price + shippingCharges) - (new4) - (coupon) - (walletInput === false ?
                                            (0) : (wallet >= total_Price ? (Math.round(total_Price / 2)) : (Math.round(wallet / 2))))}</h5>
                                    )}
                                    
                                    {/* Math.round((total_Price + shippingCharges) - (new4) - (coupon) - (wallet >= total_Price ? (Math.round(total_Price / 2)) : (Math.round(wallet / 2)))) */}
                                </div>
                            </div>

                        </div>
                        <form className="mb-30" style={{ marginTop: "-45px" }} action="">
                            <div className="input-group" style={{ display: "flex", alignItems: "center", background: "#519d51", justifyContent: "center" }}>

                                {applyCoupon.COUPEN_CODE ? (
                                    <>
                                        <h4 style={{ fontSize: "1.2rem ", marginBottom: "auto", padding: "0.5rem", color: "white" }}> {applyCoupon.COUPEN_CODE} Applied Successfully</h4>
                                        <img src={cancel} style={{ width: "1.3rem", cursor: "pointer" }} alt="" onClick={removeCoupon} />
                                    </>

                                ) : (
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        navigate('/coupon')
                                    }} className="btn btn-new-1 btn-block btn-primary font-weight-bold py-3">Apply Coupon</button>
                                )}


                            </div>
                        </form>
                        <div className="mb-5">
                            {/* <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Payment</span></h5> */}
                            <div className="seven">
                                <h4 className='cat_name'>Payment</h4>
                            </div>
                            <div className="bg-light ">
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" checked name="payment" id="paypal" />
                                        <label className="custom-control-label" for="paypal">Pay Online</label>
                                    </div>
                                </div>
                                <div className="input-group mt-5" >
                                    <button className="btn btn-block btn-primary btn-new-1 font-weight-bold py-3" onClick={() => placeOrder()}>Place Order</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout