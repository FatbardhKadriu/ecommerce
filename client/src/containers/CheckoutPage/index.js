import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrder, getAddress, getCartItems } from '../../actions'
import Layout from '../../components/Layout'
import { MaterialInput, MaterialButton, Anchor } from '../../components/MaterialUI'
import PriceDetails from '../../components/PriceDetails'
import AddressForm from './AddressForm'
import CartPage from '../CartPage'
import Card from '../../components/UI/Card'
import './style.css'

const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div onClick={props.onClick} className={`checkoutHeader ${props.active && 'active'}`}>
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    )
}

const Address = ({
    adr,
    selectAddress,
    enableAddressEditForm,
    confirmDeliveryAddress,
    onAddressSubmit
}) => {
    return (
        <div className="flexRow addressContainer">
            <div>
                <input name="address" type="radio" onClick={() => selectAddress(adr)}
                />
            </div>
            <div className="flexRow sb addressinfo">
                {
                    !adr.edit ? (
                        <div style={{ width: '100%' }}>
                            <div className="addressDetails">
                                <div>
                                    <span className="addressName">
                                        {adr.name}
                                    </span>
                                    <span className="addressType">
                                        {adr.addressType}
                                    </span>
                                    <span className="addressMobileNumber">
                                        {adr.mobileNumber}
                                    </span>
                                </div>
                                {
                                    adr.selected && (
                                        <Anchor
                                            name="EDIT"
                                            onClick={() => enableAddressEditForm(adr)}
                                            style={{
                                                fontWeight: '500',
                                                color: '#2874f0',
                                                fontSize: '12px'
                                            }}
                                        />
                                    )
                                }
                            </div>
                            <div className="fullAddress">
                                {adr.address} <br /> {" "}
                                {`${adr.state} - ${adr.pinCode}`}
                            </div>
                            {
                                adr.selected &&
                                <MaterialButton
                                    title="DELIVERY HERE"
                                    onClick={() => confirmDeliveryAddress(adr)}
                                    style={{
                                        width: '250px',
                                        margin: '10px 0'
                                    }}
                                />
                            }
                        </div>
                    )
                        : (
                            <AddressForm
                                withoutLayout={true}
                                onSubmitForm={onAddressSubmit}
                                initialData={adr}
                                onCancel={() => { }}
                            />
                        )
                }
            </div>
        </div>
    )
}

