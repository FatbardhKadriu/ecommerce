import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generatePublicUrl } from '../../../urlConfig'
import { getProductsBySlug } from '../../../actions'
import './style.css'

const ProductStore = (props) => {

    const product = useSelector(state => state.product)
    const [priceRange, setPriceRange] = useState({
        under500:  500,
        under700:  700,
        under1000: 1000,
        under1500: 1500,
        under2000: 2000
    })

    const dispatch = useDispatch()
    useEffect(() => {

        const { match } = props;

        dispatch(getProductsBySlug(match.params.slug))
    }, [])

    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div className="card">
                            <div className="cardHeader">
                                <div>{props.match.params.slug} mobile under {priceRange[key]}</div>
                                <button>View all</button>
                            </div>
                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map(product =>
                                        <div className="productContainer">
                                            <div className="productImgContainer">
                                                <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                                            </div>
                                            <div className="productInfo">
                                                <div style={{ margin: '5px 0' }}>{product.name}</div>
                                                <div>
                                                    <span>4.3&nbsp;</span>
                                                    <span>3353</span>
                                                </div>
                                                <div className="productPrice">{product.price}</div>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ProductStore