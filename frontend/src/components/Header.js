import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userLogin)
  const { cartItems } = useSelector((state) => state.cart)

  useEffect(() => {}, [userInfo, cartItems])

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>cityBasket</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fab fa-opencart fa-lg' />
                  <sup style={{ fontSize: 12 }}>
                    <Badge>{cartItems.length}</Badge>
                  </sup>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fa fa-user mr-1' />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
