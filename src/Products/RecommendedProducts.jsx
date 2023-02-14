import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import camera from '../image/product-1.jpg'
import { fetchRecommendedProducts } from '../redux/recommended'
import logo from '../image/logo.png'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { AuthContext } from '../AuthContext/AuthContext'
import axios from 'axios'
import { Base_Url } from '../base_url/Base_Url'



const user_id = localStorage.getItem("user_id")

const RecommendedProducts = () => {
    const navigate = useNavigate()

    const {search} = useContext(AuthContext)
    const dispatch = useDispatch()
    const { recommendedProducts } = useSelector((state) => state.recommendedProduct)
    console.log("recommendedProducts", recommendedProducts);

    const viewProduct = (e) => {
        navigate('/shop', {state:recommendedProducts})
    }

    const proDetails = (product) => {
        navigate('/product-details', {state:product})
    }

    const wishlist = (product) => {
        // navigate('/wishlist')
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
            console.log(res.data);
        })
    }


    useEffect(() => {
        dispatch(fetchRecommendedProducts())
    }, [])
    return (
        <div>
            <div className="container pt-5 pb-3">
                <div className="one mb-30">
                    <h1 className='cat_name'>Recommended Products</h1>
                </div>
                <div className="row px-xl-5">
                    {
                        recommendedProducts.slice(0, 8).map((product,index) => {
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-6 col-6 pb-1" key={index}>
                                    <div className="product-item bg-light mb-4" onClick={() => proDetails(product)}>
                                        <div className="product-img position-relative overflow-hidden">
                                            <img className="img-fluid w-100" src={product.PRODUCT_IMAGE === null ? logo : product.PRODUCT_IMAGE} alt="" />
                                            <div className="product-action">
                                                <a className="btn btn-outline-dark btn-square btn-icon" onClick={() => proDetails(product)}><i className="fa fa-shopping-cart"></i></a>
                                                <a className="btn btn-outline-dark btn-square btn-icon" onClick={() => wishlist(product)}><i className="far fa-heart"></i></a>
                                            </div>
                                        </div>
                                        <div className="text-center py-4" style={{ borderBottom: "2px solid green", backgroundColor: "#ffffff", borderRadius: "6px" }}>
                                            <a className="h6 text-decoration-none text-truncate" >{product.PRODUCT_NAME.slice(0,13)}</a>
                                            <div className="d-flex align-items-center justify-content-center mt-2">
                                                <h5>&#8377;{(product.PRICE) - Math.round(product.PRICE * product.DISCOUNT / 100)}</h5><h6 className="text-muted ml-2"><del>&#8377;{product.PRICE}</del></h6>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
                <button onClick={() => viewProduct()} className=' mb-30 button-browse' style={{display:"flex", alignItems:"center", justifyContent:"center", height:"40px"}}>
                   Browse All Product <ArrowRightAltIcon />
                </button>
            </div>
        </div>
    )
}

export default RecommendedProducts