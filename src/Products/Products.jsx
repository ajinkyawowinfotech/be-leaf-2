import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Product_Details from '../pages/Product_Details'
import { fetchProduct } from '../redux/product'

const Products = () => {

    const { products } = useSelector((state) => state.product)
    // console.log("products",products)
    const [subCategoey, setSubCategory] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const subCategory = (product) => {
        axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/Get_Data", {
            
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "Get_SubCategoryList",
                "ID1": `${product.CAT_ID}`,
                "ID2": "",
                "ID3": "",
                "STATUS": "",
                "START_DATE": "",
                "END_DATE": "",
                "EXTRA1": "",
                "EXTRA2": "",
                "EXTRA3": "",
                "LANG_ID": ""
              
        }).then((res) => {
            console.log(res.data.DATA);
            setSubCategory(res.data.DATA)
            console.log("subCategoey",subCategoey);
            navigate('/cat-shop', {state:res.data.DATA})
        })
    }
    useEffect(() => {
        dispatch(fetchProduct())
    }, [products,])

    return (
        <div>
            <div className=" mt-2 container  pb-3">
                <div className="one">
                    <h1 className='cat_name'>Category</h1>
                </div>
                <div className="row">
                    {products.map((product,index) => {
                        return (


                            <div className="col-md-4 col-sm-6 col-4 p-2" key={index} onClick={() => subCategory(product)}>
                                <div className="card card-block p-2" style={{ borderRadius: "12px" }}>
                                    <img className='cate_img' src={product.CAT_IMAGE} alt="Photo of sunset" />
                                    <h3 className="card-title mt-3 mb-3">{product.CAT_NAME.slice(0,8)}</h3>

                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
            </div>
            )
}

            export default Products