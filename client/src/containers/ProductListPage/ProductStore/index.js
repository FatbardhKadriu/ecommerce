import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generatePublicUrl } from '../../../urlConfig'
import { getProductsBySlug } from '../../../actions'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from '../../../components/UI/Card'
import './style.css'

const ProductStore = (props) => {

    const product = useSelector(state => state.product)
    const priceRange = {
        under500: 500,
        under700: 700,
        under1000: 1000,
        under1500: 1500,
        under2000: 2000
    }

    const dispatch = useDispatch()
    useEffect(() => {

        const { match } = props;

        dispatch(getProductsBySlug(match.params.slug))
    })

    return (
        <>
            {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <Card
                            headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
                            headerRight={<Button variant="primary">View all</Button>}
                            style={{
                                width: 'calc(100% - 40px)',
                                margin: '20px'
                            }}
                        >
                            <div style={{ display: 'flex' }}>
                                {
                                    product.productsByPrice[key].map(product =>
                                        <Link
                                            to={`/${product.slug}/${product._id}/p`}
                                            style={{ display: 'block', cursor: 'pointer' }}
                                            className="productContainer">
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
                                        </Link>
                                    )
                                }
                            </div>
                        </Card>
                    )
                })
            }
        </>
    )
}

export default ProductStore
