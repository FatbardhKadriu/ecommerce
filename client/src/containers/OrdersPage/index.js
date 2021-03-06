import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../actions'
import Layout from '../../components/Layout'
import { Breed } from '../../components/MaterialUI'
import Card from '../../components/UI/Card'
import { generatePublicUrl } from '../../urlConfig'
import { IoIosArrowForward } from 'react-icons/io'
import { BiEuro } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import './style.css'


const OrdersPage = (props) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        auth.authenticate &&
            dispatch(getOrders())
    }, [auth.authenticate])

    // useEffect(() => {
    //     !localStorage.getItem('token') &&
    //         props.history.push('/')
    // }, [])

    return (
        <Layout>
            <div style={{ maxWidth: '1160px', margin: '5px auto' }}>
                <Breed
                    breed={[
                        { name: 'Home', href: "/" },
                        { name: 'My Account', href: "/account" },
                        { name: 'My Orders', href: "/account/orders" },
                    ]}
                    breedIcon={<IoIosArrowForward />}
                />
                {
                    user.orders.map(order => {
                        return order.items.map(item => (
                            <Card style={{ margin: '5px auto' }}>
                                <Link
                                    to={`/order_details/${order._id}`}
                                    className="orderItemContainer"
                                >
                                    <div className="orderImgContainer">
                                        <img className="orderImg" alt={`${item.productId?.name}-img`}
                                            src={generatePublicUrl(item.productId?.productPictures[0].img)} />
                                    </div>
                                    <div className="orderRow">
                                        <div className="orderName">{item.productId?.name}</div>
                                        <div className="orderPrice">{item.payablePrice} <BiEuro /></div>
                                        <div>{order.paymentStatus}</div>
                                    </div>
                                </Link>
                            </Card>
                        ))
                    })
                }
            </div>

        </Layout>
    )
}

export default OrdersPage
