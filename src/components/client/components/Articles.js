
import axios from 'axios'
import renderHTML from 'react-render-html'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row } from 'reactstrap'
import clientConfig from '../../../clientConfig'
import './Components.css'

const Articles = () => {

    const [data , setData] = useState([])

    useEffect(() => {
            axios.get(`${clientConfig.Url}/wp-json/wp/v2/posts?per_page=100`)
            .then((res) => {
              setData(res.data);
            })
            .catch((err) => {
              console.log(err)
            });
    }, [])

    return (
        <div>
            <Container>
                <div className="articles">
                <h4 className="text-center mb-2 font-weight-bold"> آخرین مقالات </h4>
                <Row>
                    {data.map((post) => {
                      return (
                        <Col md={4}>
                        <Link to={`/posts/${post.id}`}>
                        <Card className="article_card">
                            <CardImg top width="100%" src={(post.uagb_featured_image_src.medium[0])?(post.uagb_featured_image_src.medium[0]): "image/logo-2.png"} alt="image" />
                            <CardBody>
                                <CardTitle tag="span" className="text-center font-weight-bold">{post.title.rendered}</CardTitle>
                                <CardText> {renderHTML(post.content.rendered)} </CardText>
                            </CardBody>
                        </Card>
                        </Link>
                        </Col>
                      )
                    })}
                </Row>
                </div>
            </Container>
        </div>
    )
}

export default Articles
