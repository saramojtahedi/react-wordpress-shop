import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Select, Row, Col } from "antd";
import { Button } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import clientConfig from "./../../../../clientConfig"
import Dashboard from './../Dashboard'
import './../Dashboard.css'
import { useSelector } from "react-redux";

const token = window.localStorage.getItem("token")
const success_create = (text) => toast.success(text);
const error_create = () => toast.error("مشکلی رخ داده است !");

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

const CreatePost = () => {

  const Option = Select;
  const [form] = Form.useForm();
  const [cats , setCats] = useState([])
  const tags_list = useSelector(state => state.tags)
  const users = useSelector(state => state.users)


  const onFinish = (value) => {
    form.resetFields();
    axios
      .post(`${clientConfig.Url}/wp-json/wp/v2/posts`, value, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((newPost) => {
        success_create(
          `پست با موفقیت ساخته شد !`
        );
      })
      .catch((err) => {
        error_create();
      });
  };
  const onFinishFailed = (value) => {};

  useEffect(() => {
    if(cats.length === 0) {
      axios.get(`${clientConfig.Url}/wp-json/wp/v2/categories`)
      .then((res) => {setCats(res.data)})
    }
  } , [])



  return (
    <Dashboard>
        <h5 className="mb-5">
            ساخت پست جدید
        </h5>
        <Row>
            <Col md={12}>
                <Form
                {...layout}
                name="ساخت پست"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="form_container"
                >
                <Form.Item
                    className="form_item mb-3"
                    label="عنوان  : "
                    name="title"
                    rules={[
                    {
                        required: true,
                        message: "لطفا عنوان مطلب را وارد کنید !",
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    className="form_item mb-3"
                    label="نویسنده  : "
                    name="autor"
                    rules={[
                      {
                          required: true,
                          message: "لطفا نویسنده را انتخاب کنید !",
                      },
                      ]}
                >
                    <Select placeholder="انتخاب نویسنده">
                      {users.map((user) => {
                        return (
                          <Option value={user.id}> {user.name} </Option>
                        )
                      })}
                    </Select>
                </Form.Item>

                <Form.Item
                    className="form_item mb-3"
                    label="دسته بندی  : "
                    name="category"
                    rules={[
                      {
                          required: true,
                          message: "لطفا دسته بندی را مشخص کنید !",
                      },
                      ]}
                >
                    <Select mode="multiple" placeholder="انتخاب دسته بندی">
                      {cats.map((cat) => {
                        return (
                          <Option value={cat.id}> {cat.name} </Option>
                        )
                      })}
                    </Select>
                </Form.Item>

                <Form.Item
                    className="form_item mb-3"
                    label="تگ  : "
                    name="tags"
                >
                    <Select mode="multiple" placeholder="انتخاب تگ">
                      {tags_list.map((tag) => {
                        return (
                          <Option value={tag.id}> {tag.name} </Option>
                        )
                      })}
                    </Select>
                </Form.Item>

                <Form.Item
                    className="form_item mb-3"
                    label=" متن : "
                    name="content"
                    rules={[
                    {
                        required: true,
                        message: "لطفا محتویات مطلب را وارد کنید !",
                    },
                    ]}
                >
                <Input.TextArea />
                </Form.Item>
                
                <Form.Item
                    className="form_item mb-5"
                    name="status"
                    label="وضعیت انتشار : "
                    rules={[
                    {
                        required: true,
                        message: "لطفا وضعیت انتشار را مشخص کنید !",
                    },
                    ]}
                >
                    <Radio.Group className="radio_container">
                    <Radio.Button value="publish" className="radio_btn">انتشار</Radio.Button>
                    <Radio.Button value="draft" className="radio_btn">پیش نویس</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item {...tailLayout} className="text-center">
                    <Button htmlType="submit" type="submit" color="success" className="submit_btn">
                    ساخت پست
                    </Button>
                </Form.Item>
                </Form>
            </Col>
        </Row>
    </Dashboard>
  );
};

export default CreatePost;
