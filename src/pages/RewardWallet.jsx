import React, { useEffect } from 'react'
import wallet from '../image/refer.webp'
import walletlogo from '../image/icwallet.png'
import axios from 'axios'
import { useState } from 'react'
import { useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'
import { animateScroll } from 'react-scroll'

const user_id = localStorage.getItem("user_id")
const RewardWallet = () => {
    const [walletAmt, setWalletAmt] = useState("")
    const [walletList, setWalletList] = useState([])
    const [newWalletList, setNewWalletList] = useState([])

    const location = useLocation()

    useEffect(() => {
        animateScroll.scrollToTop({
            duration: 0
        })
    }, [location.pathname])

    const getWalletAmt = () => {
        axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/Get_Data",
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "Get_Version",
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
            const data = res.data.DATA[0].WALLET_AMOUNT
            console.log("data", data);
            setWalletAmt(data)
        })
    }

    const walletHistory = () => {
        axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/Get_Data",
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "Get_WalletAmountList",
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
            const data = res.data.DATA
            console.log("data", data);
            setWalletList(res.data.DATA)
            setNewWalletList(walletList.reverse())

        })
    }
    useEffect(() => {
        getWalletAmt()
        walletHistory()
    }, [getWalletAmt])


    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>
                            <div className="two">
                                <h1>Reward Wallet
                                    <span></span>
                                </h1>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className='row px-xl-5'>
                <div className="col-lg-12">
                    <div className="imagediv">
                        <img src={wallet} alt="Image Not Found" className='walletImage img-fluid' />
                        <h4 style={{ fontWeight: "bold", color: "#158715" }}>Available Amount In Your Wallet</h4>
                        <div className="col-md-12 walletlogodiv bottom_shadow text-center " >
                            <div className='imagediv' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <img className='img-fluid' src={walletlogo} alt="" style={{ width: "1.7rem" }} />
                                <h5 className='walletAmount' >Rs.<span style={{ fontFamily: "sans-serif" }}>{walletAmt}</span></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-12">
                            <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>
                                <div className="two" >
                                    <h1 style={{ fontSize: "24px" }}>Wallet History
                                        <span></span>
                                    </h1>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <section id="cart-view" style={{ paddingBottom: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="cart-view-area" style={{border:"1px solid lightslategray"}}>
                                    <div className="cart-view-table aa-wishlist-table">
                                        <form action="">
                                            <div className="table-responsive">
                                                <table className="table" style={{marginBottom:"0"}}>
                                                    <thead>
                                                        <tr className='header-1'>
                                                            {/* <th></th> */}
                                                            <th style={{width: "17rem"}}>Date</th>
                                                            <th>Credit</th>
                                                            <th>Debit</th>
                                                            {/* <th>Balance</th> */}
                                                            {/* <th>Cart</th>
                                                            <th>Remove</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {newWalletList.map((transaction, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    {/* <td><a className="removse" ><fa className="fa fa-close"></fa></a></td> */}
                                                                    <td><a ><p>{transaction.REG_DATE}</p></a></td>

                                                                    <td >
                                                                        {transaction.STATUS === "Unpaid" ?
                                                                            (
                                                                                <a className="aa-cart-title" style={{ color: "green" }}>{transaction.WALLET_AMOUNT}</a>
                                                                            ) : <h5>-</h5>}
                                                                    </td>
                                                                    <td >
                                                                        {transaction.STATUS === "Paid" ?
                                                                            (
                                                                                <>
                                                                                    {
                                                                                        transaction.WALLET_AMOUNT === 0 ? (
                                                                                            <a className="aa-cart-title" style={{ color: "red" }}>{transaction.WALLET_AMOUNT}</a>

                                                                                        ) : (
                                                                                            <a className="aa-cart-title" style={{ color: "red" }}>&#8377;{transaction.WALLET_AMOUNT}</a>
                                                                                        )
                                                                                    }
                                                                                </>
                                                                            ) : <h5>-</h5>}
                                                                    </td>

                                                                    {/* <td>&#8377; {transaction.WALLET_AMOUNT === "Paid" ? (
                                                                        walletAmt - transaction.WALLET_AMOUNT
                                                                    ) : (
                                                                        walletAmt + transaction.WALLET_AMOUNT
                                                                    )}</td> */}

                                                                </tr>
                                                            )
                                                        })}

                                                        {/* walletAmt - transaction.WALLET_AMOUNT */}
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
            </div>
        </div>
    )
}

export default RewardWallet