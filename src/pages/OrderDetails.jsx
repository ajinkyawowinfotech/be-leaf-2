import { Box, Modal } from '@mui/material'
import { upload } from '@testing-library/user-event/dist/upload'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { toast } from 'react-toastify'
import { Base_Url } from '../base_url/Base_Url'
import shoes from '../image/cat-3.jpg'


const OrderDetails = () => {
  const navigate = useNavigate()
  const [product, setProduct] = useState([])
  const [total, setTotal] = useState("")
  const [discription, setDiscription] = useState("")
  const [totalproduct, setTotalProduct] = useState("")
  const [saveAmt, setSaveAmt] = useState("")
  const [query, setQuery] = useState(false)
  const [categoty, setCategory] = useState([])
  const [savecat, setSavecat] = useState("")
  const [newImage, setNewImage] = useState("")



  const location = useLocation()
  console.log(location.state);

  const newUpload = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    setNewImage(base64)
}

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            resolve(fileReader.result)
        };

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


  useEffect(() => {
    animateScroll.scrollToTop({
      duration:0
    })
  },[location.pathname])

  let new4 = 0
  let new5 = 0
  let new7 = 0


  useEffect(() => {

    axios.post(`${Base_Url}/Get_Data`,
    {
      
        "START": "0",
        "END": "100000",
        "WORD": "",
        "GET_DATA": "Get_OrderDetails",
        "ID1": `${location.state.item.USER_ID}`,
        "ID2": `${location.state.item.ORDER_ID}`,
        "ID3": "",
        "STATUS": "",
        "START_DATE": "",
        "END_DATE": "",
        "EXTRA1": "",
        "EXTRA2": "",
        "EXTRA3": "",
        "LANG_ID": ""
      
    }).then((res) => {
      console.log("res.data",res.data.DATA);
      setProduct(res.data.DATA)
      res.data.DATA.forEach((i) => {
        const new3 = i.PRICE * i.QTY
        const new6 = i.QTY
        const new8 =((i.PRICE * i.QTY) * i.DISCOUNT/100)
        new4 += new3
        new5 += new6
        new7 += new8
        console.log(new4);
        setTotal(new4)
        setTotalProduct(new5)
        setSaveAmt(new7)

      })
    })

    axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/Get_Data",
    {
     "START": "0",
     "END": "100000",
     "WORD": "",
     "GET_DATA": "Get_ComplaintCategory",
     "ID1": "",
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
        setCategory(res.data.DATA)
    })

  }, [product])


  const sendQuery = () => {
    axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/OrderHelp",
    {
      "HELP_ORDER_ID": "",
      "ORDER_ID": `${location.state.item.USER_ID}`,
      "USER_ID": `${location.state.item.ORDER_ID}`  ,
      "COMPLAINT_TYPE": `${savecat}`,
      "DESCRIPTION": `${discription}`,
      "STATUS": "",
      "TASK": "ADD",
      "EXTRA1": "",
      "LANG_ID": "",
      "ORDER_HELP_IMAGE": ""
    }
    ).then((res) => {
      console.log(res.data);
      toast.success("complaint send succesfully")
      complaintHandl2()
      setDiscription("")
      setSavecat("")
      setNewImage("")
      
    })
  }

 
  
  const complaintHandle1 = () => {
    setQuery(true)
}

