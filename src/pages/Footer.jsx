import React from 'react'
import wp from '../image/wp.png'
import logo from '../image/logo.png'
import { Navigate, useNavigate } from 'react-router-dom'


const Footer = () => {
    const navigate = useNavigate()
    return (
        <div>
            <footer className="footer-section" style={{ background: "#ddd6d6" }}>
                <div className="container">
                    <div className="footer-cta pt-512 pb-512">
                        <div className="row">
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div className="cta-text">
                                        <h4 style={{ color: "#3D464D" }}>Find us</h4>
                                        <span>1010 Avenue, sw 54321, chandigarh</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="fas fa-phone"></i>
                                    <div className="cta-text">
                                        < h4 style={{ color: "#3D464D" }}>Call us</h4>
                                        <span><a href="tel:8459227864">+91 8459227864</a></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-md-4 mb-30">
                                <div className="single-cta">
                                    <i className="far fa-envelope-open"></i>
                                    <div className="cta-text">
                                        <h4 style={{ color: "#3D464D" }}>Mail us</h4>
                                        <span><a href="mailto:beleafnsk@gmail.com">beleafnsk@gmail.com</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-content pt-512 pb-512">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 mb-50">
                                <div className="footer-widget">
                                    <div className="footer-logo">
                                        <a ><img src={logo} className="img-fluid" alt="logo" /></a>
                                    </div>
                                    <div className="footer-text">
                                        <p>This website is operated by Be-leaf inc. offers this website, including all information, tools and services available from this site to you. the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
                                    </div>
                                    {/* <div className="footer-social-icon">
                                <span>Follow us</span>
                                <a href="#"><i className="fab fa-facebook-f facebook-bg"></i></a>
                                <a href="#"><i className="fab fa-twitter twitter-bg"></i></a>
                                <a href="#"><i className="fab fa-google-plus-g google-bg"></i></a>
                            </div> */}
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-30 ">
                                <div className="footer-widget ">
                                    <div className="footer-widget-heading">
                                        <h2 className='Links' style={{ color: "#3D464D", fontSize:"20px" }}>Useful Links</h2>
                                    </div>
                                    <ul className='newcss'>
                                        <li><a className='hover-class' onClick={() => navigate('/')}>Home</a></li>
                                        <li><a className='hover-class' onClick={() => navigate('/notification')}>Notification</a></li>
                                        <li><a className='hover-class' onClick={() => navigate('/cart')}>Cart</a></li>
                                        <li><a className='hover-class' onClick={() => navigate('/wishlist')}>Wishlist</a></li>
                                        <li><a className='hover-class' onClick={() => navigate('/my-order')}>My Orders</a></li>
                                        <li><a className='hover-class' onClick={() => navigate('/reward-wallet')}>Reward Wallet</a></li>
                                        <li><a className='hover-class' onClick={() => navigate('/privacy-policy')} href='#'>Privacy Policy</a></li>
                                        <li><a className='hover-class' onClick={() => navigate('/refund-policy')}>Refund Policy</a></li>
                                        <li><a className='hover-class' onClick={() => navigate('/terms-conditions')} href='#'>Terms & Conditions</a></li>
                                       
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                                <h2 style={{fontSize:"21px"}}>Contact</h2>
                                <address className="margin-bottom-40">
                                    <a href="https://goo.gl/maps/m3BKfJ6s8UNXFDSq5" className="hover-address" target='_blank'>
                                        BiG Strategic Advisors Group
                                        A 321, Lodha Supremus II, Beside Thane Passport Office, Road No 22, Wagle Estate, Thane west, 400604</a> <br />
                                    <span> Phone: <a href="tel:8459227864" className="mail">  +91 8459227864</a></span><br />
                                    <span> Email: <a href="mailto:beleafnsk@gmail.com" className="mail">beleafnsk@gmail.com</a><br /></span>

                                </address>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="copyright-area">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                        <div className="copyright-text">
                            <p>Copyright &copy; 2018, All Right Reserved <a href="https://codepen.io/anupkumar92/">Anup</a></p>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                        <div className="footer-menu">
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Policy</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
            </footer>
            {/* <div className="container-fluid bg-dark text-secondary mt-5 ">
        <div className="row px-xl-5 pt-5-1 " style={{background:"#696969"}}>
            <div className="col-lg-4 col-md-12 mb-3 pr-3 pr-xl-5">
                <h5 className="text-secondary text-uppercase mb-2">Be-Leaf</h5>
                <p className="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor. Rebum tempor no vero est magna amet no</p>
                <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA</p>
                <p className="mb-2"><i className="fa fa-envelope text-primary mr-3"></i>info@example.com</p>
                <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
            </div>
            <div className="col-lg-8 col-md-12">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h5 className="text-secondary text-uppercase m2">Quick Shop</h5>
                        <div className="d-flex flex-column justify-content-start">
                            <a className="text-secondary mb-2" href="#" style={{textDecoration:"none"}}><i className="fa fa-angle-right mr-2"></i>Home</a>
                            <a className="text-secondary mb-2" href="#" style={{textDecoration:"none"}}><i className="fa fa-angle-right mr-2"></i>Videos</a>
                            <a className="text-secondary mb-2" href="#" style={{textDecoration:"none"}}><i className="fa fa-angle-right mr-2"></i>My Orders</a>
                            <a className="text-secondary mb-2" href="#" style={{textDecoration:"none"}}><i className="fa fa-angle-right mr-2"></i>Reward Wallet</a>
                            <a className="text-secondary mb-2" href="#" style={{textDecoration:"none"}}><i className="fa fa-angle-right mr-2"></i>Download App</a>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5 className="text-secondary text-uppercase mb-2">Categories</h5>
                        <div className="d-flex flex-column justify-content-start">
                            <a className="text-secondary mb-2" href="#" style={{textDecoration:"none"}}><i className="fa fa-angle-right mr-2"></i>Cactus</a>
                            <a className="text-secondary mb-2" href="#" style={{textDecoration:"none"}}><i className="fa fa-angle-right mr-2"></i>Planter Pots</a>
                            <a className="text-secondary mb-2" href="#" style={{textDecoration:"none"}}><i className="fa fa-angle-right mr-2"></i>Seeds</a>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h5 className="text-secondary text-uppercase mb-2">Newsletter</h5>
                        <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                        <form action="">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Your Email Address"/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary">Sign Up</button>
                                </div>
                            </div>
                        </form>
                        <h6 className="text-secondary text-uppercase mt-2 mb-2">Follow Us</h6>
                        <div className="d-flex">
                            <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-primary btn-square mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a className="btn btn-primary btn-square" href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
        <div className=" container" style={{borderColor: "rgba(256, 256, 256, .1) !important"}}>
            <div className=" row " style={{display: "flex", alignItems: "center", justifyContent: "center",marginTop: "5px", marginBottom: "-24px"}}>
            <div className="additional-info">
              <p>  <a   href="#">Refund Policy</a>  | <a   href="#">Contact Us</a>  |  <a  href="#">Privacy Policy</a> </p>
              <p className="p">© 2023 <a href="#" target='_blank' style={{fontSize:"16px"}}>Be-Leaf</a> All rights reserved | Design and Developed by<a href="https://wowinfotech.com/" target="_blank"> WOWinfotech</a></p>
            </div>
            </div>
           
        </div>
        
    </div> */}
            <a href="https://wa.me/8459227864" target='_blank' > <img src="assets/img/wp.png" alt="images" className="wp img-responsive" /></a>
        </div>
    )
}

export default Footer