
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Button, Col, Container, Row } from 'reactstrap'
import Footer from '../../Footer'
import Navbar from '../../Navbar'
import './Cart.css'
import { addToCart, removeFromCart } from './../../../redux/actions/Cart'

const Cart = ({match}) => {

    const productId = match.params.id
    const dispatch = useDispatch()
    const cart = useSelector( state => state.cart)
    const {cartItems} = cart

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId))
        }
    } , [dispatch, productId])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    

    return (
        <div>
            <Navbar />
            <Container className="px-5">
                <main>
                    <Row>
                        <Col md={8} className="mt-5 p-3">
                            {cartItems.length === 0 
                            ? (<h5 className="text-center font-weight-bold"> سبد خرید خالی است </h5> )
                            : (<div>
                                <h6 className="text-center font-weight-bold mb-4"> سبد خرید : </h6>
                                {cartItems.map((item) => (
                                    <Row className="py-2 my-2" style={{border: " 1px solid rgba(0,0,0,0.03)"}}>
                                        <Col md={3} className="cart-item d-flex align-items-center">
                                            {item.name} 
                                        </Col>
                                        <Col md={3} className="cart-item d-flex align-items-center">
                                            {item.price} تومان
                                        </Col>
                                        <Col md={4} className="cart-item d-flex align-items-center">
                                            گارانتی اصالت و سلامت فیزیکی کالا 
                                        </Col>
                                        <Col md={2}>
                                            <Button outline color="danger" onClick={() => removeFromCartHandler(item.product)}> <i className="fa fa-trash"></i> </Button>
                                        </Col>
                                    </Row>
                                ))}
                            </div>)
                            }
                        </Col>
                        <Col md={3} style={{border: " 1px solid rgba(0,0,0,0.3)", padding: '0'}} className="cart-shop text-right mr-5 mt-5 p-3">
                            <div className="text-center mt-2 mb-4 font-weight-bold">  
                              <span> جمع سبد خرید : </span>
                              {cartItems.reduce((acc, item) => acc + parseInt(item.price), 0)} تومان
                            </div>

                            <p style={{fontSize: '10.5px', borderTop: '1px solid rgba(0,0,0,0.05)'}} className="pt-3 text-right">هزینه‌ی ارسال در ادامه بر اساس آدرس، زمان و نحوه‌ی ارسال انتخابی شما‌ محاسبه و به این مبلغ اضافه خواهد شد</p>
                            <p style={{fontSize: '10.5px'}}> ارسال رایگان سفارش های بالای ۳۰۰ هزار تومان</p>

                            <Button color="success" className="mt-5" style={{width: '100%' , margin: 'auto'}}> خرید </Button>
                        </Col>
                    </Row>
                </main>
            </Container>
            <Footer />
        </div>
    )
}

export default withRouter(Cart)
