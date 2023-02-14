import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { animateScroll } from 'react-scroll'

const RefundPolicy = () => {
    const location = useLocation()

    useEffect(() => {
        animateScroll.scrollToTop({
            duration:0
        })
    },[location.pathname]) 
    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>
                            <div className="two ">
                                <h1 className='cat_name'>Refund Policy
                                    <span></span>
                                </h1>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <div className="col-12">
                            <h4 style={{ fontWeight: "bold" }}>Refund Policy</h4>
                        </div>
                        <div className="col-12">
                            <p>We have a 3-day return policy, which means you have 3 days after receiving your item to request a return.</p>
                            <p>To be eligible for a return, your item must be in the same condition that you received it. You'll also need the receipt or proof of purchase.</p>
                            <p>To start a return, you can contact us at beleafnsk@gmail.com. If your return is accepted, we'll send you a return shipping label, or else we will communicate as to through which service provider you need to send back to us, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.</p>
                            <p>You can always contact us for any return question at beleafnsk@gmail.com</p>
                            <p style={{ fontWeight: "600" }}>Damages and issues</p>
                            <p>Please inspect your order upon receipt and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>
                            <p style={{ fontWeight: "600" }}>Refund/Replacement:</p>
                            <p>Once we have received the returned product at our premises sent by you (only after the return request is accepted by us) We shall initiate the process to refund you the amount payable to you which shall be added to your Wallet on our website within 8 Days. Incase same products is available with us and you agree then we shall send a replacement for the same and no amount shall be refunded for the same.</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RefundPolicy