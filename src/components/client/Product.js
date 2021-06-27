import React from 'react'
import {withRouter} from 'react-router-dom'
import Navbar from '../Navbar'
import Footer from '../Footer'
import renderHTML from 'react-render-html'
import { Col, Container, Row, Button } from 'reactstrap'
import './Product.css'
import { Divider } from 'antd'


const Product = ({product, history, match}) => {

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}`)
    }

    return (
        <div>
            <Navbar />
            <Container className="px-5 mt-5">
                <Row className="px5">
                    <Col md={10} xs={12}>
                        <div className="image-container mb-5">
                            <img src={product.images[0].src } className="img img-responsive main-image" />
                            <div className="slider">
                                {product.images.map((item) => {
                                    return (<img src={item.src } className="img img-responsive slider-img" />)
                                })}
                            </div>
                        </div>
                
                        <Divider/>
                        <h2 className="text-right mt-5 pb-4">{product.name}</h2>
                        <p className="pro-info text-right mt-3"> {renderHTML(product.description)} </p>
                        <span className="pro-tags text-muted mt-4"> تگ ها : {product.tags.map( i => <span> {i.name} </span> ) }</span>

                    </Col>
                    <Col md={2} xs={12}>
                        <div className="shop-card">
                            <h5 className="text-right mb-3"> فروشنده : ورزش سه </h5>
                            <h6 className="text-right"> گارانتی ۱۲ ماهه کاوان </h6>
                            <h6 className="text-right pro-cat"> دسته بندی : {product.categories.map( i => <span> {i.name} </span> ) } </h6>
                            <div className="quantity">
                                { product.stock_quantity ? <p className="success"> در انبار موجود است</p> : <p className="danger"> در انبار موجود نیست </p> }
                            </div>
                            <div className="main-price-container">
                                <span className="pro-price"> {product.sale_price ? <span>قیمت : <del> {product.regular_price} تومان </del></span> : <span>قیمت :  {product.regular_price} تومان</span>} </span>
                                <span className="sale-price"> { product.sale_price ? (<span>قیمت فروش ویژه : {product.sale_price} تومان </span>) : " " }  </span>
                            </div>
                            {product.stock_quantity ? <Button onClick={addToCartHandler}> خرید </Button> : <Button disabled> خرید </Button>}
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />

        </div>
    )
}

export default withRouter(Product)
