import React from 'react'
import Header from '../Header'
import { Row, Col, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FaShoppingCart, FaHome, FaUser } from 'react-icons/fa'
import { GrProductHunt } from 'react-icons/gr'
import { RiAdminFill } from 'react-icons/ri'
import { MdPages } from 'react-icons/md'
import { CgList } from 'react-icons/cg'
import { useSelector } from 'react-redux'
import './style.css'

const Layout = (props) => {

    const auth = useSelector(state => state.auth)

    return (
        <>
            <Header />
            {
                props.sidebar ? (
                    <Container fluid>
                        <Row>
                            <Col md={2} style={{ width: '20%', flex: '0 0 20%', maxWidth: '20%' }} className="sidebar">
                                <ul>
                                    <h1><NavLink exact to={'/'}>Ecommerce</NavLink></h1>
                                    <hr style={{ background: 'white' }} />
                                    <h2>MNG</h2>
                                    <li><NavLink exact to={'/'}><FaHome size={17} /> Dashboard</NavLink></li>
                                    <li><NavLink to={'/page'}><MdPages size={17} /> Page</NavLink></li>
                                    <li><NavLink to={'/category'}><CgList size={17} fill="black" /> Category</NavLink></li>
                                    <li><NavLink to={'/products'}><GrProductHunt size={17} />  Products</NavLink></li>
                                    <li><NavLink to={'/orders'}><FaShoppingCart size={17} /> Orders</NavLink></li>
                                    <hr style={{ background: 'white' }} />
                                    <h2>USRMNG</h2>
                                    {
                                        auth.user.role === 'super-admin' &&
                                        (
                                            <li><NavLink to={'/admins'}><RiAdminFill size={18} /> Admins</NavLink></li>
                                        )
                                    }
                                    <li><NavLink to={'/users'}><FaUser size={16} /> Users</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={10} style={{ marginLeft: 'auto', marginTop: '70px', width: '80%', flex: '0 0 80%', maxWidth: '80%' }}>
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
