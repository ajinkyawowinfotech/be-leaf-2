import React, { useState } from 'react'
import OTPInput, { ResendOTP } from "otp-input-react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Base_Url } from '../base_url/Base_Url';
import { animateScroll } from 'react-scroll';
import { useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useForm } from 'react-hook-form';


const SigninOtp = () => {
    const [OTP, setOTP] = useState("");
    const [resendOtp, setResendOtp] = useState("")
    const location = useLocation()
    const [loading, setLoading] = useState(false)

    const { handleSubmit } = useForm()

    const navigate = useNavigate()


    useEffect(() => {
        animateScroll.scrollToTop({
            duration:0
        })
    },[location.pathname]) 

    const otp = location.state.data.DATA[0];
    console.log("otp.Master_Otp", otp.User_Otp);
    const mobile = location.state.mobile;
    const name = location.state.name;



    const singIn = () => {
        if(!OTP){
            return alert("Please Enter Valid OTP")
        }else {
            setLoading(true)
     
        if (OTP == otp.User_Otp || OTP == otp.Master_Otp || OTP == resendOtp) {
            return axios.post(`${Base_Url}/UserRegistration`,
                {
                    "USER_ID": "",
                    "USER_NAME": `${name}`,
                    "MOBILE_NO": `${mobile}`,
                    "ALTERNATE_MOBILE_NO": "",
                    "EMAIL_ID": "",
                    "GENDER": "",
                    "DOB": "",
                    "STATE_ID": "",
                    "CITY_ID": "",
                    "ADDRESS": "",
                    "PINCODE": "",
                    "MAC_ADDRESS": "",
                    "PROFILE_PHOTO": "",
                    "TASK": "ADD",
                    "EXTRA1": "",
                    "EXTRA2": "",
                    "EXTRA3": "",
                    "LANG_ID": ""
                }
            ).then((res) => {
                console.log("res.data.DATA", res.data.DATA1);
                console.log("res.data.DATA1", res.data.DATA1[0].USER_NAME);
                const data = res.data.DATA1[0];
                localStorage.setItem("user_name", data.USER_NAME);
                localStorage.setItem("user_id", data.USER_ID);
                localStorage.setItem("email", data.EMAIL_ID);
                localStorage.setItem("mobile", data.MOBILE_NO);
                setLoading(false)
                navigate('/')
                    window.location.reload()


            })
        } else {
            alert("Please Enter Valid OTP")
            setOTP("")
        }
    }
    }

    const resend = () => {
        axios.post(`${Base_Url}/OTP_Mobile`,
        {
            "MOBILE_NO": `${mobile}`
        }
    ).then((res) => {
        console.log(res.data.DATA[0].User_Otp);
        const otpData = res.data.DATA[0].User_Otp;
        setResendOtp(otpData)
        })
    }

    return (
        <div>
            <div id="container" className="container signup-container col-10">
                <div className="row">
                    <div className="col align-items-center flex-col sign-up col-sm-6 signup-main-content col-12">
                        <div className="form-wrapper align-items-center">
                            <div className="form sign-up otpp otp" >
                                <h1 style={{ textAlign: "center" }}>Enter OTP</h1>
                                <p style={{ textAlign: "center" }}>Check your Mobile for OTP</p>
                                <p style={{ textAlign: "center", fontWeight: "bold" }}>+91 {mobile}</p>
                                <OTPInput value={OTP} onChange={setOTP} style={{ gap: "20px" }} autoFocus OTPLength={4} otpType="number" disabled={false} />
                                <button className='col-sm-12' disabled={loading} onClick={handleSubmit(singIn)}>
                                    {loading && <span style={{ marginLeft: "-21px", position: "relative", left: "42px" }}>
                                                        <RotatingLines
                                                            strokeColor="green"
                                                            strokeWidth="4"
                                                            animationDuration="0.75"
                                                            width="21"
                                                            visible={true}
                                                        /></span>} Sign In
                                </button>
                                <p>
                                    <span>
                                        <ResendOTP className="resend" onResendClick={() => console.log("Resend clicked")} />
                                    </span>

                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default SigninOtp