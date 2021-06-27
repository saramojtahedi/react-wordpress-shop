import React, { useState } from "react";
import { Table, Space, Button, Divider, Modal, Input, Form, Radio } from "antd";
import axios from "axios"
import clientConfig from "./../../../../clientConfig"
import Dashboard from "../Dashboard";
import { toast } from "react-toastify";

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

const UserList = () => {

  const [users , setUsers] = useState([]);
  const [fetch , setFetch] = useState(true);

  const [form] = Form.useForm();
  const onFinishFailed = (value) => {  };

  const columns = [
    {
      title: "نام کاربر",
      dataIndex: "name",
      key: "name",
      className: "text-right",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "نام کاربری",
      dataIndex: "slug",
      key: "slug",
      className: "text-right"
    },
    {
      title: "ID کاربر",
      dataIndex: "id",
      key: "id",
      className: "text-right"
    },
    {
      title: "مدیریت",
      key: "name",
      dataIndex:"name",
      className: "text-right",

      render: (text , record, index) => {
        return(
          <Space size="small">
            <Button
                type="link"
                onClick={() => {
                  axios.delete(`${clientConfig.Url}/wp-json/wp/v2/users/${users[index].id}`, {
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
                      setFetch(true) 
                      success_create(
                        `کاربر با موفقیت حذف شد !`
                      );
                    })   
                    .catch((err) => error_create())             
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

                    axios.put(`${clientConfig.Url}/wp-json/wp/v2/users/${users[index].id}`,
                        value,
                        {
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                      .then((newPost) => {
                        setFetch(true)
                        success_create(
                          `کاربر با موفقیت ویرایش شد !`
                        );

                      })
                      .catch((err) => {
                         error_create();
                        });
                  };
                  return Modal.info({
                    className: "change-info-modal",
                    title: <h5 className="mb-3">پنجره تغییر اطلاعات</h5>,
                    width: 800,
                    content: (
                      <div>
                        <Form
                          form={form}
                          {...layout}
                          name="ساخت کاربر جدید"
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                        >

                          <Form.Item
                            label="نام مستعار : "
                            name="slug"
                            
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            label="پست الکترونیکی : "
                            name="email"
                            
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            label="رمزعبور : "
                            name="password"
                            
                          >
                            <Input.Password />
                          </Form.Item>
                          <Form.Item
                            label="معرفی کاربر : "
                            name="description"
                            
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
            </Space> 
      )},
    },
  ];

    if(fetch === true){
        axios.get(`${clientConfig.Url}/wp-json/wp/v2/users`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then(getusers => setUsers(getusers.data))
        setFetch(false)
    }else{

    }

    return (
      <>
      <Dashboard>
        <h5 className="mb-5"> لیست کاربران : </h5>  
        <Table columns={columns} dataSource={users} bordered />
        <p className="text-center my-5 smartAlert"> لطفا گوشی را افقی نگه دارید </p>
      </Dashboard>
      </>
    );
};

export default UserList;
