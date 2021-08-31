import React from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { AiOutlineShop } from 'react-icons/ai'
import { TiThList } from 'react-icons/ti'
import { CgShoppingCart } from 'react-icons/cg'
import { Link } from 'react-router-dom'

const Home = () => {

    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)
    const order = useSelector(state => state.order)

    return (
        <Layout sidebar>
            <Card
                className="sb"
                style={{
                    padding: '50px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}
            >
                <Row
                    style={{
                        border: '1px solid #cecece',
                        borderRadius: '3%',
                        width: '336px',
                        height: '120px',
                        padding: '5px'
                    }}
                >
                    <Col
                        className="iconContainer"
                        md={3}
                        style={{
                            background: '#FC9208',
                            margin: '-20px 0px 0px 20px',
                            borderRadius: '5px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            height: '50%',
                        }}
                    >
                        <TiThList style={{ marginTop: '10px' }} color="white" size={35} />
                    </Col>
                    <Col md={{ span: 3, offset: 5 }}>
                        <h6>Categories</h6>
                    </Col>
                    <Col md={{ span: 3, offset: 9 }}>
                        <h4>{category.totalCategories ? category.totalCategories : 0}</h4>
                    </Col>
                    <hr style={{ color: "#cecece" }} />
                    <Row >
                        <Col>
                            <Link
                                style={{ color: "black", textDecoration: 'none' }}
                                to="/category">
                                <p>Add/delete/update categories</p>
                            </Link>
                        </Col>
                    </Row>
                </Row>
                <Row
                    style={{
                        border: '1px solid #cecece',
                        borderRadius: '3%',
                        width: '336px',
                        height: '120px',
                        padding: '5px'
                    }}
                >
                    <Col
                        md={3}
                        style={{
                            background: '#4CA750',
                            margin: '-20px 0px 0px 20px',
                            borderRadius: '5px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            height: '50%',
                        }}
                    >
                        <AiOutlineShop style={{ marginTop: '7px' }} color="white" size={40} />
                    </Col>
                    <Col md={{ span: 3, offset: 5 }}>
                        <h6>Products</h6>
                    </Col>
                    <Col md={{ span: 3, offset: 9 }}>
                        <h4>{product.totalProducts ? product.totalProducts : 0}</h4>
                    </Col>
                    <hr style={{ color: "#cecece" }} />
                    <Row >
                        <Col>
                            <Link
                                style={{ color: "black", textDecoration: 'none' }}
                                to="/products">
                                <p>Add/delete/edit products</p>
                            </Link>
                        </Col>
                    </Row>
                </Row>

                <Row
                    style={{
                        border: '1px solid #cecece',
                        borderRadius: '3%',
                        width: '336px',
                        height: '120px',
                        padding: '5px'
                    }}
                >
                    <Col
                        md={3}
                        style={{
                            background: '#E73F3B',
                            margin: '-20px 0px 0px 20px',
                            borderRadius: '5px',
                            textAlign: 'center',
                            verticalAlign: 'middle',
                            height: '50%',
                        }}
                    >
                        <CgShoppingCart style={{ marginTop: '8px' }} color="white" size={35} />
                    </Col>
                    <Col md={{ span: 3, offset: 5 }}>
                        <h6>Orders</h6>
                    </Col>
                    <Col md={{ span: 3, offset: 9 }}>
                        <h4>{order.totalOrders ? order.totalOrders : 0}</h4>
                    </Col>
                    <hr style={{ color: "#cecece" }} />
                    <Row >
                        <Col>
                            <Link
                                style={{ color: "black", textDecoration: 'none' }}
                                to="/orders">
                                <p>Check out orders</p>
                            </Link>
                        </Col>
                    </Row>
                </Row>

            </Card>
        </Layout>
    )
}

export default Home
