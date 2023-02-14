import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../image/logo.png'
import logo2 from '../image/Be-leaf.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../redux/product'
import { AuthContext } from '../AuthContext/AuthContext'
import axios from 'axios'
import Carousel from 'react-material-ui-carousel'

import { fetchWishlist } from '../redux/wishlist'
import { fetchCart } from '../redux/cart'
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material'
import Cat_Shop from './Cat_Shop'


const data = localStorage.getItem("user_name")
const Navbar = () => {
    const dispatch = useDispatch()
    const [collapse, setCollapse] = useState('collapse')
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [isActive, setIsActive] = useState(true)
    const anchorRef = useRef(null)
    const anchorRef1 = useRef(null)

    const navigate = useNavigate()

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleToggle1 = () => {
        setOpen1((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target)
        ) {
            return;
        }

        setOpen(false);
    };

    const handleClose1 = (event) => {
        if (
            anchorRef1.current &&
            anchorRef1.current.contains(event.target)
        ) {
            return;
        }

        setOpen1(false);
    };
    const { search, setSearch } = useContext(AuthContext)
    const { products } = useSelector((state) => state.product)
    const { wishlist } = useSelector((state) => state.wishlist)
    const { cart } = useSelector((state) => state.cart)
    // console.log("cart",cart);


    const logout = () => {
        navigate('/')
        localStorage.clear()
        window.location.reload()

    }




    const signup = () => {
        navigate('/signup')
    }

    const signin = () => {
        navigate('/signin')
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    function handleListKeyDown1(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen1(false);
        } else if (event.key === 'Escape') {
            setOpen1(false);
        }
    }

    const prevOpen1 = useRef(open);
    useEffect(() => {
        if (prevOpen1.current === true && open1 === false) {
            anchorRef1.current.focus();
        }

        prevOpen1.current = open;
    }, [open1]);

    const { setCatShop } = useContext(AuthContext)

    const subCategory = (product) => {

        axios.post("https://apiwowbeleafadapiapp.be-leaf.in/API/Get_Data", {

            "START": "0",
            "END": "100000",
            "WORD": "",
            "GET_DATA": "Get_SubCategoryList",
            "ID1": `${product.CAT_ID}`,
            "ID2": "",
            "ID3": "",
            "STATUS": "",
            "START_DATE": "",
            "END_DATE": "",
            "EXTRA1": "",
            "EXTRA2": "",
            "EXTRA3": "",
            "LANG_ID": ""

        }).then((res) => {
            console.log(res.data.DATA);
            setOpen(false)
            setCatShop(res.data.DATA)
            navigate('/cat-shop', { state: res.data.DATA })
            // window.location.reload()
        })
    }

    // console.log("search", search);
    useEffect((e) => {
        dispatch(fetchProduct())
        dispatch(fetchWishlist())
        dispatch(fetchCart())
    }, [cart,])
    return (
        <div>
            <div className="container-fluid" >
                <div className="row bg-secondary px-xl-5">

                    <div className="col-lg-12 text-center text-lg-right" style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
                        <div className="d-inline-flex align-items-center">
                            <div className="btn-group d-inline-flex align-items-center h-100">
                                <div className="btn-group">
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <button className="dropdown-item" type="button" onClick={() => navigate('/my-profile')}>My Profile</button>
                                        <button className="dropdown-item" type="button" onClick={() => navigate('/my-order')}>My Orders</button>
                                        <button className="dropdown-item" type="button" onClick={() => navigate('/reward-wallet')}>Reward Wallet</button>
                                        {/* <button className="dropdown-item" type="button">Notifications</button> */}
                                        <button className="dropdown-item" type="button" onClick={() => navigate('/wishlist')}>Wishlist</button>
                                        <button className="dropdown-item" type="button" onClick={() => navigate('/complaints')}>Complaint</button>
                                        <button className="dropdown-item" type="button" onClick={() => logout()}>Logout</button>
                                    </div>
                                </div>

                                {data ? (
                                    <>
                                        <h6 className='text-body mr-3' style={{ padding: "10px 10px 4px 1px", marginTop:"0.2rem" }}>{data}</h6>
                                        <button type="button" className="btn btn-sm btn-light top-btn dropdown-toggle " data-toggle="dropdown">My Account</button>
                                    </>
                                ) : (
                                    <>
                                        <h6 className='text-body mr-3' style={{ padding: "10px 10px 4px 1px", cursor: "pointer", fontSize: "15px" }} onClick={() => signup()}>Sign Up</h6>
                                        <h6 className='text-body mr-3' style={{ padding: "10px 10px 4px 1px", cursor: "pointer", fontSize: "15px" }} onClick={() => signin()}>Sign In</h6>
                                    </>
                                )}


                            </div>
                        </div>
                        <div className="d-inline-flex align-items-center d-block d-lg-none">
                            {data ? (
                                <>
                                    <a className="btn px-0 ml-2" style={{ background: "transparent" }} onClick={() => navigate('/wishlist')}>
                                        <i className="fas fa-heart text-dark" ></i>
                                        <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: "2px", marginLeft:"0.5rem" }} onClick={() => navigate('/wishlist')}>{wishlist.length === 0 ? "" : wishlist.length}</span>
                                    </a>
                                    
                                        
                                    
                                    <a className="btn px-0 ml-2" o style={{ background: "transparent" }} onClick={(e) => {navigate('/cart')}}>
                                        <i className="fas fa-shopping-cart text-dark"></i>
                                        &nbsp;&nbsp;<span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: "2px" }} >{cart.length === 0 ? "" : cart.length}</span>
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a className="btn px-0 ml-2"
                                        style={{ background: "transparent" }}>
                                        <i className="fas fa-heart text-dark" ></i>
                                        {/* <span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: "2px" }}>{wishlist.length}</span> */}
                                    </a>
                                    <a className="btn px-0 ml-2" style={{ background: "transparent" }}>
                                        <i className="fas fa-shopping-cart text-dark"></i>
                                        {/* &nbsp;&nbsp;<span className="badge text-dark border border-dark rounded-circle" style={{ paddingBottom: "2px" }}>{cart.length}</span> */}
                                    </a>
                                </>
                            )}

                        </div>
                    </div>
                </div>
                <div className="row align-items-center bg-light px-xl-5 d-none d-lg-flex" style={{ padding: "14px" }}>
                    <div className="col-lg-4">
                        <a className="text-decoration-none">
                            <span className="logo_img" onClick={() => navigate('/')} style={{ cursor: "pointer" }}><img src={logo} alt="" /></span>
                        </a>
                    </div>
                    <div className="col-lg-4 col-6 text-left">
                        <form action="">
                            <div className="input-group" style={{ borderRadius: "0" }}>
                                <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder="Search for products" />
                                <div className="input-group-append">
                                    <span className="input-group-text bg-transparent text-primary">
                                        <i className="fa fa-search"></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4 col-6 text-right">
                        <p className="m-0">Contact Us</p>
                        <h5 className="m-0">+91 8459227864</h5>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark ">
                <div className="row px-xl-5 ">
                    <div className="col-lg-3 col-md-3 d-none d-lg-block ">
                        <a onClick={handleToggle} className="btn d-flex align-items-center justify-content-between  w-100  btn-new " style={{ height: "65px", padding: "0 30px" }}>
                            <Button
                                className="text-dark m-0 "
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"

                            >
                                <i className="fa fa-bars mr-2"></i> Categories

                            </Button>
                            <i className="fa fa-angle-down text-dark"></i>

                        </a>
                        <nav className=" position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" style={{ width: "calc(100% - 30px)", zIndex: "999" }}>
                            <Popper
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                placement="bottom-start"
                                transition
                                disablePortal
                                className="navbar-nav"
                                style={{ width: "100%" }}
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                               
                                        }}
                                    >
                                        <Paper style={{marginLeft:"-31px", marginTop:"13px", width:"100%"}}>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList
                                                    autoFocusItem={open}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown}
                                                    className="nav-item btn-new-toggle nav-link"
                                                    style={{ color: "white", cursor: "pointer", textAlign: "center" }}
                                                >
                                                    {products.map((i) => {
                                                        return (
                                                            <div>
                                                                <MenuItem onClick={(e) => {
                                                                    // e.preventDefault()
                                                                    subCategory(i)
                                                                }} style={{borderBottom:"1px solid white"}}>{i.CAT_NAME}</MenuItem>

                                                            </div>
                                                        )
                                                    })}

                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </nav>

                    </div>
                    <div className="col-lg-9 col-md-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <a className="text-decoration-none d-block d-lg-none">
                                <span className="h1 text-uppercase text-dark bg-light px-2" style={{ color: "white" }}><img style={{ width: "150px" }} src={logo2} /></span>


                            </a>
                            {/* <button type="button" className="navbar-toggler" data-toggle={collapse} data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button> */}

                            <Button
                                onClick={handleToggle1}
                                className="navbar-toggler"
                                ref={anchorRef1}
                                id="composition-button"
                                aria-controls={open1 ? 'composition-menu' : undefined}
                                aria-expanded={open1 ? 'true' : undefined}
                                aria-haspopup="true"
                                style={{color:"white", border:"1px solid white"}}

                            >
                                <span className="navbar-toggler-icon"></span>

                            </Button>
                            <nav className=" position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" style={{ width: "calc(100% - 30px)", zIndex: "999" }}>
                            <Popper
                                className=" justify-content-between navbar-nav"
                                open={open1}
                                anchorEl={anchorRef1.current}
                                role={undefined}
                                placement="bottom-start"
                                transition
                                disablePortal
                                // className="navbar-nav"
                                style={{ width: "100%"}}
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ marginTop:"10px" ,
                                            transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose1}>
                                                <MenuList
                                                    autoFocusItem={open1}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown1}
                                                    className="nav-item btn-new-toggle nav-link"
                                                    style={{ color: "white", cursor: "pointer", textAlign: "center", marginLeft: "-45px", width: "119%", background: "#079536" }}
                                                >


                                                    <MenuItem style={{width:"100%"}} onClick={() => {
                                                        setOpen1(false)
                                                        navigate('/')
                                                    }} >Home</MenuItem>
                                                    <MenuItem style={{width:"100%"}} onClick={() => {
                                                        setOpen1(false)
                                                        navigate('/privacy-policy')
                                                    }}>Privacy Policy</MenuItem>
                                                    <MenuItem style={{width:"100%"}} onClick={() => {
                                                        setOpen1(false)
                                                        navigate('/refund-policy')
                                                    }}>Refund Policy</MenuItem>
                                                    <MenuItem style={{width:"100%", color:"white"}} onClick={() => setOpen1(false)}><a href='https://play.google.com/store/apps/details?id=com.BELEAF' target="_blank" style={{color:"white"}}>Download App</a> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                                    </svg></MenuItem>


                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                            </nav>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">
                                    <a onClick={(e) => {
                                        navigate('/')
                                    }} className="nav-item nav-link " style={{ cursor: "pointer" }} >Home</a>


                                    <a style={{ cursor: "pointer" }} className="nav-item nav-link" href='https://play.google.com/store/apps/details?id=com.BELEAF' target="_blank">Download App <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                    </svg></a>

                                </div>
                                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                                    {data ?
                                        (
                                            <>
                                                <a className="btn px-0" style={{ background: "none" }} onClick={() => navigate('/wishlist')}>
                                                    <i className="fas fa-heart text-primary"  ></i> &nbsp;
                                                    <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2px" }}>{wishlist.length === 0 ? "" : wishlist.length}</span>
                                                </a>
                                                <a className="btn px-0 ml-3" style={{ background: "none" }} onClick={() => navigate('/cart')}>
                                                    <i className="fas fa-shopping-cart text-primary" ></i> &nbsp;
                                                    <span className="badge text-secondary border border-secondary rounded-circle" style={{ paddingBottom: "2px" }}>{cart.length === 0 ? "" : cart.length}</span>
                                                </a>
                                            </>
                                        ) : (
                                            <>
                                                <a className="btn px-0" style={{ background: "none" }}>
                                                    <i className="fas fa-heart text-primary"  ></i> &nbsp;
                                                </a>
                                                <a className="btn px-0 ml-3" style={{ background: "none" }}>
                                                    <i className="fas fa-shopping-cart text-primary" ></i> &nbsp;
                                                </a>
                                            </>
                                        )}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar