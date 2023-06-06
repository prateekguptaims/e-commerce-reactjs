import React, { useEffect, useState } from 'react'
import { CartState } from '../context/Context'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import Rating from './Rating'
import { AiFillDelete } from 'react-icons/ai'

const Cart = () => {

  const {
    state: { cart },
    dispatch,
  } = CartState()

  const [total, settotal] = useState()

  useEffect(() => {
    settotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))
  }, [cart])

  //console.log(cart)

  return (
    <div className='home'>
      <div className='productContainer'>
        <ListGroup>
        {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.thumbnail} alt={prod.title} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.title}</span>
                </Col>
                <Col md={2}>₹ {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.rating} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      })
                    }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className='filters summary'>
        <span className='title'>
          SubTotal ({cart.length}) item
        </span>
        <span style={{ fontSize: 20, fontWeight: 700 }}>Total {total}</span>
        <Button type='button' disabled={cart.length === 0}>Proceed to Checkout</Button>
      </div>
    </div>
  )
}

export default Cart