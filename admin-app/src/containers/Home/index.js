import React from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'
import hello from '../../images/hello.png'
import Chart from '../Charts/Chart'
import './style.css'

const Home = () => {

    const category = useSelector(state => state.category)
    const product = useSelector(state => state.product)
    const order = useSelector(state => state.order)
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)

    return (
        <Layout sidebar>
            <main>
                <div className="main__container">
                    <div className="main__title">
                        <img src={hello} alt={'hello'} />
                        <div className="main__greeting">
                            <h1>Hello {auth.user.fullName}</h1>
                            <p>Welcome to your admin dashboard</p>
                        </div>
                    </div>
                    <div className="main__cards">
                        <div className="home_card">
                            <i className="fa fa-user-o fa-2x text-lightblue"></i>
                            <div className="card_inner">
                                <p className="text-primary-p">Number of Users</p>
                                <span className="font-bold text-title">{user.totalUsers}</span>
                            </div>
                        </div>
                        <div className="home_card">
                            <i className="fa fa-list fa-2x text-red"></i>
                            <div className="card_inner">
                                <p className="text-primary-p">Number of categories</p>
                                <span className="font-bold text-title">{category.totalCategories}</span>
                            </div>
                        </div>
                        <div className="home_card">
                            <i className="fa fa-product-hunt fa-2x text-yellow"></i>
                            <div className="card_inner">
                                <p className="text-primary-p">Number of products</p>
                                <span className="font-bold text-title">{product.totalProducts}</span>
                            </div>
                        </div>
                        <div className="home_card">
                            <i className="fa fa-shopping-cart fa-2x text-green"></i>
                            <div className="card_inner">
                                <p className="text-primary-p">Number of Orders</p>
                                <span className="font-bold text-title">{order.totalOrders}</span>
                            </div>
                        </div>
                    </div>
                    <div className="charts">
                        <div className="charts__left">
                            <div className="charts__left__title">
                                <div>
                                    <h1>Daily Reports</h1>
                                    <p>Prishtine, Kosove</p>
                                </div>
                                <i className="fa fa-eur"></i>
                            </div>
                            <Chart />
                        </div>
                        <div className="charts__right">
                            <div className="chart__right__title">
                                <div>
                                    <h1 style={{ fontWeight: 'bold' }}>Stats Reports</h1>
                                    <p>Prishtine, Kosove</p>
                                </div>
                                <i className="fa fa-use"></i>
                            </div>
                            <div className="charts__right__cards">
                                <div className="card1">
                                    <h2 style={{fontSize: '36px'}}>Items sold</h2>
                                    <p>{order.itemsSold}</p>
                                </div>
                                <div className="card2">
                                    <h1>Sales</h1>
                                    <p>€{order.sales?.toLocaleString()}</p>
                                </div>
                                <div className="card3">
                                    <h1>Users</h1>
                                    <p>{user.totalUsers}</p>
                                </div>
                                <div className="card4">
                                    <h1>Orders</h1>
                                    <p>{order.totalOrders}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default Home
