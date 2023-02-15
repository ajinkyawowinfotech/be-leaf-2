import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import shoes from '../image/cat-3.jpg'
import { useImage } from 'react-image';
import ReactImageFileToBase64 from "react-file-image-to-base64";
import { toast } from 'react-toastify';
import { animateScroll } from 'react-scroll';
import { useLocation } from 'react-router-dom';
import { decode, encode } from 'base-64';

const user_id = localStorage.getItem("user_id")
const Complaint = () => {
    const [complaint, setComplaint] = useState([])
    const [file, setFile] = useState("");
    const [discription, setDiscription] = useState("")
    const [complaintList, setComplaintList] = useState([])
    const [open, setOpen] = React.useState(false);
    const [addComplaint, setAddComplaint] = useState(false)
    const [Image, setImage] = useState("")
    const [newImage, setNewImage] = useState("")
    const [categoty, setCategory] = useState([])
    const [cat_name, setCat_Name] = useState("")
    const [modal, setModal] = useState("")
    const location = useLocation()
    useEffect(() => {
        animateScroll.scrollToTop({
            duration: 0
        })
    }, [location.pathname])

    useEffect(() => {
        axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/ComplaintMaster/1",
            {
                "START": "0",
                "END": "100000",
                "WORD": "",
                "GET_DATA": "",
                "EXTRA1": `${user_id}`,
                "EXTRA2": "",
                "EXTRA3": "",
                "LANG_ID": ""
            }
        ).then((res) => {
            setComplaint(res.data.DATA)
            setComplaintList(complaint.reverse())

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




    }, [complaint, complaintList])


    const complaintHandle1 = () => {
        setAddComplaint(true)
    }

    const complaintHandl2 = () => {
        setAddComplaint(false)
    }

    const handleOpen = (image) => {
        setImage(image.COMPLAINT_IMAGE)

        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        // bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

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

    const saveCat = (cat) => {
        console.log("cat", cat);
    }



    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }



    const sendComplaint = () => {
        if (cat_name === "") {
            return alert("Please select Complaint Type")
        }

        if (discription === "") {
            return alert("Please all field is mondatory")
        }
        axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/ComplaintMaster",
            {
                "COMPLAINT_ID": "",
                "USER_ID": `${user_id}`,
                "TITLE": `${cat_name}`,
                "COMPLAINT_DESCRIPTION": `${discription}`,
                "TASK": "ADD",
                "EXTRA1": "",
                "EXTRA2": "",
                "EXTRA3": "",
                "LANG_ID": "",
                "COMPLAINT_IMAGE": `${newImage.slice(23, 1000000000000)}`
            }
        ).then((res) => {
            console.log(res.data)
            toast.success("complaint send succesfully")
            setModal("modal")
            setCat_Name("")
            setDiscription("")
            setNewImage("")
        })


console.log("modal",modal);

    }





    console.log("newImage", newImage);
    // console.log("encode", base64.encode(newImage));

    return (
        <div>
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-8">
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent" }}>
                            <div className="two">
                                <h1 className='cat_name'>Complaints
                                    <span></span>
                                </h1>
                            </div>
                        </nav>
                    </div>
                    <div className="col-4" >
                        <nav className="breadcrumb bg-light mb-30" style={{ background: "transparent", float: "right", marginRight: "10px" }}>
                            <div className="two">
                                <button className='btn' style={{ color: "white", background: "#4c8f4b", borderRadius: "5px" }} data-toggle="modal" data-target="#exampleModalCenter" >ADD COMPLAINT</button>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {complaintList.length === 0 ? (
                <div className="row mb-30s">
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
                                            <div className="table-responsive">
                                                <table className="table">

                                                    <thead>
                                                        <tr className='header-1'>
                                                            <th></th>
                                                            <th>Image   </th>
                                                            <th>Date</th>
                                                            <th>Complaint ID</th>
                                                            <th>Complaint Type</th>
                                                            <th>Description</th>
                                                            <th>Status</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {complaintList.map((list, index) => {
                                                            return (

                                                                <tr key={index}>
                                                                    <td><a className="remove" ><fa className="fa fa-close"></fa></a></td>
                                                                    <td style={{ cursor: "pointer" }}><img onClick={() => handleOpen(list)} style={{ width: "1.5rem" }} src={list.COMPLAINT_IMAGE} alt="img" /></td>
                                                                    <td>{list.REG_DATE}</td>
                                                                    <td> {list.COMPLAINT_ID}</td>
                                                                    <td>{list.TITLE}</td>
                                                                    <td>{list.COMPLAINT_DESCRIPTION}</td>
                                                                    {list.STATUS === "Active" ? (
                                                                        <td style={{ color: "#FFA500" }}> {list.STATUS}</td>
                                                                    ) : (
                                                                        <td style={{ color: "#008000" }}> {list.STATUS}</td>
                                                                    )}

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



            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle"> Send Complaint</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <select onClick={(e) => setCat_Name(e.target.value)} className="form-select" aria-label="Default select example" style={{ height: "40px", width: "100%", marginTop: "1rem" }}>
                                <option selected >Select Complaint Type</option>
                                {categoty.map((i, index) => {
                                    return (

                                        <option key={index} >{i.CM_NAME}</option>

                                    )
                                })}
                            </select>
                            <textarea placeholder='Enter Message' value={discription} onChange={(e) => setDiscription(e.target.value)} rows="5" style={{ marginTop: "1rem", resize: "none", width: "100%" }}></textarea>
                            <label style={{ marginBottom: "-0.3rem", fontWeight: "bold", color: "rgb(76, 143, 75)" }}>Photo</label><br />
                            <input type="file" id='file' accept='image/*' style={{ marginTop: "0.5rem" }} onChange={(e) => newUpload(e)} />
                            <input type="button" data-dismiss={modal} onClick={() => sendComplaint()} value="Submit" style={{ marginTop: "1rem", width: "100%", fontSize: "22px", background: "rgb(76, 143, 75)", color: "white", border: "none", borderRadius: "5px" }} />
                        </div>
                        {/* <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Complaint