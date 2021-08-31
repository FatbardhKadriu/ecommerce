import React from 'react'
import Header from '../Header'
import { Row, Col, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { RiDashboardFill } from 'react-icons/ri'
import { FaShoppingCart } from 'react-icons/fa'
import { GrProductHunt } from 'react-icons/gr'
import { MdPages } from 'react-icons/md'
import { CgList, CgUserList } from 'react-icons/cg'



import './style.css'

const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.sidebar ? (
                    <Container fluid>
                        <Row>
                            <Col md={2} className="sidebar">
                                <ul>
                                    <li><NavLink exact to={'/'}><RiDashboardFill size={17} /> Dashboard</NavLink></li>
                                    <li><NavLink to={'/page'}><MdPages size={17} /> Page</NavLink></li>
                                    <li><NavLink to={'/category'}><CgList size={17} fill="black" /> Category</NavLink></li>
                                    <li><NavLink to={'/products'}><GrProductHunt size={17} />  Products</NavLink></li>
                                    <li><NavLink to={'/orders'}><FaShoppingCart size={17} /> Orders</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={10} style={{ marginLeft: 'auto', marginTop: '70px' }}>
                                {props.children}
                            </Col>
                        </Row>
                    </Container>
                ) : props.children
            }
        </>
    )
}

export default Layout
