import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { AuthContext } from '../AuthContext/AuthContext'
import { Base_Url } from '../base_url/Base_Url'
import logo from '../image/logo.png'
import { fetchWishlist } from '../redux/wishlist'


const user_id = localStorage.getItem("user_id")

const Cat_Shop = () => {
    const [product, setProduct] = useState([])
    const [all, setAll] = useState(false)
    const [hlp, setHlp] = useState(false)
    const [lhp, setLhp] = useState(false)
    const [hls, setHls] = useState(false)
    const [lhs, setLhs] = useState(false)
    const [search, setSearch] = useState("")
    const [noElement, setNoelement] = useState(9)
    const [catId, setCAtId] = useState([])
    const [alldata, setAlldata] = useState([])
    const [sub, setSub] = useState([])
    const loaction = useLocation()
    const [background, setBackground] = useState()
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        animateScroll.scrollToTop({
            duration: 0
        })
    }, [loaction.pathname])

    const { catShop } = useContext(AuthContext)
    console.log("catShop", catShop)
    console.log("location.state", loaction.state)

    const cats = catId[0];
    // console.log("cats", cats);
    const catList = () => {
        // console.log("cats2", cats);
        console.log("location.state", loaction.state || catShop)

        axios.post(`${Base_Url}/Get_Data`,
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "Get_ProductsBySubCatId",
                "ID1": `${catId[0]}`,
                "ID2": "",
                "ID3": "",
                "STATUS": "",
                "START_DATE": "",
                "END_DATE": "",
                "EXTRA1": "ALL",
                "EXTRA2": "",
                "EXTRA3": "",
                "LANG_ID": ""
            }).then((res) => {
                // console.log(res.data.DATA);
                setProduct(res.data.DATA)
            })
    }

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchWishlist())

    }, [])

    const subCategoryProduct = (product) => {
        console.log("product.SUBCAT_ID", product);

        axios.post(`${Base_Url}/Get_Data`,
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "Get_ProductsBySubCatId",
                "ID1": `${product.SUBCAT_ID}`,
                "ID2": "",
                "ID3": "",
                "STATUS": "",
                "START_DATE": "",
                "END_DATE": "",
                "EXTRA1": "ALL",
                "EXTRA2": "",
                "EXTRA3": "",
                "LANG_ID": ""
            }).then((res) => {
                console.log(res.data.DATA);
                setProduct(res.data.DATA)
                console.log("product", product);

            })
    }


    useEffect(() => {
        const data = loaction.state.forEach((i) => {
            catId.push(i.SUBCAT_ID)
            setAlldata(catId)


        })

        catList()

        setSub(loaction.state)
    }, [sub, catShop])

    // const { wishlist } = useSelector((state) => state.wishlist)


    // const Slice = product.slice(0, noElement)
    const navigate = useNavigate()

    const viewMore = (e) => {
        setNoelement(noElement + noElement)
    }

    const proDetails = (product) => {
        navigate('/product-details', { state: product })
    }

    useEffect(() => {
        axios.post(`${Base_Url}/Get_Data`,
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "Get_MyProductWishList",
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
            console.log(res.data);
            setWishlist(res.data.DATA)
        })
    }, [wishlist])

    const wishlist1 = (product) => {
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
            <div className="row container">
                <div className="col-12 sub_cat" >
                    <div>
                        <ul style={{ display: "flex", height: "30px", cursor: "pointer", marginTop: "10px", alignItems: "center", justifyContent: "center", gap: "5px" }} >
                            {sub ? (
                                <>
                                    {sub.map((sub, index) => {
                                        return (
                                            <a className="nav-item nav-link newOne" key={index} onClick={() => { subCategoryProduct(sub) }} data-toggle="tab" href="#tab-pane-1" style={{ background: "transparent", color: "black", borderRadius: "10px", borderBottom: "1px solid green" }}>{sub.SUBCAT_NAME}</a>
                                        )
                                    })}
                                </>
                            ) : (
                                <>
                                    {catShop.map((sub, index) => {
                                        return (

                                            <li onClick={() => { subCategoryProduct(sub) }} key={index} className='clickEvent1' style={{ border: "none", padding: "0px 10px", borderRadius: "5px", color: "white" }}>{sub.SUBCAT_NAME}</li>
                                        )
                                    })}
                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </div>
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
                            {product.filter((value) => {
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
                            }).map((product, index) => {
                                return (
                                    <div className="col-lg-3 col-md-4 col-sm-6 col-6 pb-1" key={index}>
                                        <div className="product-item bg-light mb-4">
                                            {user_id && <>{wishlist.map((i) => {

                                                return (
                                                    <>
                                                        {i.PRODUCT_ID === product.PRODUCT_ID && <a className="" style={{ cursor: "pointer" }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16" style={{ color: "red",  cursor:"pointer" }} onClick={() => wishlist1(product)}>
                                                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                                            </svg>
                                                        </a>}
                                                        {i.PRODUCT_ID !== product.PRODUCT_ID && <a className="" style={{ cursor: "pointer" }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" style={{ color: "red",  cursor:"pointer" }} onClick={() => wishlist1(product)}>
                                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                            </svg>
                                                        </a>}

                                                    </>
                                                )
                                            })}
                                            </>}

                                            {user_id && <>
                                                <a className="" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" style={{ color: "red",  cursor:"pointer" }} onClick={() => wishlist1(product)}>
                                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                    </svg>
                                                </a>
                                            </>}
                                            {/* <a className="" ><i className="far fa-heart"></i></a> */}
                                            <div className="product-img position-relative overflow-hidden" style={{ cursor: "pointer" }} onClick={() => proDetails(product)}>
                                                <img className="img-fluid w-100 " src={product.PRODUCT_IMAGE === null ? logo : product.PRODUCT_IMAGE} alt="" />

                                            </div>
                                            <div className="text-center py-4" style={{ borderBottom: "2px solid green", backgroundColor: "#ffffff", borderRadius: "6px", cursor: "pointer" }} onClick={() => proDetails(product)}>
                                                <a className="h6 text-decoration-none text-truncate" >{product.PRODUCT_NAME.slice(0, 12)}</a>
                                                <div className="d-flex align-items-center justify-content-center mt-2">
                                                    <h5>&#8377;{(product.PRICE) - (product.DISCOUNT)}</h5><h6 className="text-muted ml-2"><del>&#8377;{product.PRICE}</del></h6>
                                                </div>

                                            </div>
                                            <div className="product-action" style={{ cursor: "pointer" }} onClick={() => proDetails(product)}>
                                                <a className=""  ><i className="fa fa-shopping-cart"></i></a>

                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                            {/* <div className="col-12 mb-30">
                                <button onClick={() => viewMore()} className='col-3 mb-30 button-browse' style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "40px" }}>
                                    View More...
                                </button>
                            </div>                    */}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cat_Shop