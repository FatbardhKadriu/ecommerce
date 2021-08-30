import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../../actions'
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import Price from '../../components/UI/Price'
import { generatePublicUrl } from '../../urlConfig'
import './style.css'

const OrderDetailsPage = (props) => {
    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.user.orderDetails)

    const totalItem = orderDetails?.items?.reduce(function (qty, item) {
        return qty + item.purchasedQty
    }, 0)
    const totalPrice = orderDetails?.items?.reduce(function (qty, item) {
        return qty + item.purchasedQty * item.payablePrice
    }, 0)

    useEffect(() => {
        const payload = {
            orderId: props.match.params.orderId
        }
        dispatch(getOrder(payload))
    }, [])


    if (!(orderDetails && orderDetails.address)) {
        return null
    }

    return (
        <Layout>
            <div
                style={{
                    width: "1160px",
                    margin: "10px auto",
                }}
            >
                <Card
                    style={{
                        margin: "10px 0",
                    }}
                >
                    <div className="delAdrContainer">
                        <div className="delAdrDetails">
                            <div className="delTitle">Delivery Address</div>
                            <div className="delName">{orderDetails.address.name}</div>
                            <div className="delAddress">{orderDetails.address.address}</div>
                            <div className="delPhoneNumber">
                                Phone number {orderDetails.address.mobileNumber}
                            </div>
                        </div>
                        <div className="delMoreActionContainer">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: 'row',
                                    padding: "20px 0",
                                    margin: "10px 0",
                                    alignItems: 'center'
                                }}
                            >
                                <div className="delTitle">
                                    <div style={{ padding: "25px 50px" }}>
                                        <div className="orderTrack">
                                            {orderDetails.orderStatus.map((status) => (
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
                                    </div>
                                </div>
                                <div style={{ fontWeight: "500", fontSize: 14, marginLeft: '25px' }}>
                                    {orderDetails.orderStatus[3].isCompleted &&
                                        `Delivered on ${formatDate2(orderDetails.orderStatus[3].date)}`}
                                </div>
                            </div>
                            <br />
                            <div className="delName">
                                <p>Download Invoice</p>
                                <Button variant="success" onClick={() => alert("Downloaded")}>Get</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card headerLeft={`Products (${totalItem})`} headerRight={<span>Total price: <strong> {totalPrice}&euro;</strong></span>}
                    style={{
                        margin: "10px 0",
                    }}>

                    {orderDetails.items.map((item, index) => (
                        <Card
                            key={index}
                            style={{ display: "flex", flexDirection: 'row', padding: "4px 0" }}
                        >
                            <div className="flexRow"

                            >
                                <div className="delItemImgContainer"
                                    style={{ margin: '0 20px' }}
                                >
                                    <img src={generatePublicUrl(item.productId.productPictures[0].img)} alt="" />
                                </div>
                                <div style={{ width: "250px", alignItems: 'center' }}>
                                    <div className="delItemName">{item.productId.name}</div>
                                    <Price size={15} value={item.payablePrice} />
                                    <div style={{ fontSize: '12px' }}>Quantity: {item.purchasedQty}</div>
                                </div>
                            </div>


                        </Card>
                    ))}
                </Card>
            </div>
        </Layout>
    )
}

export default OrderDetailsPage