const CheckoutPage = (props) => {

    const user = useSelector(state => state.user)
    const auth = useSelector(state => state.auth)
    const cart = useSelector(state => state.cart)

    const [newAddress, setNewAddress] = useState(false)
    const [address, setAddress] = useState([])
    const [confirmAddress, setConfirmAddress] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [orderSummary, setOrderSummary] = useState(false)
    const [orderConfirmation, setOrderConfirmation] = useState(false)
    const [paymentOptions, setPaymentOptions] = useState(false)
    const [confirmOrder, setConfirmOrder] = useState(false)

    const dispatch = useDispatch()

    const onAddressSubmit = (addr) => {
        setSelectedAddress(addr)
        setConfirmAddress(true)
        setOrderSummary(true)
    }

    const selectAddress = (addr) => {
        const updatedAddress = address.map(adr =>
            adr._id === addr._id
                ? { ...adr, selected: true }
                : { ...adr, selected: false }
        )
        setAddress(updatedAddress)
    }

    const confirmDeliveryAddress = (addr) => {
        setSelectedAddress(addr)
        setConfirmAddress(true)
        setOrderSummary(true)
    }

    const enableAddressEditForm = (addr) => {
        const updatedAddress = address.map(adr =>
            adr._id === addr._id
                ? { ...adr, edit: true }
                : { ...adr, edit: false }
        )
        setAddress(updatedAddress)
    }

    const userOrderConfirmation = () => {
        setOrderConfirmation(true)
        setOrderSummary(false)
        setPaymentOptions(true)
    }

    const onConfirmOrder = () => {
        const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
        }, 0)

        const totalItems = Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
        }, 0)

        const items = Object.keys(cart.cartItems).map(key =>
        ({
            productId: key,
            payablePrice: cart.cartItems[key].price,
            purchasedQty: cart.cartItems[key].qty
        }))

        const payload = {
            addressId: selectedAddress._id,
            totalAmount,
            items,
            paymentStatus: "pending"
        }

        console.log(payload)
        dispatch(addOrder(payload))
        setConfirmOrder(true)
    }

    useEffect(() => {
        auth.authenticate && dispatch(getAddress())
        auth.authenticate && dispatch(getCartItems())
    }, [auth.authenticate, dispatch])


    useEffect(() => {
        const address = user.address.map(addr => ({ ...addr, selected: false, edit: false }))
        setAddress(address)
    }, [user.address])

    if (confirmOrder) {
        return (
            <Layout>
                <Card>
                    <div>Thank you</div>
                </Card>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: 'flex-start' }}>
                <div className="checkoutContainer">

                    <CheckoutStep
                        stepNumber={'1'}
                        title={'LOGIN'}
                        active={!auth.authenticate}
                        body={
                            auth.authenticate ?
                                <div className="loggedInId">
                                    <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                                    <span style={{ margin: '0 5px' }}>{auth.user.email}</span>
                                </div>
                                :
                                <div>
                                    <MaterialInput label="Email" />
                                </div>
                        }
                    />

                    <CheckoutStep
                        stepNumber={'2'}
                        title={'DELIVERY ADDRESS'}
                        active={!confirmAddress && auth.authenticate}
                        body={
                            <>
                                {
                                    confirmAddress ? (
                                        <div className="stepCompleted">
                                            {`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}
                                        </div>
                                    )
                                        : auth.authenticate &&
                                        (
                                            address.map((adr) => (
                                                <Address
                                                    selectAddress={selectAddress}
                                                    enableAddressEditForm={enableAddressEditForm}
                                                    confirmDeliveryAddress={confirmDeliveryAddress}
                                                    onAddressSubmit={onAddressSubmit}
                                                    adr={adr}
                                                />
                                            ))
                                        )
                                }
                            </>
                        }
                    />
                    {
                        confirmAddress ? null :
                            newAddress ?
                                <AddressForm
                                    onSubmitForm={onAddressSubmit}
                                    onCancel={() => { }}
                                /> :
                                <CheckoutStep
                                    title={'ADD NEW ADDRESS'}
                                    stepNumber={'+'}
                                    active={false}
                                    onClick={() => setNewAddress(true)}
                                />
                    }

                    <CheckoutStep
                        stepNumber={'3'}
                        title={'ORDER SUMMARY'}
                        active={orderSummary}
                        body={
                            orderSummary ?
                                <CartPage onlyCartItems={true} /> : orderConfirmation ?
                                    <div className="stepCompleted">
                                        {Object.keys(cart.cartItems).length} products
                                    </div> : null
                        }
                    />

                    {
                        orderSummary && (
                            <Card>
                                <div className="flexRow sb" style={{ padding: '0 20px', alignItems: 'center' }}>
                                    <p style={{ fontSize: '12px' }}>Order confirmation email will be sent to <strong>{auth.user.email}</strong></p>
                                    <MaterialButton
                                        onClick={userOrderConfirmation}
                                        title="CONTINUE" style={{ width: '200px' }}
                                    />
                                </div>
                            </Card>
                        )
                    }



                    <CheckoutStep
                        stepNumber={'4'}
                        title={'PAYMENT OPTIONS'}
                        active={paymentOptions}
                        body={
                            paymentOptions &&
                            <div className="stepCompleted">
                                <div className="flexRow" style={{ alignItems: 'center', padding: '20px' }}>
                                    <input type="radio" name="paymentOption" value="cod" />
                                    <div>Cash on delivery</div>
                                </div>
                                <MaterialButton
                                    title="CONFIRM ORDER"
                                    onClick={onConfirmOrder}
                                    style={{ width: '200px' }}
                                />
                            </div>
                        }
                    />


                </div>
                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                />
            </div>
        </Layout>
    )
}

export default CheckoutPage
