import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import { Button, Form, FormControl } from 'react-bootstrap'

import './style.css'
import { getCustomerOrders ,updateOrder, searchOrder as searchOrderAction } from '../../actions'

const Orders = () => {

    const order = useSelector(state => state.order)
    const [type, setType] = useState('')
    const [orderId, setOrderId] = useState('')
    const dispatch = useDispatch()

    const searchOrder = (orderId) => {
        if (orderId === "") return
        dispatch(searchOrderAction(orderId))
        console.log(orderId)
    }

    const onOrderUpdate = (orderId) => {
        const payload = {
            orderId,
            type
        }
        dispatch(updateOrder(payload))
    }

    const formatDate = (date) => {
        if (date) {
            const d = new Date(date)
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
        }
        return ""
    }

    useEffect(() => {
        if (orderId === "") {
            dispatch(getCustomerOrders())
        }
    }, [orderId])

    return (
        <Layout sidebar>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Form className="d-flex">
                    <FormControl
                        style={{ width: '300px' }}
                        type="search"
                        placeholder="Search by id"
                        value={orderId}
                        onChange={e => setOrderId(e.target.value)}
                        className="mr-2"
                        aria-label="Search"
                    />
                    <Button
                        onClick={() => searchOrder(orderId)}
                        variant="outline-success">Search</Button>
                </Form>
            </div>
            {order.orders.map((orderItem, index) => (
                <Card
                    style={{
                        margin: "10px 0",
                    }}
                    key={index}
                    headerLeft={<h6>OrderID: {orderItem._id}</h6>}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "50px 50px",
                            alignItems: "center",
                        }}
                    >
                        <div>
                            <div className="title">Items</div>
                            {orderItem.items.map((item, index) => (
                                <div className="value" key={index}>
                                    {item.productId?.name}
                                </div>
                            ))}
                        </div>
                        <div>
                            <span className="title">Total Price</span>
                            <br />
                            <span className="value">{orderItem.totalAmount} &euro;</span>
                        </div>
                        <div>
                            <span className="title">Payment Type</span> <br />
                            <span className="value">{orderItem.paymentType}</span>
                        </div>
                        <div>
                            <span className="title">Payment Status</span> <br />
                            <span className="value">{orderItem.paymentStatus}</span>
                        </div>
                    </div>
                    <div
                        style={{
                            boxSizing: "border-box",
                            padding: "100px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <div className="orderTrack">
                            {orderItem.orderStatus.map((status) => (
                                <div
                                    className={`orderStatus ${status.isCompleted ? "active" : ""
                                        }`}
                                >
                                    <div
                                        className={`point ${status.isCompleted ? "active" : ""}`}
                                    ></div>
                                    <div className="orderInfo">
                                        <div className="status">{status.type}</div>
                                        <div className="date">{formatDate(status.date)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            style={{
                                padding: "0 50px",
                                boxSizing: "border-box",
                            }}
                        >
                            <select className="form-control form-control-sm" onChange={(e) => setType(e.target.value)}>
                                <option value={""}>Select status</option>
                                {orderItem.orderStatus.map((status) => {
                                    return (
                                        <>
                                            {!status.isCompleted ? (
                                                <option key={status.type} value={status.type}>
                                                    {status.type}
                                                </option>
                                            ) : null}
                                        </>
                                    );
                                })}
                            </select>
                        </div>

                        <div
                            style={{
                                padding: "0 50px",
                                boxSizing: "border-box",
                            }}
                        >
                            <Button onClick={() => onOrderUpdate(orderItem._id)}>
                                Confirm
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </Layout>
    )
}

export default Orders
