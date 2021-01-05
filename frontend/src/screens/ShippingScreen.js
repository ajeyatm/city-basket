import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector((state) => state.cart)

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }
  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h2 className='mb-4'>Shipping</h2>
        <Form onSubmit={submitHandler} className='my-2'>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              value={address}
              placeholder='Enter address'
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              value={city}
              placeholder='Enter city'
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='postalCode'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              value={postalCode}
              placeholder='Enter postal code'
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              value={country}
              placeholder='Enter country'
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>

          <Button
            type='submit'
            varient='primary'
            disabled={
              (address && address.length === 0) ||
              (city && city.length === 0) ||
              (postalCode && postalCode.length === 0) ||
              (country && country.length === 0)
            }
          >
            Continue
          </Button>
        </Form>

        <Link to='/cart' className='btn-light'>
          Go to cart
        </Link>
      </FormContainer>
    </> //
  )
}

export default ShippingScreen
