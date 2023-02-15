import { Pattern } from '@mui/icons-material'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RotatingLines } from 'react-loader-spinner'
import { useLocation, useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { Base_Url } from '../base_url/Base_Url'

const Signup = () => {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [loading, setLoading] = useState(false)
    const { handleSubmit } = useForm()

    const navigate = useNavigate()

    const location = useLocation()

    useEffect(() => {
        animateScroll.scrollToTop({
            duration:0
        })
    },[location.pathname]) 


    const mobileNumber = (e) => {
        let value = e.target.value
        if (!Number(value)) {
            return setMobile("");
        }
        else if (value.length === 11) {
            return;
        }

        setMobile(e.target.value || " ")

    }


    const getOtp = () => {
        const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!name || !email || !mobile) {
            return alert("Please all field is mondatory")
        } else if (!pattern.test(email)) {
            return alert("Please Enter Valid Email")
        }else{
            setLoading(true)
        axios.post(`${Base_Url}/OldUser`,
        {
            "MOBILE_NO": `${mobile}`,
            "EXTRA1": "",
            "EXTRA2": "",
            "EXTRA3": "",
            "LANG_ID": ""
          }
        ).then((res) => {
            console.log(res.data);
            const newData = res.data
            console.log(newData.DATA[0].STATUS);
            if (newData.DATA[0].STATUS === "Already Register") {
                return alert("Already Register")
            } else {
                axios.post(`${Base_Url}/OTP_Mobile`,
                    {
                        "MOBILE_NO": `${mobile}`
                    }
                ).then((res) => {
                    console.log(res.data);
                    const data = res.data
                    setLoading(false)
                    navigate('/signupotp',{state:{data, mobile, name, email}})
                })
            }
            

        })

       
    }

    }

    return (
        <div>
            <div id="container" className="container signup-container col-10">
                <div className="row">
                    <div className="col align-items-center flex-col sign-up col-sm-6 signup-main-content">
                        <div className="form-wrapper align-items-center">
                            <div className="form sign-up" >
                                <h1 style={{ textAlign: "center" }}>Sign Up</h1>
                                <div className="input-group">
                                    <input type="text" placeholder="Full Name" name='name' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <i className='bx bx-mail-send'></i>
                                    <input type="email" placeholder="Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <i className='bx bxs-lock-alt'></i>
                                    <input type="text" placeholder="Mobile" name='mobile' onChange={(e) => mobileNumber(e)} value={mobile} />
                                </div>

                                <button onClick={handleSubmit(getOtp)} disabled={loading} className='col-sm-12'>
                                {loading && <span style={{ marginLeft: "-21px", position: "relative", left: "47px" }}>
                                                <RotatingLines
                                                strokeColor="green"
                                                strokeWidth="4"
                                                animationDuration="0.75"
                                                width="21"
                                                visible={true}
                                            /></span>} Get OTP
                                </button>
                                <p>
                                    <span>
                                        Already have an account?
                                    </span>
                                    <span> </span>
                                    <b onClick={() => navigate('/signin')} className="pointer">
                                        Sign In here
                                    </b>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup