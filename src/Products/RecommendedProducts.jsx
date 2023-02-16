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
import { fetchWishlist } from '../redux/wishlist'
import { useState } from 'react'



const user_id = localStorage.getItem("user_id")

const RecommendedProducts = () => {
    const navigate = useNavigate()
    const [wishlist, setWishlist] = useState([])

    const {search} = useContext(AuthContext)
    const dispatch = useDispatch()
    const { recommendedProducts } = useSelector((state) => state.recommendedProduct)
    // console.log("recommendedProducts", recommendedProducts);

    const viewProduct = (e) => {
        navigate('/shop', {state:recommendedProducts})
    }

    const proDetails = (product) => {
        navigate('/product-details', {state:product})
    }

    const wishlist1 = (product) => {
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
    // const {wishlist} = useSelector((state) => state.wishlist)

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
    },[wishlist])


    useEffect(() => {
        dispatch(fetchRecommendedProducts())
        dispatch(fetchWishlist())

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
                                 <div className="product-item bg-light mb-4">
                                 {user_id && <> {wishlist.map((i) => {
                                           
                                           return(
                                               <>
                                              {i.PRODUCT_ID === product.PRODUCT_ID && <a className="" style={{cursor:"pointer"}}>
                                                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16" style={{color:"red",  cursor:"pointer"}} onClick={() => wishlist1(product)}>
                                                       <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                                   </svg>
                                                   </a>}
                                                   {i.PRODUCT_ID !== product.PRODUCT_ID && <a className="" style={{cursor:"pointer"}}>
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16" style={{color:"red",  cursor:"pointer"}} onClick={() => wishlist1(product)}>
                                                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                                </svg>
                                                </a>  }
                                             
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
                                     <div className="product-img position-relative overflow-hidden" style={{cursor:"pointer"}} onClick={() => proDetails(product)}>
                                         <img className="img-fluid w-100 " src={product.PRODUCT_IMAGE === null ? logo : product.PRODUCT_IMAGE} alt="" />
                                        
                                     </div>
                                     <div className="text-center py-4" style={{ borderBottom: "2px solid green", backgroundColor: "#ffffff", borderRadius: "6px", cursor:"pointer" }} onClick={() => proDetails(product)}>
                                         <a className="h6 text-decoration-none text-truncate" >{product.PRODUCT_NAME.slice(0, 12)}</a>
                                         <div className="d-flex align-items-center justify-content-center mt-2">
                                         <h5>&#8377;{(product.PRICE) - (product.DISCOUNT)}</h5><h6 className="text-muted ml-2"><del>&#8377;{product.PRICE}</del></h6>
                                         </div>

                                     </div>
                                     <div className="product-action" style={{cursor:"pointer"}} onClick={() => proDetails(product)}>
                                             <a className=""  ><i className="fa fa-shopping-cart"></i></a>
                                            
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