const complaintHandl2 = () => {
    setQuery(false)
}

  return (
    <div>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>

              <div className="two">
                <h1>Order Id: {location.state.item.ORDER_ID}
                  <span></span>
                </h1>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="e-store main">
        <div className="prod-container container ">

          <div id="product-pop-up" >
            <div className="product-page product-pop-up">
              <div className="row">

                <div className="col-md-12 col-sm-12 col-xs-12">

                  <div className="price-availability-block clearfix bg-white">
                    <div className="specification" style={{ marginBottom: "2.75rem" }}>
                      <div className="d-flex justify-content-between">
                        <div className='col-6'>

                          <p className="mb-0">Order Date :<span style={{ color: "black" }}>{location.state.item.ORDER_DATE}</span></p>
                          {location.state.item.STATUS === "Pending" ? (
                            <p>Order Status : <span style={{ color: "rgb(242, 147, 57)" }}> {location.state.item.STATUS} </span></p>
                          ) : (
                            <p>Order Status : <span style={{ color: "#28a745" }}> {location.state.item.STATUS} </span></p>
                          )}
                          <p style={{ marginTop: "-20px" }}>Order For :<span style={{ color: "black" }}> {location.state.item.ORDER_FOR}</span></p>
                          <p style={{ marginTop: "-20px" }}>Payment Method :<span style={{ color: "black" }}>{location.state.item.PAYMENT_METHOD}</span></p>
                        </div>
                        <div className='col-6' style={{ width: "40%" }}>
                          <h4>Delivery Address</h4>
                          <p>{location.state.item.ORDER_ADDRESS}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bill table-responsive">
                      <table className="table table-bordered pb-0 mb-0">
                        <thead>
                          <tr>
                            <th scope="col" style={{ borderBottom: "1px solid #939ba3" }}>Product Code</th>
                            <th scope="col" style={{ borderBottom: "1px solid #939ba3" }}>Image</th>
                            <th scope="col" style={{ borderBottom: "1px solid #939ba3" }}>Name</th>
                            <th scope="col" style={{ borderBottom: "1px solid #939ba3" }}>Qty</th>
                            <th scope="col" style={{ borderBottom: "1px solid #939ba3" }}>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                            {product.map((item,index) => {
                              return(
                                <tr key={index}>
                            <th style={{ borderBottom: "1px solid #b3aeae" }} scope="row">{item.PRODUCT_CODE}</th>
                            <td style={{ borderBottom: "1px solid #b3aeae" }}><img className='img-wishlist' src={item.PRODUCT_IMAGE} alt="" /></td>
                            <td style={{ borderBottom: "1px solid #b3aeae" }}>{item.PRODUCT_NAME}</td>
                            <td style={{ borderBottom: "1px solid #b3aeae" }}>{item.QTY}</td>
                            <td style={{ borderBottom: "1px solid #b3aeae" }}>{item.PRICE * item.QTY}</td>
                          </tr>
                              )
                            })}
                          

                          {/* <tr>
                            <th scope="row">101</th>
                            <td><img className='img-wishlist' src={shoes} alt="" /></td>
                            <td>Shoes</td>
                            <td >5</td>
                            <td>5000</td>
                          </tr> */}

                          <tr className="table-active">
                            <td colspan="4" style={{ textAlign: "left" }}>Total Price</td>
                            <td>&#8377; {total}</td>

                          </tr>
                          <tr className="table-active">
                            <td colspan="4" style={{ textAlign: "left" }}>Total Product </td>
                            <td>{product.length}</td>

                          </tr>
                          <tr className="table-active">
                            <td colspan="4" style={{ textAlign: "left" }}>Shipping Charges </td>
                            <td>&#8377; {location.state.item.SHIPPING_CHARGES}</td>

                          </tr>
                          <tr className="table-active">
                            <td colspan="4" style={{ textAlign: "left" }}>You Save</td>

                            <td>&#8377; {saveAmt}</td>


                          </tr>
                          <tr className="table-active">
                            <td colspan="4" style={{ textAlign: "left" }}>Applied Coupon Discount </td>
                            <td>&#8377; {location.state.item.COUPEN_AMOUNT}</td>

                          </tr>
                          <tr className="table-active">
                            <td colspan="4" style={{ textAlign: "left" }}>Used Wallet Amount</td>
                            <td>&#8377; {location.state.item.WALLET_AMOUNT}</td>

                          </tr>
                          <tr className="text-gray" style={{ background: "#c5bbbb", color: "#524e4e", fontWeight: "bold" }}>
                            <td colspan="4" style={{ textAlign: "left" }}>Grand Total </td>
                            <td>&#8377; {total + location.state.item.SHIPPING_CHARGES - saveAmt - location.state.item.WALLET_AMOUNT - location.state.item.COUPEN_AMOUNT}</td>

                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="product-page-cart text-right" style={{ marginTop: "1.75rem", marginBottom: "1.75rem" }}>
                    <button onClick={() => navigate('/my-order')} className="add-more px-3 view-cart btn btn-dark " style={{ background: "#4c4c50" }} >Back</button>
                    <button onClick={() => navigate('/')} className="add-more px-3 view-cart btn btn-info " style={{ marginLeft: "10px", background: "#54c3d9" }}>More Shopping</button>
                  </div>
                  <div className="product-page-cart" style={{ marginTop: "1.75rem", marginBottom: "1.75rem", textAlign: "center", borderBottom: "1px solid black", borderTop: "1px solid black", paddingTop: "10px", paddingBottom: "4px" }}>
                    <h4 style={{cursor:"pointer"}} onClick={complaintHandle1}>We Ship Through Indian Speed Post Only</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Modal
                open={query}
                onClose={complaintHandl2}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style1, width: 400 }} style={{ borderRadius: "5px" }}>
                    <h1>Send Your Query</h1>
                    <div style={{display:"flex",flexDirection:"column", marginTop:"1rem"}}>
                    <label style={{ marginBottom: "-0.3rem", fontWeight: "bold", color: "rgb(76, 143, 75)" }}>Order Id</label>
                    <input type="text" value={location.state.item.ORDER_ID} disabled  style={{ marginTop: "0.5rem", cursor:"not-allowed" }}   />
                    </div>
                   
                    <select onChange={(e) => setSavecat(e.target.value)} className="form-select" aria-label="Default select example" style={{ height: "40px", width: "100%", marginTop: "1rem" }}>
                        <option selected>Select Complaint Type</option>
                        {categoty.map((i) => {
                          return(
                            <option value="1">{i.CM_NAME}</option>
                          )
                        })}
                                            
                    </select>
                    <textarea placeholder='Enter Message' value={discription} onChange={(e) => setDiscription(e.target.value)}   cols="42" rows="5" style={{ marginTop: "1rem", resize: "none" }}></textarea>
                    <label style={{ marginBottom: "-0.3rem", fontWeight: "bold", color: "rgb(76, 143, 75)" }}>Photo</label>
                    <input type="file" id='file' accept='image/*' style={{ marginTop: "0.5rem" }}  onChange={(e) => upload(e)} />
                    <input type="button"  value="Submit" style={{ marginTop: "1rem", width: "100%", fontSize: "22px", background: "rgb(76, 143, 75)", color: "white", border: "none", borderRadius: "5px" }} onClick={sendQuery} />
                </Box>
            </Modal>

    </div>
  )
}

export default OrderDetails