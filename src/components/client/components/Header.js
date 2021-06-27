
import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import './Components.css'

const Header = () => {
    return (
        <div className="main-banner">
            <Container>
            <Row className="">
                <Col md={5} xs={12} className="kits_container">
                    <div className="banner">
                        <img src="/image/ball.png" />
                    </div>
                </Col>
                <Col md={7}>
                <div className="main_content text-right mt-2 p-5">
                    <h3 className="mb-4 mt-5 font-weight-bold"> فروش کیت های باشگاهی </h3>
                    <p> 
                    لباس تمامی باشگاه های اروپایی موجود میباشد ، شما میتوانید با ارزان ترین قیمت لباس هواداری تیم محبوبتان را داشته باشید ، نگران سایز نباشید اگر سایز لباس مناسبتون نبود ، براتون تعویض میکنیم ...
                    </p>
                    <p>
                    امکان چاپ اسم و شماره بر روی تمامی لباس ها مقدور میباشید که مبلغ 20 هزار تومان به مبلغ کل سفارش اضافه خواهد شد.
                    </p>
                    <p>
                    انواع کیت های باشگاهی در فروشگاه ما موجود میباشد
                    </p>
                </div>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Header
