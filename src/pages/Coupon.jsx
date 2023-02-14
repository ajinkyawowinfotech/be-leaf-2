import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import moment from 'moment'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { AuthContext } from '../AuthContext/AuthContext'
import coupon from '../image/coupon.webp'
import ok from '../image/iccheck.png'


const user_id = localStorage.getItem("user_id")
const Coupon = () => {
    const [couponlist, setCouponlist] = useState([])
    const [date, setDate] = useState("")
    const [open, setOpen] = React.useState(false);

    const location = useLocation()

    useEffect(() => {
        animateScroll.scrollToTop({
            duration: 0
        })
    }, [location.pathname])

    const { setApplyCoupon } = useContext(AuthContext)

    const navigate = useNavigate()
    const applyCoupon = (coupon) => {
        navigate('/checkout')
        setApplyCoupon(coupon)

    }
    useEffect(() => {
        axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/Get_Data",
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "Get_CoupenCodeList",
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
            console.log(res.data.DATA);
            setCouponlist(res.data.DATA)
            const new1 = res.data.DATA
            const new2 = new1[0].REG_DATE
            console.log(new2);
            setDate(Date(new2))


        })
    }, [])

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


    const handleOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>

                            {/* <span className="breadcrumb-item active">Product Detail</span> */}
                            <div className="two">
                                <h1>Apply Coupon Code
                                    <span></span>
                                </h1>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className='container  pb-3'>
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-12" style={{ textAlign: "center" }}>
                            <img src={coupon} alt="image not found" style={{ width: "50%" }} />
                        </div>
                    </div>
                </div>
            </div>
            {couponlist.length === 0 ? (
                <div className="row mb-30" style={{marginTop:"30px"}}>
                    <div className="col-12 text-center">
                        <h4>No Data Found</h4>
                    </div>
                </div>
            ) : (
                <section id="cart-view" style={{ paddingBottom: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="cart-view-area" style={{ border: "outset" }}>
                                    <div className="cart-view-table aa-wishlist-table">
                                        <form action="">
                                            <div className="table-responsive" style={{ marginTop: "20px" }}>
                                                <table className="table">
                                                    <thead>
                                                        <tr className='header-1'>
                                                            <th>Coupon Code</th>
                                                            <th>Coupon Type</th>
                                                            <th>From Date</th>
                                                            <th>To Date</th>
                                                            <th>Description</th>
                                                            <th>Terms & Conditions</th>
                                                            <th>Apply</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {couponlist.map((i, index) => {
                                                            return (
                                                                <tr key={index} >
                                                                    <td><a className="remove" >{i.COUPEN_CODE}</a></td>
                                                                    <td>{i.FIXED_OR_PERCENTAGE}</td>
                                                                    <td >{i.FROM_DATE}</td>
                                                                    <td>{moment(date).format('DD MMM YYYY')}</td>
                                                                    <td>{i.DESCRIPTION.slice(0, 10)}</td>
                                                                    <td><a ><img style={{ width: "2rem", cursor: "pointer" }} src={ok} alt="img" onClick={handleOpen} /></a></td>
                                                                    <td><a className="aa-add-to-cart-btn hover" style={{ cursor: "pointer" }} onClick={() => applyCoupon(i)}>Apply</a></td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>

                                                </table>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style1, width: 400 }} style={{ borderRadius: "5px", background: "white" }}>
                    <h1>Terms & Conditions</h1>
                    <h3 className='coupon-h3' style={{ fontSize: "18px", marginLeft: "5px", fontFamily: "sans-serif" }}>This Coupon Is Available On Birthday Month Only</h3>
                    <div className="row">
                        <div className="col-12" >
                            <input type="button" value="OK" className='hover1' onClick={handleClose} style={{ float: "right" }} />
                        </div>
                    </div>


                </Box>
            </Modal>
        </div>
    )
}

export default Coupon