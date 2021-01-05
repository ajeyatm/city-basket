import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  )

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [match, dispatch])

  const addToCartHandle = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={4}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              rounded
              className='shadow mb-3'
            />
          </Col>
          <Col md={5}>
            <ListGroup variant='flush'>
              <ListGroup.Item style={{ fontSize: 20, fontWeight: 'bold' }}>
                {product.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>${product.price}</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>{product.description}</strong>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      {product.countInStock < 1 ? (
                        <span style={{ color: 'red' }}>Out Of Stock</span>
                      ) : (
                        <span style={{ color: 'green' }}>In Stock</span>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock === 0 ? null : (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity: </Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock)].map((v, q) => (
                            <option key={q + 1} value={q + 1}>
                              {q + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className='btn btn-block'
                    type='button'
                    disabled={product.countInStock < 1}
                    onClick={addToCartHandle}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </> //
  )
}

export default ProductScreen
