import React from 'react'
import { Navbar, Nav, Container, DropdownButton, Dropdown } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../actions'
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { generatePublicUrl } from '../../urlConfig';

const Header = (props) => {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(signout())
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        {/* <li className="nav-item">
          <span className="nav-link">{auth.user.fullName}</span>
        </li> */}
        <DropdownButton expand="lg" bg="dark" variant="dark" className="nav-item"
          title={
            <>
              <span>
                {auth.user.fullName}
              </span>
              {' '}
              {
                auth.user.profilePicture && (
                  <img
                    width={30}
                    height={30}
                    style={{ borderRadius: '50%' }}
                    src={generatePublicUrl(auth.user.profilePicture)}
                  />
                )
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
        {/* <li className="nav-item">
          <span className="nav-link" style={{ cursor: 'pointer' }} onClick={logout}>Signout</span>
        </li> */}
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
    <Navbar fixed="top" style={{ zIndex: 1 }} collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Link to="/" className="navbar-brand">Admin Dashboard</Link>
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
