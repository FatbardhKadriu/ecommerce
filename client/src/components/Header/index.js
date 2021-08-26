import React, { useEffect, useState } from 'react'
import flipkartLogo from '../../images/logo/flipkart.png'
import goldenStar from '../../images/logo/golden-star.png'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineGift, AiOutlineHeart } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import { GoArchive } from 'react-icons/go'
import { RiCoupon3Line } from 'react-icons/ri'
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from '../MaterialUI';
import { login, signout, signup as signupAction } from '../../actions'
import Cart from '../../components/UI/Cart'
import './style.css'

const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector(state => state.auth)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const userLogin = () => {
    dispatch(login({ email, password }))
  }

  const userSignUp = () => {
    const user = { firstName, lastName, email, password }
    if (firstName === "" || lastName === "" || email === "" || password === "")
      return

    dispatch(signupAction(user))
  }

  const logout = () => {
    dispatch(signout())
  }

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false)
    }
  }, [auth.authenticate])

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <span className="fullName">
            {auth.user.fullName}
          </span>
        }
        menus={[
          { label: 'My Profile', href: '', icon: <CgProfile color="#2A75F0" /> },
          {
            label: 'Orders',
            href: '/account/orders',
            icon: <GoArchive style={{ fill: "#2A75F0" }} />
          },
          { label: 'Wishlist', href: '', icon: <AiOutlineHeart style={{ fill: "#2A75F0" }} /> },
          { label: 'Coupons', href: '', icon: <RiCoupon3Line style={{ fill: "#2A75F0" }} /> },
          { label: 'Rewards', href: '', icon: <AiOutlineGift style={{ fill: "#2A75F0" }} /> },
          { label: 'Logout', href: '', icon: <BiLogOut color="#2A75F0" />, onClick: logout },
        ]}
      />
    )
  }

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className='loginButton'
            onClick={() => {
              setSignup(false)
              setLoginModal(true)
            }}
          >
            Login
          </a>
        }
        menus={[
          { label: 'My Profile', href: '', icon: <CgProfile color="#2A75F0" /> },
          {
            label: 'Orders', href: 'account/orders',
            icon: <GoArchive style={{ fill: "#2A75F0" }} />,
            onClick: () => {
              !auth.authenticate && setLoginModal(true)
            }
          },
          { label: 'Wishlist', href: '', icon: <AiOutlineHeart style={{ fill: "#2A75F0" }} /> },
          { label: 'Rewards', href: '', icon: <AiOutlineGift style={{ fill: "#2A75F0" }} /> },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              className="signupBtn"
              onClick={() => {
                setLoginModal(true)
                setSignup(true)
              }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    )
  }

  return (
    <div className="header">
      <Modal
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      >
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              {
                signup ? (
                  <>
                    <h2>Looks like you're new here!</h2>
                    <p>Sign up with your email address to get started</p>
                  </>
                ) :
                  <>
                    <h2>Login</h2>
                    <p>Get access to your Orders, Wishlist and Recommendations</p>
                  </>
              }
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {
                  signup && (
                    <p style={{ fontSize: '12px', color: 'red' }}>{auth.error}</p>
                  )
                }
                {
                  signup && (
                    <MaterialInput
                      type="text"
                      label="Enter First Name"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                    />
                  )
                }
                {
                  signup && (
                    <MaterialInput
                      type="text"
                      label="Enter Last Name"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                    />
                  )
                }
                <MaterialInput
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MaterialInput
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                //   rightElement={<a href="#">Forgot?</a>}
                />

                <MaterialButton
                  title={signup ? 'Register' : 'Login'}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    margin: '40px 0 20px 0'
                  }}
                  onClick={signup ? userSignUp : userLogin}
                />
                {
                  signup && (
                    <MaterialButton
                      title={'Existing user? Log in'}
                      bgColor="#ffffff"
                      textColor="#2874f0"
                      style={{
                        margin: '30px 0 10px 0',
                        fontSize: '12px'
                      }}
                      onClick={() => setSignup(false)}
                    />
                  )
                }

                <div className="createAccBtn">
                  {
                    !signup && (
                      <button
                        onClick={() => setSignup(true)}
                        style={{
                          background: 'white',
                          border: 'none',
                          color: '#2874f0',
                          textAlign: 'center',
                          fontSize: '12px',
                          margin: '0 0 0 50px'
                        }}>
                        New to Flipkart? Create an account
                      </button>
                    )
                  }
                </div>

              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <a href="/">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: '-10px', color: 'white', textDecoration: 'none' }} href="/">
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        <div style={{
          padding: '0 10px'
        }}>
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'search for products, brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color: '#2874f0'
              }} />
            </div>

          </div>
        </div>
        <div className="rightMenu">
          {
            auth.authenticate ?
              renderLoggedInMenu() : renderNonLoggedInMenu()
          }
          <DropdownMenu
            menu={
              <a href="/more" className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: 'Notification Preference', href: '', icon: null },
              { label: 'Sell on flipkart', href: '', icon: null },
              { label: '24x7 Customer Care', href: '', icon: null },
              { label: 'Advertise', href: '', icon: null },
              { label: 'Download App', href: '', icon: null }
            ]}
          />
          <div>
            <a className="cart" href="/cart">
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )

}

export default Header