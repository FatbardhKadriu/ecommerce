import React from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import { Link } from 'react-router-dom'
import './style.css'

const Home = () => {

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
                <Card headerLeft={'Page'}>
                    <Link to="/page">Create new page</Link>
                </Card>
                <Card headerLeft={'Category'}>
                    <Link to="/category">Add/delete/update categories</Link>
                </Card>
                <Card headerLeft={'Product'}>
                    <Link to="/products">Add/delete/update products</Link>
                </Card>
                <Card headerLeft={'Orders'}>
                    <Link to="/orders">Check out orders</Link>
                </Card>
            </Card>
        </Layout>
    )
}

export default Home
