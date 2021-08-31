import React from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './style.css'
import { useSelector } from 'react-redux'

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
                }}
            >
                <Card
                    headerLeft={<h2>Category</h2>}
                    headerRight={<p>Total {category.totalCategories}</p>}
                >
                    <Link to="/category">Add/delete/update categories</Link>
                </Card>
                <Card
                    headerLeft={<h2>Products</h2>}
                    headerRight={<p>Total {product.totalProducts}</p>}
                >
                    <Link to="/products">Add/delete/update products</Link>
                </Card>
                <Card
                    headerLeft={<h2>Orders</h2>}
                    headerRight={<p>Total {order.totalOrders}</p>}
                >
                    <Link to="/orders">Check out orders</Link>
                </Card>
            </Card>
        </Layout>
    )
}

export default Home
