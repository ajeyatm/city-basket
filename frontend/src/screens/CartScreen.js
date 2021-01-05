import React, { useEffect } from 'react'
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'

const CartScreen = ({ location, match, history }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
      // history.push('/cart')
    }
  }, [productId, qty, history, dispatch])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <>
      <h2 className='my-2'>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to='/'>Go Back</Link>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={3}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={9}>
                      <Row>
                        <Col md={8}>
                          <Link to={`/product/${item.product}`}>
                            <strong>{item.name}</strong>
                          </Link>
                        </Col>
                        <Col md={4} className='my-1'>
                          <h5>${item.price}</h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={4}>
                          <Form.Control
                            as='select'
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock)].map((v, q) => (
                              <option key={q + 1} value={q + 1}>
                                {q + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={4}></Col>
                        <Col md={4}>
                          <Button
                            variant='secondary'
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            Remove
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h4>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) Items
                  </h4>
                  <h5>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </h5>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={checkoutHandler}
                  >
                    Proced to checkout
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </> //
  )
}

export default CartScreen
