
import React, { useEffect, useState } from 'react'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import renderHTML from 'react-render-html'
import Navbar from './../../Navbar'
import Footer from './../../Footer'
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import './Menu.css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { change_loader } from './../../../redux/actions/action'

const Menu = () => {

    const [ data , setData ] = useState([])
    const loader = useSelector(state => state.loader)
    const dispatch = useDispatch()

 
    const api = new WooCommerceRestApi({
        url: "http://simamojtahedi.ir/cj",
        consumerKey: "ck_09ce04734fa1d608ca71c77fb24158484c3d20f1",
        consumerSecret: "cs_39f6bc975e7cceda69c0bf9623735ed847472d1f",
        version: "wc/v3"
    });

    useEffect(() => {
        api.get("products", {
            per_page: 20,
        })
        .then((response) => {
            setData(response.data)
            dispatch(change_loader(true))

        })
        .catch((error) => {
            console.log(error.data);
        })
    } , [])

    return (
        <div>
            <Navbar />
            <h5 className="text-center mt-5"> محصولات : </h5>
            <p className="text-center pb-4 mt-4 main-title">
            در حال حاضر تمرکز اصلی سایت ایجاد بستری مناسب و آسان و همراه با خدمات مناسب برای خرید لباس ورزشی خرید لباس ورزشی فوتبال خرید لباس ورزشی اورجینال و خرید لباس ورزشی ارزان و همچنین تجیهزات و وسایل ورزشی،خرید کفش ورزشی میباشد.            
            </p>
            <main className="mt-5">
                <Container>
                { loader === false ? ( <p className="text-center"> در حال دریافت محصولات ... </p>) : (
                    <Row>
                        {data.map((item) => {
                            return (
                                <Col md={3} xs={12} sm={12}>
                                    <Link to={`/products/${item.id}`}>
                                        <Card className="product">
                                            <img src={item.images[0].src } className="img img-responsive" />
                                            <CardBody>
                                                <h6 className="pro-name text-center font-weight-bold">{item.name}</h6>
                                                <p className="pro-info text-right mt-3"> {renderHTML(item.short_description)} </p>
                                                <div  className="pro-quantity">
                                                     { item.stock_quantity ? <p className="bg-success">موجود</p> : <p className="bg-danger">ناموجود</p> }
                                                </div>
                                            </CardBody>
                                            <div className="pro-footer">
                                                <div className="price-container">
                                                    <span className="ml-3"> قیمت : </span>
                                                    <span className="pro-price"> {item.regular_price} تومان </span>
                                                 </div>                                                    
                                            </div>
                                        </Card>
                                    </Link>
                                </Col>
                            )
                        })}
                    </Row>
                )}
                </Container>
            </main>
            <Footer />
        </div>
    )
}

export default Menu
