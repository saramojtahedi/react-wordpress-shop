import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, CardBody, Container, CardImg } from "reactstrap";
import { Divider, Input, Form, Button, Avatar, Typography, Tag } from "antd";
import clientConfig from '../../clientConfig';
import renderHTML from 'react-render-html'
import Navbar from '../Navbar'
import Footer from '../Footer'
import './Post.css'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const success_comment = () => toast.success("نظر شما برای بررسی ارسال شد !")
const error_comment = () => toast.error("مشکلی رخ داده است !")
const { Paragraph } = Typography;
const token = window.localStorage.getItem("token");

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

const Post = ({post}) => {

    const [data , setData] = useState([])
    const [form] = Form.useForm();
    const [comment, setComment] = useState([]);
    const [fetch, setFetch] = useState(true);
    const all_tags = useSelector(state => state.tags)
    const dispatch = useDispatch();


    useEffect(() => {
        axios.get(`${clientConfig.Url}/wp-json/wp/v2/posts`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err)
        });
    }, [])

    useEffect(() => {
        axios.get(`${clientConfig.Url}/wp-json/wp/v2/comments`)
          .then((comments) => {
            const filterComments = comments.data.filter(
              comment => comment.post === post.id
            );
            setComment(filterComments);
            
          })
          .catch((err) => {
            error_comment()
            console.log(err)});
      } , []);
    
      const onFinish = (value) => {
        form.resetFields()
        value = {
          ...value,
          post: post.id,
          author: 1,
        };
        axios
          .post(`${clientConfig.Url}/wp-json/wp/v2/comments`, value, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setFetch(true);
            success_comment()
          })
          .catch((err) =>{
            error_comment()
        });
      };
      const onFinishFailed = (err) => {
        console.log(err);
      };


    return (
        <div>
            <Navbar />
            <Container>
                <div className="post-container">
                    <Col md={12} className="">
                        <Col className="post-image py-2">
                            <CardImg src={(post.uagb_featured_image_src.medium[0])?(post.uagb_featured_image_src.medium[0]): "/image/logo-2.png"} className="" alt="..." />
                        </Col>
                        <CardBody>
                            <h2 className="text-center pt-3 pb-5">{post.title.rendered}</h2>
                            <p className="text-right px-5">{renderHTML(post.content.rendered)}</p>
                            <p className="text-right px-5 pt-5"> نویسنده پست : {post.uagb_author_info.display_name}</p>
                            <div className="text-right px-5 pt-1">
                               تگ ها : 
                                {(post.tags.length > 0) ? (
                                      post.tags.map( tag => {
                                      let tagId = (tag);
                                      let foundTag =  all_tags.find(tag => tag.id === tagId);
                                      return foundTag ? <Tag>{foundTag.name}</Tag> : ''
                                      })
                                ) : (" تگ ندارد " )
                                }
                            </div>

                        </CardBody>
                    </Col>

                    <Divider />

                    <Row className="comment_container mb-5">
                    <Container className="px-5">
                        <Col>
                            {comment.length > 0 ? comment.map((value) => {
                                return (
                                    <Card className="text-right comment_sec">
                                    <CardBody className="card_height">
                                        <Avatar
                                        size={48}
                                        >
                                        {value.author_name}
                                        </Avatar>{" "}
                                        <Divider type="vertical" />{" "}
                                        <span>{value.author_name} گفته :</span>
                                        <Paragraph
                                        style={{ marginRight: "55px" }}
                                        ellipsis={{
                                            rows: 2,
                                            expandable: true,
                                            symbol: <a>ادامه نظر</a>,
                                        }}
                                        >
                                        {renderHTML(value.content.rendered)}
                                        </Paragraph>
                                    </CardBody>
                                    </Card>
                                );
                                })
                            : <p style={{textAlign:"center"}}>نظری وجود ندارد !</p>}
                        </Col>
                        <Divider />
                        <Col>
                            <Form
                            form={form}
                            {...layout}
                            name="نوشتن نظرات"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            className="mt-5 comment_form"
                            >
                            <Form.Item label="نام شما :" name="author_name">
                                <Input />
                            </Form.Item>

                            <Form.Item label="ایمیل شما :" name="author_email">
                                <Input />
                            </Form.Item>
                            <Form.Item label="نظر شما :" name="content">
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button htmlType="submit" type="submit" color="primary" className="mx-auto">
                                    ثبت نظر
                                </Button>
                            </Form.Item>
                            </Form>
                        </Col>
                        </Container>
                    </Row>
                </div>
            </Container>
            <Footer />
        </div>
    )
}

export default Post
