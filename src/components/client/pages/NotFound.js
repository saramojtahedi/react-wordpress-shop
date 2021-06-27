import React from 'react'
import { Col, Row , Button } from 'reactstrap'
import Navbar from '../../Navbar'

const NotFound = () => {
    return (
        <div>
            <Navbar />
            <h1 className="text-center pt-5 mt-5 mb-5" > صفحه مورد نظر شما یافت نشد </h1>
            <Row>
                <Col md={1} className="mx-auto mt-5">
                    <Button className="btn-large"> صفحه اصلی </Button>
                </Col>
            </Row>
        </div>
    )
}

export default NotFound
