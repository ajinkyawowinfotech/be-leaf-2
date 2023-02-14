import React, { useContext, useEffect } from 'react'
import camera from '../image/product-1.jpg'
import gift from '../image/gift.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useDispatch, useSelector } from 'react-redux'
import { bannerList } from '../redux/banner'
import Products from '../Products/Products'
import NewlaunchProducts from '../Products/NewlaunchProducts'
import RecommendedProducts from '../Products/RecommendedProducts'
import { Carousel } from 'react-responsive-carousel';
import { AuthContext } from '../AuthContext/AuthContext'
import AllProduct from '../Products/AllProduct'
import { animateScroll } from 'react-scroll'
import axios from 'axios'
import { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';
const Home = () => {
    const [bannerList1, setBannerList] = useState([])
    const { search } = useContext(AuthContext)
    const dispatch = useDispatch()
    const { banner } = useSelector((state) => state.banner)

    const navigate = useNavigate()
    const location = useLocation()

    const { loading, setLoading } = useContext(AuthContext)

    useEffect(() => {
        animateScroll.scrollToTop({
            duration: 0
        })
    }, [location.pathname])


    useEffect(() => {
        dispatch(bannerList())
        setLoading(true)
        axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/Get_Data",
            {
                START: 0,
                END: 100000,
                WORD: "",
                GET_DATA: "Get_Banner",
                ID1: "33",
                ID2: "",
                ID3: "",
                STATUS: "",
                START_DATE: "",
                END_DATE: "",
                EXTRA1: "",
                EXTRA2: "",
                EXTRA3: "",
                LANG_ID: "",
            }
        ).then((res) => {
            console.log(res.data);
            setBannerList(res.data.DATA)
            setLoading(false)
        })
    }, []);
    return (
        <div>
            {search === "" ?
                (
                    <>
                        <div className=" mb-3">
                            {loading ? (
                                <div style={{marginTop:"340px", marginLeft:"50%"}}>
                                <RotatingLines
                                    strokeColor="green"
                                    strokeWidth="3"
                                    animationDuration="0.75"
                                    width="50"
                                    visible={true}
                                />
                                </div>
                            ) : (
                            <Carousel infiniteLoop autoPlay useKeyboardArrows dynamicHeight>
                                {bannerList1.map((product) => {
                                    return (
                                        <img className=" w-100 h-100" src={product.BANNER_PHOTO} style={{ objectFit: "inherit" }} />)
                                })}
                            </Carousel>
                            )}



                        </div>
                        <Products />
                        <div className="mt-2 container  pb-3" >
                            <div className="one mb-30" style={{  marginTop: "35px"}}>
                                <h1 className='cat_name'>Buy New Gift Voucher</h1>
                            </div>
                            <div className="row px-xl-5" style={{ cursor: "pointer" }} onClick={() => navigate('/gift-voucher')}>
                                <div className="col-md-12" >
                                    <div className="product-offer mb-30" style={{ height: "300px" }}>
                                        <img className="img-fluid" src={gift} alt="" style={{ borderRadius: "10px" }} />
                                        <div className="offer-text">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NewlaunchProducts />
                        <RecommendedProducts />
                    </>
                ) : (
                    <>
                        <AllProduct />
                    </>
                )}


        </div>
    )
}

export default Home