import { Card, Col, Radio, Row } from 'antd'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clientConfig from '../../../../clientConfig'
import Dashboard from './../Dashboard'

function Category({post}) {

    const [ cats , setCats] = useState ([])
    const [ posts , setPosts] = useState ([])
    const [ postList , setPostList] = useState([])

    useEffect(() => {
        if (cats.length === 0 && posts.length === 0) {
            Axios.get(`${clientConfig.Url}/wp-json/wp/v2/categories`)
                .then((cats) => setCats(cats.data))
            Axios.get(`${clientConfig.Url}/wp-json/wp/v2/posts?per_page=100`)
                .then((posts) => setPosts(posts.data))
        } else {}
    })

    const checkCat = (catId) => {
        const filteredPosts = posts.filter(post => post.categories[0] === catId)
        return setPostList(filteredPosts)
    }

    return (
        <Dashboard>
            <h6 className="text-center mb-5 mt-2"> برای دیدن پست ها تگ مورد نظر را انتخاب کنید </h6>
            <Row className="mb-5 justify-content-center">
                <Col>
                    <Radio.Group onChange={(e) => {
                        checkCat(e.target.value)
                    }}>
                    {cats.map((cat) => {
                        return <Radio.Button value={cat.id}>{cat.name}</Radio.Button>
                    })}
                    </Radio.Group>
                </Col>
            </Row>

            <Row>
                {postList.length > 0 ? postList.map((post) =>
                    <Card>
                        <Link to ={`/posts/${post.id}`}> {post.title.rendered} </Link>
                    </Card>
                ) :  <p className="text-center"> پستی نیست </p>  }
            </Row>
        </Dashboard>
    )
}

export default Category
