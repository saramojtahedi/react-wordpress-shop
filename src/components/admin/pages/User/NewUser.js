import React from "react";
import { Form, Input, Radio, Select, Row, Col } from "antd";
import { Button } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import clientConfig from "./../../../../clientConfig"
import Dashboard from './../Dashboard'
import './../Dashboard.css'

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

  
  const onFinish = (value) => {
    form.resetFields();
    axios
      .post(`${clientConfig.Url}/wp-json/wp/v2/users`, value, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((newPost) => {
        success_create(
          `کاربر با موفقیت ساخته شد !`
        );
      })
      .catch((err) => {
        error_create();
      });
  };
  const onFinishFailed = (value) => {};

  return (
    <Dashboard>
        <h5 className="mb-5">
            ساخت کاربر جدید
        </h5>
        <Row>
            <Col md={12}>
                <Form
                {...layout}
                name="ساخت کاربر"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="form_container"
                >
                <Form.Item
                    className="form_item mb-3"
                    label="نام  : "
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: "لطفا نام را وارد کنید !",
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    className="form_item mb-3"
                    label="نام مستعار  : "
                    name="nickname"
                    rules={[
                    {
                        required: true,
                        message: "لطفا نام کاربری را وارد کنید !",
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    className="form_item mb-3"
                    label="رمز عبور  : "
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: "لطفا رمز عبور را وارد کنید !",
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    className="form_item mb-3"
                    label="ایمیل  : "
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: "لطفا ایمیل را وارد کنید !",
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    className="form_item mb-3"
                    label=" توضیحات : "
                    name="description"
                    rules={[
                    {
                        required: true,
                        message: "لطفا توضیحات را وارد کنید !",
                    },
                    ]}
                >
                <Input.TextArea />
                </Form.Item>
                <Form.Item
                className="text-right"
                name="roles"
                label="مسئولیت : "
                
                >
                <Radio.Group>
                    <Radio.Button value="administrator">
                    ادمین
                    </Radio.Button>
                    <Radio.Button value="editor">ویرایشگر</Radio.Button>
                    <Radio.Button value="author">نویسنده</Radio.Button>
                    <Radio.Button value="contributor">
                    توسعه دهنده
                    </Radio.Button>
                    <Radio.Button value="subscriber">
                    دنبال کننده
                    </Radio.Button>
                </Radio.Group>
                </Form.Item>
                
                <Form.Item {...tailLayout} className="text-center">
                    <Button htmlType="submit" type="submit" color="success" className="submit_btn">
                    ساخت کاربر
                    </Button>
                </Form.Item>
                </Form>
            </Col>
        </Row>
    </Dashboard>
  );
};

export default CreatePost;
