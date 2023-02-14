import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../AuthContext/AuthContext'
import { fetchAllProduct } from '../redux/allProduct'
import logo from '../image/logo.png'
import { useNavigate } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'
import { Base_Url } from '../base_url/Base_Url'
import axios from 'axios'
import { fetchNewLaunchProduct } from '../redux/newLaunch'
import { fetchRecommendedProducts } from '../redux/recommended'


const user_id = localStorage.getItem("user_id")

const AllProduct = () => {
  const navigate = useNavigate()

  const { search } = useContext(AuthContext)


  const { allProduct } = useSelector((state) => state.allProduct)
  const { newLaunchProduct } = useSelector((state) => state.newLaunchProduct)
  const { recommendedProducts } = useSelector((state) => state.recommendedProduct)

  console.log("allProduct", newLaunchProduct, recommendedProducts);

  useEffect(() => {
    console.log("allProduct.PRODUCT_NAME", allProduct.PRODUCT_NAME);
    allProduct.forEach((value) => {
      console.log("value.PRODUCT_NAME", value.PRODUCT_NAME);
    })
  }, [])

  const proDetails = (product) => {
    navigate('/product-details', { state: product })


  }

  const wishlist = (product) => {
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


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllProduct())
    dispatch(fetchNewLaunchProduct())
    dispatch(fetchRecommendedProducts())
  }, [])
  return (
    <div style={{marginTop:"30px"}}>

      <div className="container  pb-3">

        <div className="row px-xl-5">
          {
            newLaunchProduct.filter((value) => {
              console.log("value.PRODUCT_NAME", value.PRODUCT_NAME);
              if (search === "") {
                return value
              } else if (value.PRODUCT_NAME.toLowerCase().includes(search.toLowerCase())) {
                return value
              }
            }).map((product) => {
              return (
                <div className="col-lg-3 col-md-4 col-sm-6 col-6 pb-1">
                  <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                      <img className="img-fluid w-100 " src={product.PRODUCT_IMAGE === null ? logo : product.PRODUCT_IMAGE} alt="" />
                      <div className="product-action">
                        <a className="btn btn-outline-dark btn-square btn-icon" onClick={() => proDetails(product)}><i className="fa fa-shopping-cart"></i></a>
                        <a className="btn btn-outline-dark btn-square btn-icon" onClick={() => wishlist(product)}><i className="far fa-heart"></i></a>
                      </div>
                    </div>
                    <div className="text-center py-4" style={{ borderBottom: "2px solid green", backgroundColor: "#ffffff", borderRadius: "6px" }}>
                      <a className="h6 text-decoration-none text-truncate" >{product.PRODUCT_NAME.slice(0, 12)}</a>
                      <div className="d-flex align-items-center justify-content-center mt-2">
                        <h5>&#8377;{(product.PRICE) - Math.round(product.PRICE * product.DISCOUNT / 100)}</h5><h6 className="text-muted ml-2"><del>&#8377;{product.PRICE}</del></h6>
                      </div>

                    </div>
                  </div>
                </div>
              )
            })
          }
          {
            recommendedProducts.filter((value) => {
              console.log("value.PRODUCT_NAME", value.PRODUCT_NAME);
              if (search === "") {
                return value
              } else if (value.PRODUCT_NAME.toLowerCase().includes(search.toLowerCase())) {
                return value
              }
            }).map((product,index) => {
              return (
                <div className="col-lg-3 col-md-4 col-sm-6 col-6 pb-1" key={index}>
                  <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                      <img className="img-fluid w-100 " src={product.PRODUCT_IMAGE === null ? logo : product.PRODUCT_IMAGE} alt="" />
                      <div className="product-action">
                        <a className="btn btn-outline-dark btn-square btn-icon" onClick={() => proDetails(product)}><i className="fa fa-shopping-cart"></i></a>
                        <a className="btn btn-outline-dark btn-square btn-icon" onClick={() => wishlist(product)}><i className="far fa-heart"></i></a>
                      </div>
                    </div>
                    <div className="text-center py-4" style={{ borderBottom: "2px solid green", backgroundColor: "#ffffff", borderRadius: "6px" }}>
                      <a className="h6 text-decoration-none text-truncate" >{product.PRODUCT_NAME.slice(0, 12)}</a>
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

      </div>

    </div>
  )
}

export default AllProduct