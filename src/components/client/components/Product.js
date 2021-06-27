
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html'
import Slider from "react-slick";
import { Card, CardBody, Container } from 'reactstrap';
import './Components.css'

const Product = () => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          }
        ]
      };


    const [ data , setData ] = useState([])
 
    const api = new WooCommerceRestApi({
        url: "http://simamojtahedi.ir/cj",
        consumerKey: "ck_09ce04734fa1d608ca71c77fb24158484c3d20f1",
        consumerSecret: "cs_39f6bc975e7cceda69c0bf9623735ed847472d1f",
        version: "wc/v3"
    });

    useEffect(() => {
        api.get("products", {
            per_page: 8,
        })
        .then((response) => {
            setData(response.data)
        })
        .catch((error) => {
            console.log(error.data);
        })
    } , [])

    return (
        <div className="mt-5">
            <Container>
            <div>
                <h4 className="text-center mb-5 font-weight-bold"> محصولات </h4>
                <Slider {...settings}>
                
                {data.map((item) => {
                    return(
                        <div className="car-item">
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
                        </div>
                    )
                })}
                </Slider>
            </div>
            </Container>
        </div>
    )
}

export default Product
