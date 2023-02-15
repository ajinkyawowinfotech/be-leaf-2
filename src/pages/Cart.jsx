import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Base_Url } from '../base_url/Base_Url'
import logo from '../image/logo.png'
import Image from '../image/product-1.jpg'
import { fetchCart } from '../redux/cart'
import sold from '../image/sold_out.png'
import { animateScroll } from 'react-scroll'
import { useContext } from 'react'
import { AuthContext } from '../AuthContext/AuthContext'
import { toast } from 'react-toastify'



const user_id = localStorage.getItem("user_id")

const Cart = () => {
    const navigate = useNavigate()
    const [soldProduct, setSoldProduct] = useState([])
    const [count, setCount] = useState(1)
    const [shippCharges, setShipCharges] = useState("")
    const [cart, setProduct] = useState([])
    const [productData, setProductData] = useState([])
    const [qty, setQty] = useState(1)
    const [total, setTotal] = useState("")
    const [loading, setLoading] = useState(false)

    const location = useLocation()

    useEffect(() => {
        animateScroll.scrollToTop({
            duration: 0
        })
    }, [location.pathname])

    const getProduct = () => {
        axios.post(`${Base_Url}/Get_Data`,
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "Get_MyCartList",
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
            setProduct(res.data.DATA)
        })
    }

    const getProductData = () => {
        setLoading(true)
        axios.post(`${Base_Url}/Get_Data`,
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "Get_MyCartList",
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
            setProductData(res.data.DATA)
            setLoading(false)

        })
    }
    let priceCount = 0

    let total_price = 0

    const dispatch = useDispatch()

    // console.log("cart",cart);
    // cart.forEach((i) => {
    //     const data = Math.round((i.PRICE * i.QTY) - ((i.PRICE * i.QTY) * i.DISCOUNT / 100))
    //     console.log(data);
    //     priceCount += data
    //     const data1 = (i.PRICE * i.QTY)
    //     total_price += data1
    //     setTotal(priceCount)
    //     setShipCharges(i.SHIPPING_CHARGES)
    //     console.log("priceCount",priceCount);

    // })



    useEffect(() => {
        getProduct()
        // getProductData()
        cart.forEach((i) => {
            const data = Math.round((i.PRICE * i.QTY) - ((i.QTY * i.DISCOUNT)))
            priceCount += data
            const data1 = (i.PRICE * i.QTY)
            total_price += data1
            setTotal(priceCount)
            setShipCharges(i.SHIPPING_CHARGES)

        })
    }, [cart])


    const decrement = (product) => {
        if (product.QTY == 1) {
            return setQty(1)
        } else {
            setQty(product.QTY -= 1)
        }
        setQty(product.QTY)
        console.log("Qty", count);
        if (product.QTY === 1) {
            return setQty(1);

        } else {
            setQty(product.QTY -= 1)

        }

        axios.post(`${Base_Url}/Cart`,
            {
                "USER_ID": `${user_id}`,
                "PRODUCT_ID": `${product.PRODUCT_ID}`,
                "PS_ID": `${product.PRODUCT_ID}`,
                "QTY": `${product.QTY}`,
                "TASK": "EDIT",
                "CART_ID": "1",
                "EXTRA1": "",
                "EXTRA2": "",
                "EXTRA3": "",
                "LANG_ID": "",
            }
        ).then((res) => {
            console.log(res.data);
            getProduct()
        })

    }

    useEffect(() => {
        axios.post(`${Base_Url}/Get_Data`,
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "Get_PlaceOrderStatus",
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
            setSoldProduct(res.data.DATA1)
        })
    }, [cart])

    useEffect(() => {
        setTimeout(() => {
            getProductData()
        }, [2000])
    }, [])

    const removeItem = (product) => {
        axios.post(`${Base_Url}/Cart`,
            { "USER_ID": `${user_id}`, "PRODUCT_ID": `${product.PRODUCT_ID}`, "PS_ID": "85", "QTY": "0", "TASK": "DELETE", "CART_ID": "1", "EXTRA1": "", "EXTRA2": "", "EXTRA3": "", "LANG_ID": "" }
        ).then((res) => {
            getProductData()
            toast.success("Cart updated successfully")

        })
    }

    const { setTotalPrice, setShippingCharges } = useContext(AuthContext)



    const increment = (product) => {
        // console.log("product.AVAILABLE_QTY", product.AVAILABLE_QTY);


        // if (product.QTY == product.AVAILABLE_QTY) {
        //     return setQty(product.AVAILABLE_QTY)
        // } else {
        //     setQty(product.QTY++)
        // }

        axios.post(`${Base_Url}/Cart`,

            {
                "USER_ID": `${user_id}`,
                "PRODUCT_ID": `${product.PRODUCT_ID}`,
                "PS_ID": `72`,
                "QTY": `${product.QTY}`,
                "TASK": "EDIT",
                "CART_ID": "1",
                "EXTRA1": "",
                "EXTRA2": "",
                "EXTRA3": "",
                "LANG_ID": ""

            }
        ).then((res) => {
            console.log(res.data);
            getProduct()
        })

    }




    const proceedToCheckout = () => {
        axios.post(`${Base_Url}/Get_Data`,
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "Get_PlaceOrderStatus",
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
            const checkStatus = res.data.DATA[0].PLACE_ORDER_STATUS
            console.log("res.data.status", checkStatus);
            if (checkStatus === "No") {
                return alert("Please Remove Sold Out Product")
            } else {
                setShippingCharges(shippCharges)
                setTotalPrice(total)
                // console.log("total_price",total_price)
                localStorage.setItem("total_price", total)
                console.log("total_price", total)
                localStorage.setItem("total_Price",total_price)
                localStorage.setItem("shippCharges",shippCharges)
                navigate('/checkout', { state: { total_price, shippCharges } })

            }

        })
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>
                            <div className="two ">
                                <h1 className='cat_name'>Shopping Cart
                                    <span></span>
                                </h1>
                            </div>
                            {/* <a className="breadcrumb-item text-dark" href="#">Home</a>
                    <a className="breadcrumb-item text-dark" href="#">Shop</a> */}
                            {/* <span className="breadcrumb-item active" style={{ fontWeight: "bold" }}>Shopping Cart</span> */}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8 table-responsive mb-5">
                        {cart.length >= 1 ?
                            (<table className="table table-light table-borderless table-hover  mb-0">
                                <thead className="thead-dark" >
                                    <tr >
                                        <th>Image</th>
                                        <th style={{ textAlign: "center" }}>Name</th>
                                        <th style={{ textAlign: "center" }}>Qty</th>
                                        <th style={{ textAlign: "center" }}>Price</th>
                                        <th style={{ textAlign: "center" }}>Actual Amt</th>
                                        <th style={{ textAlign: "center" }}>Remove</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle">

                                    {productData.map((product, index) => {
                                        return (
                                            <tr key={index} style={{ borderBottom: "1px groove #D3D3D3" }}>
                                                <td className="align-middle">
                                                    {product.PRODUCT_STATUS === 'Out Of Stock' &&
                                                        <>
                                                            <img src={product.PRODUCT_IMAGE === null ? logo : product.PRODUCT_IMAGE} alt="" style={{ width: "50px" }} /> <span><img src={sold} alt="" className='sold' /></span>
                                                        </>}
                                                    {product.PRODUCT_STATUS === 'In Stock' &&
                                                        <>
                                                            <img src={product.PRODUCT_IMAGE === null ? logo : product.PRODUCT_IMAGE} alt="" style={{ width: "50px" }} />
                                                        </>}
                                                </td>
                                                <td className="align-middle " style={{ textAlign: "center" }}>{product.PRODUCT_NAME.slice(0, 12)}</td>
                                                <td className="align-middle" style={{ textAlign: "center" }}>
                                                    <div className="input-group quantity mx-auto" style={{ width: "100px", border: "none" }}>
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-sm btn-primary btn-minus" style={{ background: "white", border: "1px solid green" }} onClick={() => {

                                                                if (product.QTY === 1) {
                                                                    return setQty(1),
                                                                        alert("Minimum quantity is 1")
                                                                } else {
                                                                    setQty(product.QTY -= 1)

                                                                    axios.post(`${Base_Url}/Cart`,
                                                                        {
                                                                            "USER_ID": `${user_id}`,
                                                                            "PRODUCT_ID": `${product.PRODUCT_ID}`,
                                                                            "PS_ID": `${product.PRODUCT_ID}`,
                                                                            "QTY": `${product.QTY}`,
                                                                            "TASK": "EDIT",
                                                                            "CART_ID": "1",
                                                                            "EXTRA1": "",
                                                                            "EXTRA2": "",
                                                                            "EXTRA3": "",
                                                                            "LANG_ID": ""
                                                                        }
                                                                    ).then((res) => {
                                                                        console.log(res.data);
                                                                        getProductData()
                                                                    })
                                                                }
                                                            }} >
                                                                <i className="fa fa-minus" style={{ color: "green" }}></i>
                                                            </button>
                                                        </div>
                                                        <p className='text-center form-control' style={{ border: "none" }}>{product.QTY}</p>
                                                        <div className="input-group-btn">
                                                            <button className="btn btn-sm btn-primary btn-plus" style={{ background: "white", border: "1px solid green" }} onClick={() => {
                                                                console.log("product.QTY", product.QTY);
                                                                if (product.QTY === product.AVAILABLE_QTY) {
                                                                    return setQty(product.AVAILABLE_QTY),
                                                                        alert(`Max quantity is ${product.AVAILABLE_QTY}`)
                                                                } else {
                                                                    setQty(product.QTY++)
                                                                    axios.post(`${Base_Url}/Cart`,
                                                                        {
                                                                            "USER_ID": `${user_id}`,
                                                                            "PRODUCT_ID": `${product.PRODUCT_ID}`,
                                                                            "PS_ID": `${product.PRODUCT_ID}`,
                                                                            "QTY": `${product.QTY}`,
                                                                            "TASK": "EDIT",
                                                                            "CART_ID": "1",
                                                                            "EXTRA1": "",
                                                                            "EXTRA2": "",
                                                                            "EXTRA3": "",
                                                                            "LANG_ID": ""
                                                                        }
                                                                    ).then((res) => {
                                                                        console.log(res.data);
                                                                        getProductData()
                                                                    })
                                                                }
                                                            }}>
                                                                <i className="fa fa-plus" style={{ color: "green" }}></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle" style={{ textAlign: "center" }}>&#8377;{Math.round((product.PRICE * product.QTY) - (product.QTY * product.DISCOUNT ))}</td>
                                                <td className="align-middle" style={{ textAlign: "center" }}>&#8377;<del>{Math.round(product.PRICE * product.QTY)}</del></td>
                                                <td className="align-middle" style={{ textAlign: "center" }}>
                                                    <a className="del-goods1" style={{ color: "red" }} onClick={() => removeItem(product)}><svg style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                                    </svg>
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>) : (
                                <h2>Cart is Empty</h2>

                            )}
                    </div>
                    {cart.length >= 1 && <div className="col-lg-4">
                        <div className="seven">
                            <h4>Cart Summary</h4>
                        </div>
                        <div className="bg-light mb-5 " style={{ paddingTop: "30px" }}>
                            <div className="border-bottom pb-2">
                                <div className="d-flex justify-content-between mb-3" style={{ borderBottom: "dashed" }}>
                                    <h6>Item</h6>
                                    <h6>{cart.length}</h6>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">Total Price</h6>
                                    <h6 className="font-weight-medium">Rs. {total}</h6>
                                </div>
                            </div>
                            <div className="pt-2">
                                <button onClick={() => proceedToCheckout()} className="btn btn-block btn-primary btn-new-1 font-weight-bold my-3 py-3">Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Cart