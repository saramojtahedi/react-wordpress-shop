import axios from 'axios'
import React, { useState } from 'react'
import { Col, Container, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import Navbar from '../../Navbar'
import './Login.css'
import clientConfig from "./../../../clientConfig"
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { check_login, user_role, change_loader} from '../../../redux/actions/action'
import { toast } from 'react-toastify'


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const loader = useSelector(state => state.loader)
    const login = useSelector(state => state.login)
    const role = useSelector(state => state.role)
    const dispatch = useDispatch()


    const handleUserChange = (value) => {
        setUsername(value.target.value);
      };
    
      const handlePasswordChange = (value) => {
        setPassword(value.target.value);
      };

    const handleSubmit = () => {
        const data = { username , password }

        axios.post(`${clientConfig.Url}/wp-json/jwt-auth/v1/token` , data , {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then ((res) => {
            dispatch(check_login(true))
            dispatch(user_role(res.data.user_nicename))
            dispatch(change_loader(true))
            window.localStorage.setItem("nic_name" , res.data.user_nicename)
            window.localStorage.setItem("token" , res.data.token)
            setUsername("")
            setPassword("")
            toast.success(" خوش آمدید ")
        })
        .catch((err) => {
            toast.error(" مشکلی پیش آمده است ")
        })
    }

    if(window.localStorage.getItem("token") && login === true) {
        return <Redirect to="/" />
    } else {
        return (
            <div>
                <Navbar />
                <Container>
                    <Row>
                        <Col md={5} xs={12} className="mx-auto">
                            <h3 className="text-center pt-5 pb-3"> صفحه ورود </h3>
                            <Form>
                                <FormGroup className="form_group pt-3">
                                    <Label for="exampleEmail">نام کاربری ( user )</Label>
                                    <Input type="username" onChange={handleUserChange } />
                                </FormGroup>
                                <FormGroup className="form_group py-2 pb-4">
                                    <Label for="examplePassword">رمز عبور ( user )</Label>
                                    <Input type="password" onChange={handlePasswordChange } />
                                </FormGroup>
                                <Button onClick={handleSubmit}> ورود </Button>
                            </Form>
                        </Col>
                    </Row>
    
                </Container>
            </div>
        )
    }
}

export default Login
