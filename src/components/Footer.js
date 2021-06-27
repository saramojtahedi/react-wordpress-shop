import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import './Navbar.css'

const Footer = () => {
    return (
        <div style={{overflow: 'hidden'}} className="mt-4">
            <Row className="bg-light pt-4 pb-2 px-5 footer-item">
                <Col md={4} className="px-5 footer-item">
                <p className="text-right font-weight-bold"> فهرست </p>
                <ul className="text-right" style={{listStyle:"none"}}>
                    <li className="mb-2"><Link style={{color: "#000"}} to="/">صفحه اصلی</Link></li>
                    <li className="mb-2"><Link style={{color: "#000"}} to="/menu">محصولات</Link></li>
                    <li className="mb-2"><Link style={{color: "#000"}} to="/articles">مقالات</Link></li>
                    <li className="mb-2"><Link style={{color: "#000"}} to="/about-us">درباره ما</Link></li>
                </ul>
                </Col>
                <Col md={4}>
                    <p className="text-right font-weight-bold"> درباره ما </p>
                    <p className="text-right" style={{lineHeight: "1.9"}}>
                    هدف ما ایجاد پل ارتباطی مناسب میان تامین کنندگان تمامی محصولات و برند های ورزشی و مصرف کنندگان این محصولات است.
                    <br />
                    سایت ما همواره در تلاش است تا بهترین کیفیت ممکن در بازار را با منطقی ترین قیمت در سریع ترین زمان به صورت آنلاین در اختیار مصرف کنندگان و ورزشکاران عزیز قرار بدهد.
                    </p>
                </Col>
                <Col md={4} className="footer-item">
                   <p className="text-center footer-item"> فروش کیت های باشگاهی </p>
                   <iframe style={{width: '260px', margin: 'auto', height: '160px', marginLeft: '20%', marginTop: '2%', border: 'none'}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103609.17082897433!2d51.432465327698054!3d35.75604984981972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e077643665f71%3A0x1474eddfbca4ef1!2z2YXZhti32YLZhyDbstiMINiq2YfYsdin2YbYjCDYp9iz2KrYp9mGINiq2YfYsdin2YbYjCDYp9uM2LHYp9mG!5e0!3m2!1sfa!2s!4v1622828024433!5m2!1sfa!2s"></iframe>
                </Col>
            </Row>
        </div>
    )
}

export default Footer
