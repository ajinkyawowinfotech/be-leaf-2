import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { animateScroll } from 'react-scroll'
import { Base_Url } from '../base_url/Base_Url'
import { RotatingLines } from 'react-loader-spinner'


const Signin = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [loading, setLoading] = useState(false)


    const location = useLocation()

    const { handleSubmit } = useForm()


    useEffect(() => {
        animateScroll.scrollToTop({
            duration:0
        })
    },[location.pathname]) 

    const mobileNumber = (e) => {
        const value = e.target.value
        if (!Number(value)) {
            return setMobile("")
        } else if (value.length === 11) {
            return;
        }

        setMobile(value)
    }

    const getOtp = () => {
        if (!name || !mobile) {
            return alert("all Field is Mondatory")
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
                return axios.post(`${Base_Url}/OTP_Mobile`,
                {
                    "MOBILE_NO": `${mobile}`
                }
            ).then((res) => {
                console.log(res.data);
                const data = res.data
                setLoading(false)
                navigate('/signinotp', { state: {data, mobile, name} })

            })
            }
            else {
                return alert("Please Sign Up First"),
                    navigate('/signup')
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
                                <h1 style={{ textAlign: "center" }}>Sign In</h1>
                                <div className="input-group">
                                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="input-group">
                                    <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => mobileNumber(e)} requireds />
                                </div>

                                <button onClick={handleSubmit( getOtp)} disabled={loading} className='col-sm-12'>
                                {loading && <span style={{ marginLeft: "-21px", position: "relative", left: "40px" }}>
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
                                    <b onClick={() => navigate('/signup')} className="pointer">
                                        Sign Up here
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

export default Signin