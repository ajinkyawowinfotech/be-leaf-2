import { Box, Button, Modal } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker';
import { useLocation, useNavigate } from 'react-router-dom';
import { animateScroll } from 'react-scroll';
import { toast } from 'react-toastify';


const user_id = localStorage.getItem("user_id")
const email = localStorage.getItem("email")
const user_name = localStorage.getItem("user_name")
const mobileNumber = localStorage.getItem("mobile")
const MyProfile = () => {
    const today = moment().subtract(21, 'year').calendar();
    const [birhdate, setBithDate] = useState("");
    // const [fullname, setFullname] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [district, setDistrict] = useState("")
    const [state, setState] = useState("")
    const [pincode, setpincode] = useState("")
    const [datausername, setDatausername] = useState("")
    const [male, setMale] = useState("")
    const [newDate, setNewDate] = useState(new Date())

    const [female, setFemale] = useState("")
    const [open, setOpen] = React.useState(false);

    const location = useLocation()

    useEffect(() => {
        animateScroll.scrollToTop({
            duration: 0
        })
    }, [location.pathname])

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate()



    useEffect(() => {
        if (user_name) {
            axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/UserRegistration",
                {
                    "USER_ID": "",
                    "USER_NAME": `${user_name}`,
                    "MOBILE_NO": `${mobileNumber}`,
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
                console.log("res.data.DATA1", res.data.DATA1);
                const data = res.data.DATA1;
                console.log("data[0].USER_NAME", data[0].DOB);
                setDatausername(data[0].USER_NAME)
                setEmail(data[0].EMAIL_ID)
                setMobile(mobileNumber)
                setBithDate(new Date(data[0].DOB))
                setState(data[0].STATE_NAME)
                setpincode(data[0].PINCODE)
                setDistrict(data[0].CITY_NAME)
                if (data[0].GENDER === "Male") {
                    return setMale("Male")
                } else if (data[0].GENDER === "Female") {
                    return setFemale("Female")
                }
            })
        }
    }, [])



    const updateButton = () => {
        const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!datausername || !birhdate || !district || !state || !pincode || !email) {
            return alert("All Field are Mondatory")
        }

        if (!male === "Male" || !female === "Female") {
            return alert("All Field are Mondatory")
        }else if(!pattern.test(email)){
            return alert("Please Enter Valid Email")
        }
        axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/UserRegistration",
            {
                "USER_ID": `${user_id}`,
                "USER_NAME": `${datausername}`,
                "MOBILE_NO": `${mobile}`,
                "ALTERNATE_MOBILE_NO": "",
                "EMAIL_ID": `${email}`,
                "GENDER": `${male} ${female}`,
                "DOB": `${moment(birhdate).format('DD MMM YYYY')}`,
                "STATE_ID": "",
                "CITY_ID": "",
                "ADDRESS": `${district} ${state}`,
                "PINCODE": `${pincode}`,
                "MAC_ADDRESS": "",
                "PROFILE_PHOTO": "",
                "TASK": "UPDATE",
                "EXTRA1": "",
                "EXTRA2": "",
                "EXTRA3": "",
                "LANG_ID": "",
                "PROFILE_PHOTO": ""
            }
        ).then((res) => {
            console.log("update", res.data);
            toast.success("Profile Updated Successfully")
            navigate('/')
        })


    }



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: '15px',
        pt: 2,
        px: 4,
        pb: 3,
    };



    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>
                            <div className="two">
                                <h1 className='cat_name'>My Profile
                                    <span></span>
                                </h1>
                            </div>
                            {/* <span className="breadcrumb-item active" style={{ fontWeight: "bold" }}>Checkout</span> */}
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-12">
                        <div className="seven">
                            <h4 className='cat_name'>Profile Details</h4>
                        </div>
                        <div className="bg-light p-30 ">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label>Full Name :</label>
                                    <input className="form-control" type="text" placeholder="Enter Full Name" value={datausername} onChange={(e) => setDatausername(e.target.value)} />
                                </div>

                                <div className="col-md-6 form-group">
                                    <label>Mobile No :</label>
                                    <input className="form-control" style={{ cursor: "not-allowed" }} name='mobile' type="text" placeholder="Enter Mobile No" value={mobile} disabled />
                                </div>
                                <div className="col-md-6 form-group">
                                        <label>Email :</label>
                                        <input className="form-control"  name='email' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                <div className="col-md-6 form-group">
                                   

                                    <label>Gender :</label>
                                    <div className="col-md-12 d-flex form-control">
                                        <div className='col-md-3'>
                                            <input checked={male} onChange={(e) => {
                                                setFemale("")
                                                setMale("Male")
                                            }} name='gender' style={{ cursor: "pointer" }} type="radio" value='male' id='male' />
                                            <label for="male" style={{ marginLeft: "7px", cursor: "pointer" }}>Male</label>
                                        </div>
                                        <div className='col-md-3' style={{ cursor: "pointer" }}>
                                            <input checked={female} onChange={(e) => {
                                                setMale("")
                                                setFemale("Female")
                                            }} name='gender' style={{ cursor: "pointer" }} type="radio" value='female' id='female' />
                                            <label for="female" style={{ marginLeft: "7px", cursor: "pointer" }}>Female</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Date Of Birth :</label>
                                    <DatePicker className="form-control" openCalendarOnFocus={new Date(today)} format='dd-MM-yyyy' value={birhdate} maxDate={new Date(today)} onChange={setBithDate} />
                                    {/* <input className="form-control" name='landmark' type="date" min={new Date(today)} placeholder="Enter Landmark" /> */}
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>District :</label>
                                    <input className="form-control" value={district} onChange={(e) => setDistrict(e.target.value)} name='district' type="text" placeholder="Enter District" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>State :</label>
                                    <input className="form-control" value={state} onChange={(e) => setState(e.target.value)} name='state' type="text" placeholder="Enter State" />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Pincode :</label>
                                    <input className="form-control" value={pincode} onChange={(e) => setpincode(e.target.value)} type="text" placeholder="Enter Pincode" />
                                </div>

                            </div>
                        </div>


                    </div>

                </div>
                <div className="row mb=30" style={{ marginBottom: "30px" }}>
                    <div className="col-md-12 ">
                        <div className="text-center ">
                            <button className='btn btn-success' style={{ background: "#56b354", borderRadius: "5px" }} onClick={() => updateButton()}>Update</button>
                            <button type='button' className='btn btn-danger' style={{ marginLeft: "10px", background: "#c54a4a", borderRadius: "5px" }} onClick={handleOpen}>Delete Account</button>
                        </div>
                    </div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>
                            <h2 id="parent-modal-title" style={{ fontSize: "20px", textAlign: "center" }}>Delete Account Request</h2>
                            <p id="parent-modal-description">
                                To delete your account kindly raise account delete request by sending mail on following email <span style={{ color: '#337233' }} >beleafapplication@gmail.com </span>
                                we will process your request once we receive you account delete request email.
                            </p>
                            <button className='btn' style={{ float: "right", color: "white", background: "rgb(81 169 65)", width: "100px", borderRadius: "5px" }} onClick={() => handleClose()}>OK</button>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default MyProfile