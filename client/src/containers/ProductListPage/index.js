import React from 'react'
import Layout from '../../components/Layout'
import getParams from '../../utils/getParams'
import ClothingAndAccessories from './ClothingAndAccessories'
import ProductPage from './ProductPage'
import ProductStore from './ProductStore'
import './style.css'

const ProductListPage = (props) => {

    const renderProduct = () => {
        const params = getParams(props.location.search)

        let content = null
        switch (params.type) {
            case 'store':
                content = <ProductStore {...props} />
                break;
            case 'page':
                content = <ProductPage {...props} />
                break
            default:
                content = <ClothingAndAccessories {...props} />
                break;
        }
        return content
    }

    return (
        <Layout>
            {renderProduct()}
        </Layout>
    )
}

export default ProductListPage
