import React, { useEffect, useState } from 'react'
import flipkartLogo from '../../images/logo/flipkart.png'
import goldenStar from '../../images/logo/golden-star.png'
import { Form, FormLabel } from 'react-bootstrap'
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
import { authConstants } from '../../actions/constants'
import { useHistory } from 'react-router-dom'

const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [optionalPart, setOptionalPart] = useState(false)
  const [gender, setGender] = useState('')
  const [birthdate, setBirthDate] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const auth = useSelector(state => state.auth)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const history = useHistory()

  const userLogin = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
    dispatch({ type: authConstants.RESET_MESSAGES })
  }

  const handleProfilePicture = (e) => {
    setProfilePicture(e.target.files[0])
  }

  const userSignUp = (e) => {
    e.preventDefault()
    if (firstName === "" || lastName === "" || email === "" || password === "")
      return

    const form = new FormData()
    form.append('firstName', firstName)
    form.append('lastName', lastName)
    form.append('email', email)
    form.append('password', password)
    form.append('phoneNumber', phoneNumber)
    form.append('gender', gender)
    form.append('birthdate', birthdate)
    form.append('profilePicture', profilePicture)
    dispatch(signupAction(form))
  }

  const logout = () => {
    dispatch(signout(history))
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
          { label: 'My Profile', href: '/profile', icon: <CgProfile color="#2A75F0" /> },
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
          { 
            label: 'My Profile', 
            href: '/profile', 
            icon: <CgProfile color="#2A75F0" />,
            onClick: () => {
              !auth.authenticate && setLoginModal(true)
            }  
          },
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
          <div className="row" style={{ height: '528px' }}>
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
                <form onSubmit={signup ? userSignUp : userLogin}>
                  {
                    <p style={{ fontSize: '12px', color: 'red' }}>{auth.error}</p>
                  }
                  {
                    signup && !optionalPart && (
                      <MaterialInput
                        type="text"
                        label="Enter First Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                      />
                    )
                  }
                  {
                    signup && !optionalPart && (
                      <MaterialInput
                        type="text"
                        label="Enter Last Name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                      />
                    )
                  }
                  {
                    !optionalPart && (
                      <>
                        <MaterialInput
                          type="email"
                          label="Enter Email/Enter Mobile Number"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <MaterialInput
                          type="password"
                          label="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          rightElement={!signup && <a style={{ textDecoration: 'none', fontSize: '14px' }} href="#">Forgot?</a>}
                          required
                        />
                      </>
                    )
                  }
                  {
                    signup && optionalPart && (
                      <>
                        <MaterialInput
                          type="date"
                          label="Birthdate"
                          value={email}
                          onChange={(e) => setBirthDate(e.target.value)}
                        />
                        <MaterialInput
                          type={'tel'}
                          label={'Phone Number'}
                          value={phoneNumber}
                          maxlength={11}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          pattern="04[4-6 | 9]{1}-[0-9]{3}-[0-9]{3}"
                        />
                        <small
                          style={{ fontSize: '10px' }}
                          class="form-text text-muted">Format: 045-123-123</small>
                        <br />
                        <span className="label">Gender</span>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                className="form-check-input"
                                name="gender"
                                value={'Male'}
                                onChange={e => setGender(e.target.value)}
                              />
                              Male
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input
                                type="radio"
                                className="form-check-input"
                                name="gender"
                                value={'Female'}
                                onChange={e => setGender(e.target.value)}
                              />
                              Female
                            </label>
                          </div>
                        </div>
                        <span className="label">Profile picture</span>
                          <input type={'file'} 
                            onChange={handleProfilePicture}
                            className="form-control form-control-sm"
                            />

                      </>
                    )
                  }
                  <MaterialButton
                    title={signup ? 'Register' : 'Login'}
                    bgColor="#fb641b"
                    textColor="#ffffff"
                    style={{
                      margin: '40px 0 20px 0'
                    }}
                    type={'submit'}
                  />
                  {
                    signup && (
                      <Form.Check
                        type={'checkbox'}
                        label={`Optional`}
                        onClick={() => optionalPart ? setOptionalPart(false) : setOptionalPart(true)}
                        checked={optionalPart}
                      />
                    )
                  }

                </form>
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
                      onClick={() => {
                        setSignup(false)
                        dispatch({ type: authConstants.RESET_MESSAGES })
                      }
                      }
                    />
                  )
                }

                <div className="createAccBtn">
                  {
                    !signup && (
                      <button
                        onClick={() => {
                          setSignup(true)
                          dispatch({ type: authConstants.RESET_MESSAGES })
                        }
                        }
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