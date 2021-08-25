import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../actions'
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import { generatePublicUrl } from '../../urlConfig'
import './style.css'

const OrdersPage = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getOrders())
    }, [])


    return (
        <Layout>
            {
                user.orders.map(order => {
                    return order.items.map(item => (
                        <Card style={{ maxWidth: '1200px', margin: '10px auto' }}>
                            <div className="orderItemContainer">
                                <div className="orderImgContainer">
                                    <img className="orderImg"
                                        src={generatePublicUrl(item.productId.productPictures[0].img)} />
                                </div>
                                <div>{item.productId.name}</div>
                                <div>{item.payablePrice} &euro;</div>
                                <div>{order.paymentStatus}</div>
                            </div>
                        </Card>
                    ))
                })
            }

        </Layout>
    )
}

export default OrdersPage
