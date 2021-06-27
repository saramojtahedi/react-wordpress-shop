import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import DashNavbar from '../DashNavbar'
import "antd/dist/antd.css";
import './Dashboard.css'
import axios from 'axios';
import clientConfig from '../../../clientConfig';
import { get_users } from "../../../redux/actions/action";


const token = window.localStorage.getItem("token");

const Dashboard = (props) => {

   const login = useSelector((state) => state.login)
   const dispatch = useDispatch();

   useEffect(() => {
       axios.get(`${clientConfig.Url}/wp-json/wp/v2/users` , {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((users) => dispatch(get_users(users.data)))
   } , [])

   if( login === true ) {
    return (
        <div className="main_dash_container">
            <DashNavbar />
            <main className="main_dash_content">
                {props.children}
            </main>
        </div>
    )
   } else {
       return ( <Redirect to="/404" /> )
   }
}

export default Dashboard
