import React, { useState } from 'react'
import './Navbar.css'
import { Container, Row, Col } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { check_login } from './../redux/actions/action';


const closemenu = () => {
    document.getElementById("menu").style.transform = "translateX(100%)"
}

const openmenu = () => {
    document.getElementById("menu").style.transform = "translateX(0)"
}

const Navbar = () => {

    const login = useSelector(state => state.login)
    const role = useSelector(state => state.role)
    const dispatch = useDispatch()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <div>
            <header className="header">
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="res_menu_handle">
                                <span id="menu_res" onClick={openmenu} style={{cursor:'pointer'}}> <i className="fa fa-bars"></i> </span>
                                <div className="small-logo">
                                    <a href="#"><img src="/image/logo-1.png" alt="logo" /></a>
                                </div>
                            </div>
                            <div className="menu pt-3" id="menu">
                                <span className="close" onClick={closemenu}> &times; </span>
                                <nav>
                                    <ul>
                                        <li><Link to="/">صفحه اصلی</Link></li>
                                        <li><Link to="/menu">محصولات</Link></li>
                                        <li><Link to="/articles">مقالات</Link></li>
                                        <li><Link to="/cart"> سبد خرید </Link></li>

                                        <li>
                                            {(login === true)
                                            ? (
                                            <Dropdown group isOpen={dropdownOpen} size="sm" toggle={toggle} >
                                                <DropdownToggle caret className="dashBtn">
                                                    {role}  
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem><Link to="/dashboard"> داشبورد </Link></DropdownItem>
                                                    <DropdownItem><span onClick={ () => {
                                                        dispatch(check_login(false))
                                                        window.localStorage.clear()
                                                        }
                                                    }> خروج </span></DropdownItem>
                                                </DropdownMenu>
                                                </Dropdown>
                                            )
                                            : <Link to="/login"> ورود </Link>
                                            }
                                        </li>

                                    </ul>
                                    <Link to="#" className="logo">
                                        <img src="/image/logo-1.png" alt="logo" />
                                    </Link>
                                </nav>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </header>
        </div>
    )
}

export default Navbar
