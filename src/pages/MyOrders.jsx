import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import shoes from '../image/cat-3.jpg'
import { fetchOrderList } from '../redux/myorder'


const MyOrders = () => {
    const navigate = useNavigate()

    const location = useLocation()

    const { orderList } = useSelector((state) => state.orderlist)
    console.log("orderList", orderList);
    const dispatch = useDispatch()

    const orderDetail = (item) => {
        navigate('/order-details', {state:{item}})
    }

    useEffect(() => {
        animateScroll.scrollToTop({
            duration:0
        })
    },[location.pathname])

    useEffect(() => {
        dispatch(fetchOrderList())
    }, [])
    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>

                            {/* <span className="breadcrumb-item active">Product Detail</span> */}
                            <div className="two">
                                <h1>My Orders
                                    <span></span>
                                </h1>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {orderList.length === 0 ? (
                <div className="row mb-30">
                    <div className="col-12">
                    <h3>No Data Found</h3>
                    </div>
                </div>
            ) : (
<section id="cart-view" style={{ paddingBottom: "20px", marginBottom: "66px" }}>

<div className="container">
    <div className="row">
        <div className="col-md-12">
            <div className="cart-view-area" style={{ border: "outset", borderRadius: "5px" }}>
                <div className="cart-view-table aa-wishlist-table">
                    <form action="">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className='header-1'>
                                        <th>Order Id</th>
                                        <th>Order Placed On</th>
                                        <th>Total Item</th>
                                        <th>Total</th>
                                        {/* <th>Payment Status</th> */}
                                        <th>Order Status</th>
                                        <th>View Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderList.map((item,index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.ORDER_ID}</td>
                                                <td>{item.REG_DATE}</td>
                                                <td >{item.TOTAL_QTY}</td>
                                                <td>&#8377; {item.TOTAL_PRICE}</td>
                                                {
                                                    item.STATUS === "Pending" ? (
                                                        <td style={{ color: "#F29339" }}>{item.STATUS}</td>

                                                    ) : (
                                                        <td style={{ color: "#28a745" }}>{item.STATUS}</td>

                                                    )
                                                    
                                                }
                                                <td style={{ textAlign: "center" }}> <a  onClick={() => orderDetail(item)} className="btn btn-warning checkout bg-warning" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                </svg></a></td>
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
</div >
</section >
            )} 
            
        </div >
    )
}

export default MyOrders