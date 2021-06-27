import React from 'react'
import { Link } from 'react-router-dom'
import './DashNavbar.css'

const DashNavbar = () => {

    return (
        <div>
            <div className="sidebar">
                <ul className="sideMenu">
                    
                    <li><Link to="/dashboard"> داشبورد </Link></li>
                    <li><Link to="/newuser"> ساخت کاربر </Link></li>
                    <li><Link to="/newpost"> ساخت پست </Link></li>
                    <li><Link to="/postlist"> لیست پست ها </Link></li>
                    <li><Link to="/userlist"> لیست کاربران </Link></li>
                    <li><Link to="/tags"> لیست تگ ها </Link></li>
                    <li><Link to="/category"> دسته بندی </Link></li>

                    <br /><br />
                    <li className="text-center"><Link to="/">سایت</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default DashNavbar
