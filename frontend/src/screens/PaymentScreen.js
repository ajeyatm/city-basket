import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Col, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState('paypal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h2 className='mb-4'>Payment Method</h2>
        <Form onSubmit={submitHandler} className='my-2'>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='Paypal or Credit Card'
                id='paypal'
                name='paymentMethod'
                value='paypal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type='radio'
                label='Stripe (Disabled)'
                id='stripe'
                name='paymentMethod'
                value='stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled
              />
            </Col>
          </Form.Group>

          <Button type='submit' varient='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </> //
  )
}

export default PaymentScreen
