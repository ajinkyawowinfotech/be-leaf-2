import React, { useContext, useEffect, useState } from 'react'
import logo from '../image/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import parse from 'html-react-parser';
import axios from 'axios';
import { Base_Url } from '../base_url/Base_Url';
import { ToastContainer, toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';
import { AuthContext } from '../AuthContext/AuthContext';
import { RotatingLines } from 'react-loader-spinner';
import { useSelector } from 'react-redux';



const user_id = localStorage.getItem("user_id")
const Product_Details = () => {
    const [count, setCount] = useState(1)
    const [product_img, setProductImg] = useState([])
    const [isActive, setIsActive] = useState(false);
    const [alldata, setAlldata] = useState([])
    const [video, setVideo] = useState([])
    const [releted, setReleted] = useState([])
    const location = useLocation()
    console.log("location.state",location.state)
    const productDetail = location.state

    const { loading, setLoading } = useContext(AuthContext)

    useEffect(() => {
        animateScroll.scrollToTop({
            duration: 0
        })
    }, [location.pathname])

    useEffect(() => {
        getVideo()
        getReletedProducts()
        getProductImg()
    }, [productDetail])


    const navigate = useNavigate()
    const getVideo = () => {

        axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/Get_Data",
            {
                "START": "0",
                "END": "10000000",
                "WORD": "",
                "GET_DATA": "Get_VideoList",
                "ID1": `${location.state.PRODUCT_ID}`,
                "ID2": "",
                "ID3": "",
                "STATUS": "",
                "START_DATE": "",
                "END_DATE": "",
                "EXTRA1": "",
                "EXTRA2": "",
                "EXTRA3": "",
                "LANG_ID": ""
            }
        ).then((res) => {
            console.log(res.data);
            setVideo(res.data.DATA1)

        })
    }

    const getProductImg = () => {
        setLoading(true)
        axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/Get_Data",
            {
                "START": "0",
                "END": "10000000",
                "WORD": "",
                "GET_DATA": "Get_ProductImagesByProductId",
                "ID1": `${location.state.PRODUCT_ID}`,
                "ID2": "",
                "ID3": "",
                "STATUS": "",
                "START_DATE": "",
                "END_DATE": "",
                "EXTRA1": "",
                "EXTRA2": "",
                "EXTRA3": "",
                "LANG_ID": ""
            }
        ).then((res) => {
            console.log(res.data);
            setProductImg(res.data.DATA)
            setLoading(false)
            console.log("location.state", location.state);

        })
    }

    const getReletedProducts = () => {
        axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/Get_Data",
            {
                "START": "0",
                "END": "10000000",
                "WORD": "",
                "GET_DATA": "Get_RelatedProducts",
                "ID1": '11',
                "ID2": `1`,
                "ID3": `${location.state.PRODUCT_ID}`,
                "STATUS": "",
                "START_DATE": "",
                "END_DATE": "",
                "EXTRA1": "",
                "EXTRA2": "",
                "EXTRA3": "",
                "LANG_ID": ""
            }
        ).then((res) => {
            console.log("res.data", res.data.DATA);
            setReleted(res.data.DATA)      

        })
    }

    useEffect(() => {
        animateScroll.scrollToTop({
            duration: 0
        })
    }, [location.pathname])

    const plusButton = () => {
        if (count >= location.state.AVAILABLE_QTY) {
            return setCount(location.state.AVAILABLE_QTY),
                alert(`Max quantity is ${location.state.AVAILABLE_QTY}`)
        } else {
            setCount(count + 1)
        }



    }

    const {wishlist} = useSelector((state) => state.wishlist)


    const minusButton = () => {
        if (count <= 1) {
            return setCount(1),
                alert("Minimum quantity is 1")

        } else {
            setCount(count - 1)
        }
    }

    const wishlist1 = (product) => {
        console.log("product", product);
        axios.post(`${Base_Url}/Update_Data`,
            {
                "TASK": "AddRemoveFavouriteProduct",
                "ID1": `${user_id}`,
                "ID2": `${product.PRODUCT_ID}`,
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
            console.log(res.data.DATA);
    
        })
    }

    
    const proDetails = (product) => {
        animateScroll.scrollToTop({
            duration: 0
        })
        navigate('/product-details', { state: product })
       
    }

    const addToCart = (product) => {

        if (user_id) {
            return axios.post(`${Base_Url}/Cart`,
                {
                    "USER_ID": `${user_id}`,
                    "PRODUCT_ID": `${product.PRODUCT_ID}`,
                    "PS_ID": `${product.PRODUCT_ID}`,
                    "QTY": `${count}`,
                    "TASK": "ADD",
                    "CART_ID": "",
                    "EXTRA1": "",
                    "EXTRA2": "",
                    "EXTRA3": "",
                    "LANG_ID": ""

                }
            ).then((res) => {
                console.log(res.data);
                toast.success(<h6 style={{ fontSize: "13px" }}>Product Added Successfully</h6>)
            })
        } else {
            return alert("Please Sign In First "),
                navigate('/signin')
        }


    }


    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>

                            {/* <span className="breadcrumb-item active">Product Detail</span> */}
                            <div className="two">
                                <h1>Product Detail
                                    <span></span>
                                </h1>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid pb-5">
                <div className="row px-xl-5">

                    <div className="col-lg-5 mb-30" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>


                        <div id="product-carousel" className="carousel slide" data-ride="carousel" style={{ background: "none" }}>
                            {/* <div className="carousel-inner bg-light"> */}
                            {loading ? (
                                <div className='productLoader'>
                                    <RotatingLines
                                        strokeColor="green"
                                        strokeWidth="3"
                                        animationDuration="0.75"
                                        width="50"
                                        visible={true}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <Carousel infiniteLoop autoPlay useKeyboardArrows dynamicHeight>
                                        {product_img.map((product, index) => {
                                            return (
                                                <div key={index}  >
                                                    <img className="w-100 h-100" src={product.PRODUCT_IMAGE} alt="Image" />
                                                </div>
                                            )
                                        })}


                                    </Carousel>

                                    {location.state.PRODUCT_IMAGE === null &&
                                        <>
                                            <img className="w-100 h-100" src={logo} />
                                        </>}
                                </div>
                            )}

                        </div>

                    </div>


                    <div className="col-lg-7 h-auto mb-30">
                        <div className="h-100 bg-light p-30">
                            <h3>{location.state.PRODUCT_NAME}</h3>
                            <div className="d-flex mb-3"></div>


                            <div style={{ display: "flex", gap: "15px" }}>
                                <h3 className="font-weight-semi-bold mb-4">&#8377;{(location.state.PRICE) - (location.state.DISCOUNT)}</h3>
                                <h4 className="font-weight-semi-bold mb-4"><s>&#8377;{location.state.PRICE}</s></h4>
                            </div>
                            <p>{`( Size - ${location.state.SIZE} Inch )`}</p>
                            <p>Product Code = {location.state.PRODUCT_CODE}</p>

                            <p className="mb-4">{(parse(location.state.DESCRIPTION.slice(0, 300)))}</p>
                            <div className="d-flex mb-3">

                            </div>

                            <div className="d-flex align-items-center mb-4 pt-2">
                                <div className="input-group quantity mr-3" style={{ width: "130px", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "0" }}>
                                    <div className="input-group-btn">
                                        <button className="btn btn-primary btn-minus" onClick={() => minusButton()} style={{ background: "transparent", border: "1px solid green" }}>
                                            <i className="fa fa-minus" style={{ color: "green" }}></i>
                                        </button>
                                    </div>
                                    <p className='text-center form-control' style={{ border: "none" }}>{count}</p>
                                    {/* <input type="text" className="form-control text-center" value="1" style={{background:"transparent"}} /> */}
                                    <div className="input-group-btn">
                                        <button className="btn btn-primary btn-plus" onClick={() => plusButton()} style={{ background: "transparent", border: "1px solid green" }}>
                                            <i className="fa fa-plus" style={{ color: "green" }}></i>
                                        </button>
                                    </div>
                                </div>
                                <button className="btn btn-primary px-3 btn-new-apply-1" onClick={() => addToCart(location.state)}><i className="fa fa-shopping-cart mr-1"></i> Add To
                                    Cart</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row px-xl-5">
                    <div className="col">
                        <div className="bg-light p-30">
                            <div className="nav nav-tabs mb-4" style={{ gap: "5px" }} >
                                <a className="nav-item nav-link newOne  " data-toggle="tab" href="#tab-pane-1" style={{ background: "transparent", color: "black", borderRadius: "10px", borderBottom: "1px solid green" }}>Product Description</a>
                                <a className="nav-item nav-link newOne " data-toggle="tab" href="#tab-pane-2" style={{ background: "transparent", color: "black", borderRadius: "10px", borderBottom: "1px solid green" }}>Videos</a>
                                <a className="nav-item nav-link newOne " data-toggle="tab" href="#tab-pane-3" style={{ background: "transparent", color: "black", borderRadius: "10px", borderBottom: "1px solid green" }}>Related Products</a>
                            </div>
                            <div className="tab-content">

                                <div className="tab-pane fade show active" id="tab-pane-1">
                                    <h4 className="mb-3">Product Description</h4>
                                    <p>{parse(location.state.DESCRIPTION)}</p>
                                </div>
                                <div className="tab-pane fade" id="tab-pane-2">
                                    <h4 className="mb-3">Videos</h4>
                                    {video.map((video, index) => {
                                        return (
                                            <div key={index}>
                                                <p>
                                                    {video.VIDEO ? (
                                                        <p>{video.VIDEO}</p>
                                                    ) : (
                                                        <h1>Sorry, No Data Found</h1>
                                                    )}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="tab-pane fade" id="tab-pane-3">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4 className="mb-4">Releted Products</h4>
                                            {/* <h1>Sorry, No Data Found</h1> */}
                                            <div className="row">
                                            {releted.map((product, index) => {
                                                return (
                                                    <div className="col-lg-3 col-md-4 col-sm-6 col-6 pb-1" key={index}>
                                                        <div className="product-item bg-light mb-4" style={{ cursor: "pointer" }}>

                                                            {user_id && <>
                                                                {wishlist.map((i) => {

                                                                    return (
                                                                        <>
                                                                            {i.PRODUCT_ID === product.PRODUCT_ID && <a className="" >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16" style={{ color: "red" }} onClick={() => wishlist1(product)}>
                                                                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                                                                </svg>
                                                                            </a>}
                                                                            {i.PRODUCT_ID !== product.PRODUCT_ID && <a className="" >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" style={{ color: "red" }} onClick={() => wishlist1(product)}>
                                                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                                                </svg>
                                                                            </a>}

                                                                        </>
                                                                    )
                                                                })}
                                                            </>}





                                                            <div className="product-img position-relative overflow-hidden" onClick={() => proDetails(product)}>
                                                                <img className="img-fluid w-100 " src={product.PRODUCT_IMAGE === null ? logo : product.PRODUCT_IMAGE} alt="" />

                                                            </div>
                                                            <div className="text-center py-4" style={{ borderBottom: "2px solid green", backgroundColor: "#ffffff", borderRadius: "6px" }} onClick={() => proDetails(product)}>
                                                                <a className="h6 text-decoration-none text-truncate" >{product.PRODUCT_NAME.slice(0, 12)}</a>
                                                                <div className="d-flex align-items-center justify-content-center mt-2">
                                                                    <h5>&#8377;{(product.PRICE) - (product.DISCOUNT)}</h5><h6 className="text-muted ml-2"><del>&#8377;{product.PRICE}</del></h6>
                                                                </div>

                                                            </div>
                                                            <div className="product-action" onClick={() => proDetails(product)} s>
                                                                <a className=""  ><i className="fa fa-shopping-cart"></i></a>

                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            })}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product_Details