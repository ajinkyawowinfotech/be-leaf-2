import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useLocation, useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { AuthContext } from '../AuthContext/AuthContext'
import { Base_Url } from '../base_url/Base_Url'
import logo from '../image/logo.png'
import Wishlist from './Wishlist'

const user_id = localStorage.getItem("user_id")

const Shop = () => {
    const [product, setProduct] = useState([])
    const [all, setAll] = useState(false)
    const [hlp, setHlp] = useState(false)
    const [lhp, setLhp] = useState(false)
    const [hls, setHls] = useState(false)
    const [lhs, setLhs] = useState(false)
    const [search, setSearch] = useState("")
    const [noElement, setNoelement] = useState(9)
    const loaction = useLocation()

    useEffect(() => {
        animateScroll.scrollToTop({
            duration:0
        })
    }, [loaction.pathname])

    const {loading, setLoading} = useContext(AuthContext)

    console.log("loaction.state.newLaunchProduct", loaction.state);
    useEffect(() => {
        setProduct(loaction.state)
    }, [])

    const Slice = product.slice(0, noElement)
    const navigate = useNavigate()

    const viewMore = (e) => {
        setNoelement(noElement + noElement)
    }

    const proDetails = (product) => {
        navigate('/product-details', {state:product})
    }

    const Wishlist = (product) => {
        // navigate('/wishlist')
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
            console.log(res.data);
        })
    }
    

    const changeinLhp = () => {
        setAll(false)
        setHlp(false)
        setHls(false)
        setLhs(false)
        setLhp(true)
    }

    const changeinHls = () => {
        setAll(false)
        setHlp(false)
        setLhs(false)
        setLhp(false)
        setHls(true)
    }

    const changeinLhs = () => {
        setAll(false)
        setHlp(false)
        setLhp(false)
        setHls(false)
        setLhs(true)
    }

    const changeinAll = () => {
        setHlp(false)
        setLhp(false)
        setHls(false)
        setLhs(false)
        setAll(true)
    }

    const changeinHlp = () => {
        setLhp(false)
        setHls(false)
        setLhs(false)
        setAll(false)
        setHlp(true)
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>
                            <div className="two ">
                                <h1 className='cat_name'>Shop
                                    <span></span>
                                </h1>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {/* <div className="row">
                <div className="col-3"></div>
                <div className="col-9" style={{display:"flex", marginBottom:"15px", height:"50px", gap:"5px", overflowY:"hidden"}}>
                    {sub.map((sub) => {
                        console.log("sub",sub);
                        return(
                        <div style={{display:"flex",height:"30px", cursor:"pointer",marginTop:"10px", alignItems:"center", justifyContent:"center"}}>
                    <p style={{border:"none", padding:"0px 5px", borderRadius:"5px", background:"green", color:"white", }}>{sub.SUBCAT_NAME}</p>
                    </div>
                    )
                    })}                   
                </div>
            </div> */}
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-3 col-md-4">
                        <div className="seven">
                            <h4 className='cat_name'>Sorting For</h4>
                        </div>
                        <div className="bg-light p-4 mb-30">
                            <form>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="radio" className="custom-control-input" name='sorting' onChange={() => changeinAll()} defaultChecked id="price-all" />
                                    <label className="custom-control-label" for="price-all">All</label>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="radio" className="custom-control-input" value="price-1" onChange={() => changeinHlp()} name='sorting' id="price-1" style={{ background: "#ffffff" }} />
                                    <label className="custom-control-label" for="price-1" style={{ fontSize: "1rem" }}>{`High to Low (Price)`}</label>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="radio" className="custom-control-input" value="price-2" onChange={() => changeinLhp()} name='sorting' id="price-2" />
                                    <label className="custom-control-label" for="price-2">{`Low to High (Price)`}</label>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="radio" className="custom-control-input" onChange={() => changeinHls()} name='sorting' id="price-3" />
                                    <label className="custom-control-label" for="price-3">{`High to Low (Size)`}</label>
                                </div>
                                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                                    <input type="radio" className="custom-control-input" onChange={() => changeinLhs()} name='sorting' id="price-4" />
                                    <label className="custom-control-label" for="price-4">{`Low to High (Size)`}</label>
                                </div>

                            </form>
                        </div>
                    </div>

                    <div className="col-lg-9 col-md-8">
                        <div className="row pb-3">
                            <div className="col-12 pb-1">
                                <div className="d-flex align-items-center justify-content-between" >
                                    <form action="" style={{ width: "100%" }}>
                                        <div className="input-group" style={{ borderRadius: "0", marginTop: "-3px" }}>
                                            <input type="text" onChange={(e) => setSearch(e.target.value)} className="form-control col-12" placeholder="Search for products" />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-transparent text-primary">
                                                    <i className="fa fa-search"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>


                            {loading ? (
                                 <RotatingLines
                                 strokeColor="green"
                                 strokeWidth="3"
                                 animationDuration="0.75"
                                 width="50"
                                 visible={true}
                               />
                            ) : (
                                <>
                                {Slice.filter((value) => {
                                    if (search === "") {
                                        return value
                                    } else if (value.PRODUCT_NAME.toLowerCase().includes(search.toLowerCase())) {
                                        return value
                                    }
                                }).sort((a, b) => {
                                    if (all) {
                                        return a
                                    }
                                    else if (hlp) {
                                        return b.PRICE - a.PRICE
                                    } else if (lhp) {
                                        return a.PRICE - b.PRICE
                                    } else if (hls) {
                                        return a.SIZE - b.SIZE
                                    } else if (lhs) {
                                        return b.SIZE - a.SIZE
                                    }
                                }).map((products, index) => {
                                    return (
                                        <div key={index} className="col-lg-4 col-md-6 col-sm-6 pb-1 col-6" onClick={() => proDetails(products)}>
                                            <div className="product-item bg-light mb-4">
                                                <div className="product-img position-relative overflow-hidden">
                                                    <img className="img-fluid w-100" src={products.PRODUCT_IMAGE === null ? logo : products.PRODUCT_IMAGE} alt="" />
                                                    <div className="product-action">
                                                        <a className="btn btn-outline-dark btn-square"  ><i className="fa fa-shopping-cart"></i></a>
                                                        <a className="btn btn-outline-dark btn-square"  onClick={() => Wishlist(products)}><i className="far fa-heart"></i></a>
    
                                                    </div>
                                                </div>
                                                <div className="text-center py-4" style={{ borderBottom: "2px solid green", backgroundColor: "#ffffff", borderRadius: "6px" }}>
                                                    <a className="h6 text-decoration-none text-truncate" >{products.PRODUCT_NAME.slice(0, 12)}</a>
                                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                                        <h5>&#8377;{(products.PRICE) - Math.round(products.PRICE * products.DISCOUNT / 100)}</h5><h6 className="text-muted ml-2"><del><del>&#8377;{products.PRICE}</del></del></h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                </>
                            )}

                                                      
                            <div className="col-12 mb-30">
                                <button onClick={() => viewMore()} className='col-3 mb-30 button-browse' style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "40px" }}>
                                    View More...
                                </button>
                            </div>                   

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop