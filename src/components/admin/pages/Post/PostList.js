import React, { useState, useEffect } from "react";
import Dashboard from '../Dashboard'
import {
  Table,
  Space,
  Button,
  Divider,
  Input,
  Radio,
  Form,
  Modal,
  InputNumber,
  Tag,
} from "antd";
import axios from "axios";
import clientConfig from "../../../../clientConfig";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment/locale/fa';
import './../Dashboard.css'
import { useDispatch, useSelector } from "react-redux";
import { get_tags } from "../../../../redux/actions/action";


const token = window.localStorage.getItem("token");

const success_change = () => toast.success("تغییرات شما با موفقیت انجام شد !");
const success_delete = () => toast.warn("پست شما با موفقیت حذف شد !");
const error_toast = () => toast.error("مشکلی رخ داده است!");

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

const PostList = () => {

    const [posts, setPosts] = useState();
    const [fetch, setFetch] = useState(true);
    const [form] = Form.useForm();
    const all_tags = useSelector(state => state.tags)
    const dispatch = useDispatch();


    useEffect(() => {
      axios.get(`${clientConfig.Url}/wp-json/wp/v2/tags`)
      .then((tags_list) => dispatch(get_tags(tags_list.data)))
    } , [])
  
    const onFinishFailed = (value) => {
    };

    const columns = [
        {
          title: "عنوان مطلب",
          dataIndex: "title",
          key: "title",
          className: "text-right",
          render: (text) => text.rendered,
        },
        {
          title: "نویسنده مطلب",
          dataIndex: "uagb_author_info",
          key: "uagb_author_info",
          className: "text-right",
          render: (text) => text.display_name,
        },
        {
          title: "تگ ها",
          dataIndex: "tags",
          key: "tags",
          className: "text-right",
          render:(tags) => {
            if(tags.length > 0) {
              return (tags.map( tag =>{
                let tagId = (tag);
                let foundTag =  all_tags.find(tag => tag.id === tagId);
                return foundTag ? <Tag>{foundTag.name}</Tag> : ''
              }))
            } else {
              return " تگ ندارد "
            }
          }
        },
        {
          title: "زمان انتشار",
          dataIndex: "date",
          key: "date",
          className: "text-right",
          render:(date => <Moment fromNow local="fa">{date}</Moment>)
        },
        {
          title: "مدیریت",
          key: "name",
          dataIndex: "name",
          className: "text-right",
          render: (text, record, index) => {
            return (
              <Space size="middle">
                <Button
                  type="link"
                  onClick={() => {
                    axios
                      .delete(
                        `${clientConfig.Url}/wp-json/wp/v2/posts/${posts[index].id}`,
                        {
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          params: {
                            force: true,
                            reassign: 1,
                          },
                        }
                      )
                      .then((deletedUser) => {
                        success_delete();
                        setFetch(true);
                      })
                      .catch((err) => {
                        error_toast();
                        console.log(err);
                      });
                  }}
                >
                  حذف
                </Button>
                <Divider type="vertical" />
                <Button
                  type="link"
                  onClick={() => {
                    const onFinish = (value) => {
                      form.resetFields();
    
                      axios
                        .put(
                          `${clientConfig.Url}/wp-json/wp/v2/posts/${posts[index].id}`,
                          value,
                          {
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((changeUser) => {
                          success_change();
                          setFetch(true);
                        })
                        .catch((err) => {
                          error_toast();
                          console.log(err);
                        });
                    };
                    return Modal.info({
                      className: "change-info-modal",
                      title: <h3>پنجره تغییر اطلاعات</h3>,
                      width: 600,
                      content: (
                        <div>
                          <p>
                            در صورتی که از تغییرات خود مطمئن هستید ، آن را تایید
                            کنید.
                          </p>
                          <Form
                            form={form}
                            {...layout}
                            name="ساخت کاربر جدید"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                          >
                            <Form.Item label="عنوان مطلب : " name="title">
                              <Input />
                            </Form.Item>
                            <Form.Item label="متن مطلب : " name="content">
                              <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                              className="text-right"
                              name="status"
                              label="وضعیت انتشار : "
                            >
                              <Radio.Group>
                                <Radio.Button value="publish">انتشار</Radio.Button>
                                <Radio.Button value="draft">متن آماده</Radio.Button>
                              </Radio.Group>
                            </Form.Item>
                            <Divider />
                            <Form.Item {...tailLayout} className="text-center mr-2">
                              <Button
                                htmlType="submit"
                                type="submit"
                                color="primary"
                              >
                                تایید تغییر اطلاعات
                              </Button>
                            </Form.Item>
                          </Form>
                        </div>
                      ),
    
                      onOk() {},
                      okType: "danger",
                      okText: "بازگشت",
                    });
                  }}
                >
                  تغییر
                </Button>
                <Divider type="vertical" />
                <Button type="link">
                  <Link to={`/posts/${posts[index].id}`}>مشاهده پست</Link>
                </Button>
              </Space>
            );
          },
        },
      ];

      if (fetch === true) {
        axios
          .get(`${clientConfig.Url}/wp-json/wp/v2/posts?per_page=50`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((posts) => {
            setPosts(posts.data);
            setFetch(false);
          });
      } else {
      }

    return (
        <div>
            <Dashboard>
                <h5 className="mb-5"> لیست پست ها : </h5>  
                <Table columns={columns} dataSource={posts} bordered />
                <p className="text-center my-5 smartAlert"> لطفا گوشی را افقی نگه دارید </p>
            </Dashboard>
        </div>
    )
}

export default PostList
