import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'
import { Card, Col, Row } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import clientConfig from '../../../../clientConfig'
import DashNavbar from '../../DashNavbar'
import Dashboard from '../Dashboard'

const Main = () => {

    const [post, setPost] = useState(0)
    const [ data , setData ] = useState([])
    const users_list = useSelector(state => state.users)


    useEffect(() => {
        axios.get(`${clientConfig.Url}/wp-json/wp/v2/posts`)
        .then ( posts => setPost(posts.data))
    }, [])

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
        })
        .catch((error) => {
            console.log(error.data);
        })
    } , [])



    return (
        <div>
            <DashNavbar />
            <Dashboard>
                <h4 className="text-center mb-2"><strong> داشبورد </strong></h4>
                <Row>
                    <Col>
                        <Card className="ml-2">
                            تعداد کاربران : <span className="mr-2"> {users_list.length} </span>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            تعداد پست ها : <span className="mr-2"> {post.length} </span>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-5 pt-5">
                    <Col md={10} className="mr-5">
                        <h6 className="font-weight-bold mb-4"> آخرین محصولات : </h6>
                        {data.map((item) => {
                            return (
                                <Link to={`/products/${item.id}`}>
                                    <h6 className="pro-name text-right" style={{paddingBottom: '0.5rem', borderBottom: '1px solid #999'}}>{item.name}</h6>              
                                </Link>
                            )
                        })}
                    </Col>
                </Row>
            </Dashboard>
        </div>
    )

}

export default Main
