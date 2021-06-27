
import React, { useState } from "react";
import { Table, Space, Button, Divider, Modal, Input, Form, Radio } from "antd";
import axios from "axios"
import clientConfig from "./../../../../clientConfig"
import Dashboard from "../Dashboard";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { get_tags } from './../../../../redux/actions/action'


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

const Tags = () => {

    const [fetch , setFetch] = useState(true);
    const [form] = Form.useForm();
    const tags_list = useSelector(state => state.tags)
    const dispatch = useDispatch()

    const columns = [
        {
          title: " تگ ها",
          dataIndex: "name",
          key: "name",
          className: "text-right",
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
                      axios.delete(`${clientConfig.Url}/wp-json/wp/v2/tags/${tags_list[index].id}`, {
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
                        .then((res) => { 
                          setFetch(true) 
                          success_create(
                            `تگ با موفقیت حذف شد !`
                          );
                        })   
                        .catch((err) => error_create())             
                    }}
                  >
                    حذف
                  </Button>
                </Space> 
          )},
        },
      ];
    
        if(fetch === true){
            axios.get(`${clientConfig.Url}/wp-json/wp/v2/tags?per_page=100`, {
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            }).then((res) => {
                dispatch(get_tags(res.data))
                setFetch(false)
            })
        }else{
    
        }
    
        return (
          <>
          <Dashboard>
            <h5 className="mb-5"> لیست تگ ها : </h5>  
            <Table columns={columns} dataSource={tags_list} bordered />
            <p className="text-center my-5 smartAlert"> لطفا گوشی را افقی نگه دارید </p>
          </Dashboard>
          </>
        );
}

export default Tags
