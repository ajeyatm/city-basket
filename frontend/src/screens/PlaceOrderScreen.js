import React from 'react'
import { dispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems, shippingAddress, paymentMethod } = cart

  const toDecimal = (num) => {
    return parseFloat(num.toFixed(2))
  }

  cart.ItemsPrice = toDecimal(
    cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0.0)
  )
  cart.shippingCharges = toDecimal(cart.ItemsPrice > 100 ? 0 : 20)
  cart.tax = toDecimal(0.15 * cart.ItemsPrice)
  cart.totalPrice = toDecimal(cart.ItemsPrice + cart.shippingCharges + cart.tax)

  const placeOrderHandler = () => {
    console.log('Order', cart)
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Col as='h4'>Shipping</Col>
              <Col>
                {shippingAddress.address}, {shippingAddress.city} -{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </Col>
            </ListGroup.Item>
            <ListGroup.Item>
              <Col as='h4'>Payment Method</Col>
              <Col>Method: {paymentMethod}</Col>
            </ListGroup.Item>
            <ListGroup.Item>
              <Col as='h4'>Order Items</Col>
              <ListGroup variant='flush'>
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={2} sm={2} xs={4}>
                        <LinkContainer to={`/product/${item.product}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </LinkContainer>
                      </Col>
                      <Col>
                        <LinkContainer to={`/product/${item.product}`}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </LinkContainer>
                      </Col>
                      <Col>
                        ${item.price} x {item.qty} = ${item.price * item.qty}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Col as='h4'>Order Summary</Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.ItemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingCharges}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.tax}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className='btn btn-block' onClick={placeOrderHandler}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </> //
  )
}

export default PlaceOrderScreen
