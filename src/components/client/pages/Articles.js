import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CardBody, CardImg, Col, Container, Row } from 'reactstrap'
import renderHTML from 'react-render-html'
import Navbar from '../../Navbar'
import Footer from '../../Footer'
import clientConfig from './../../../clientConfig'
import './Articles.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { change_loader, get_tags } from './../../../redux/actions/action'
 
const Articles = () => {

    const [data , setData] = useState([])
    const loader = useSelector(state => state.loader)
    const dispatch = useDispatch()

    useEffect(() => {
            axios.get(`${clientConfig.Url}/wp-json/wp/v2/posts?per_page=100`)
            .then((res) => {
              setData(res.data);
              dispatch(change_loader(true))
            })
            .catch((err) => {
              console.log(err)
            });
    }, [])

    useEffect(() => {
      axios.get(`${clientConfig.Url}/wp-json/wp/v2/tags`)
      .then((tag) => {
        dispatch(get_tags(tag.data))
      })
      .catch((err) => {
        console.log(err)
      });
    }, [])

    return (
        <div>
            <Navbar />
            <main>
            <h3 className="text-center pt-5 pb-3"> مقالات </h3>
            <p className="text-center pb-5 main-title">
            در حال حاضر تمرکز اصلی سایت ایجاد بستری مناسب و آسان و همراه با خدمات مناسب برای خرید لباس ورزشی خرید لباس ورزشی فوتبال خرید لباس ورزشی اورجینال و خرید لباس ورزشی ارزان و همچنین تجیهزات و وسایل ورزشی،خرید کفش ورزشی میباشد.            </p>
            { loader === false ? ( <p className="text-center"> در حال دریافت ... </p>) : (
            <div>
                <Container>
                  <Row>
                    {data.map((post) => {
                      return (
                        <Col md={3} className="card-container">
                          <Link to={`/posts/${post.id}`} className="card p0">
                            <CardImg src={(post.uagb_featured_image_src.medium[0])?(post.uagb_featured_image_src.medium[0]): "image/logo-2.png"} className="card-img-top" alt="..." />
                            <CardBody>
                              <h6 className="text-center py-1">{post.title.rendered}</h6>
                              <p className="text-right">{renderHTML(post.content.rendered)}</p>
                            </CardBody>
                          </Link>
                        </Col>
                      )
                    })}
                  </Row>
                </Container>
            </div>
            )}
            </main>
            <Footer />
        </div>
    )
}

export default Articles
