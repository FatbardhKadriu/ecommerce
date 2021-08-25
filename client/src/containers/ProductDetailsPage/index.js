import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsById } from '../../actions';
import Layout from '../../components/Layout';
import {
  IoIosArrowForward,
  IoIosStar,
  IoMdCart
} from 'react-icons/io';
import { BiEuro } from 'react-icons/bi';
import { AiFillThunderbolt } from 'react-icons/ai';
import { MaterialButton } from '../../components/MaterialUI';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';
import { addToCart } from '../../actions';


const ProductDetailsPage = (props) => {

  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  useEffect(() => {
    const { productId } = props.match.params;
    const payload = {
      params: {
        productId
      }
    }
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  return (
    <Layout>
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {
              product.productDetails.productPictures.map((thumb, index) =>
                <div className="thumbnail">
                  <a href={`${generatePublicUrl(thumb.img)}`}><img src={generatePublicUrl(thumb.img)} alt={thumb.img} /></a>
                </div>
              )
            }
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <a href={`${generatePublicUrl(product.productDetails.productPictures[0].img)}`}>
                <img src={generatePublicUrl(product.productDetails.productPictures[0].img)}
                  alt={`${product.productDetails.productPictures[0].img}`} />
              </a>
            </div>

            {/* action buttons */}
            <div className="flexRow">
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: '5px'
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails
                  const img = product.productDetails.productPictures[0].img
                  dispatch(addToCart({ _id, name, price, img }))
                  props.history.push('/cart')
                }}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: '5px'
                }}
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        
        <div>
          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li><a href="/home">Home</a><IoIosArrowForward /></li>
              <li><a href="/mobiles">Mobiles</a><IoIosArrowForward /></li>
              <li><a href="/samsung">Samsung</a><IoIosArrowForward /></li>
              <li><a href={product.productDetails.name}>{product.productDetails.name}</a></li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.productDetails.name}</p>
            <div>
              <span className="ratingCount">4.3 <IoIosStar /></span>
              <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
            </div>
            <div className="extraOffer">Extra <BiEuro />150 off </div>
            <div className="flexRow priceContainer">
              <span className="price"><BiEuro />{product.productDetails.price}</span>
              <span className="discount" style={{ margin: '0 10px' }}>22% off</span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p style={{
                color: '#212121',
                fontSize: '14px',
                fontWeight: '600'
              }}>Available Offers</p>
              <p style={{ display: 'flex' }}>
                <span style={{
                  width: '100px',
                  fontSize: '12px',
                  color: '#878787',
                  fontWeight: '600',
                  marginRight: '20px'
                }}>Description</span>
                <span style={{
                  fontSize: '12px',
                  color: '#212121',
                }}>{product.productDetails.description}</span>
              </p>
              Reviews: <br/>
              {
                product.productDetails.reviews.map((review, index) => (
                  <p>{review}</p>
                ))
              }
            </div>
          </div>


        </div>
      </div>
    </Layout>
  )

}

export default ProductDetailsPage