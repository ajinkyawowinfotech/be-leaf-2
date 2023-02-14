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



const user_id = localStorage.getItem("user_id")
const Product_Details = () => {
    const [count, setCount] = useState(1)
    const [product_img, setProductImg] = useState([])
    const [isActive, setIsActive] = useState(false);
    const [alldata, setAlldata] = useState([])
    const [video, setVideo] = useState([])
    const [releted, setReleted] = useState([])
    const location = useLocation()
    console.log(location.state);

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
    }, [])


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
                "ID1": `${location.state.CAT_ID}`,
                "ID2": `${user_id}`,
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

    const minusButton = () => {
        if (count <= 1) {
            return setCount(1),
                alert("Minimum quantity is 1")

        } else {
            setCount(count - 1)
        }
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



                            {/* </div> */}
                            {/* <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                                <i className="fa fa-2x fa-angle-left text-dark"></i>
                            </a>
                            <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                                <i className="fa fa-2x fa-angle-right text-dark"></i>
                            </a> */}

                        </div>

                    </div>


                    <div className="col-lg-7 h-auto mb-30">
                        <div className="h-100 bg-light p-30">
                            <h3>{location.state.PRODUCT_NAME}</h3>
                            <div className="d-flex mb-3"></div>


                            <div style={{ display: "flex", gap: "15px" }}>
                                <h3 className="font-weight-semi-bold mb-4">&#8377;{(location.state.PRICE) - (location.state.PRICE * location.state.DISCOUNT / 100)}</h3>
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
                                        <div className="col-md-6">
                                            <h4 className="mb-4">Releted Products</h4>
                                            <h1>Sorry, No Data Found</h1>
                                            {/* {releted.map((product) => {
                                                console.log("product Releted", product);
                                                return (
                                                    <div className="media mb-4">
                                                        <img src="img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{ width: "45px" }} />
                                                        <div className="media-body">
                                                            <h6>Hello ajinkya</h6>
                                                            <div className="text-primary mb-2">
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star-half-alt"></i>
                                                                <i className="far fa-star"></i>
                                                            </div>
                                                            <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                                                        </div>
                                                    </div>
                                                )
                                            })} */}

                                            {/* <div className="media mb-4">
                                                <img src="img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{ width: "45px" }} />
                                                <div className="media-body">
                                                    <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                                                    <div className="text-primary mb-2">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star-half-alt"></i>
                                                        <i className="far fa-star"></i>
                                                    </div>
                                                    <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.</p>
                                                </div>
                                            </div> */}
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