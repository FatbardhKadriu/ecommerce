import React from 'react'
import { Navbar, Nav, Container, DropdownButton, Dropdown } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../actions'
import { generatePublicUrl } from '../../urlConfig';
import profilePicture from '../../images/profile.jpeg'

const Header = (props) => {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(signout())
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <DropdownButton expand="lg" variant="light" bg="light" className="nav-item"
          title={
            <>
              <span>
                {auth.user.fullName}
              </span>
              {' '}
              {
                <img
                  width={30}
                  height={30}
                  style={{ borderRadius: '50%' }}
                  alt=""
                  src={auth.user.profilePicture ? generatePublicUrl(auth.user.profilePicture) : profilePicture}
                />
              }
            </>
          }>
          <Dropdown.Item>
            <Link style={{
              textDecoration: 'none',
              color: 'black',
            }} to="/profile" >Profile</Link>
          </Dropdown.Item>
          <Dropdown.Item onClick={logout}>Signout</Dropdown.Item>
        </DropdownButton>
      </Nav>
    )
  }

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">Signin</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">Signup</NavLink>
        </li>
      </Nav>
    )
  }

  return (
    <Navbar fixed="top"
      collapseOnSelect
      expand="lg"
      style={{
        borderBottom: '1px solid #cecece',
        background: 'white',
        zIndex: 1
      }}
       >
      <Container fluid>
        <Link style={{ marginLeft: '18%' }} to="/" className="navbar-brand">Admin Dashboard</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
