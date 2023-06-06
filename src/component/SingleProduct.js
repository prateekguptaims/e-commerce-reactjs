import React from 'react'
import "./style.css"
import { Button, Card } from 'react-bootstrap'
import Rating from './Rating'
import Cart from './Cart'
import { CartState } from '../context/Context'
const SingleProduct = ({ e }) => {
    const {
        state: { cart },
        dispatch,
    } = CartState()
    //console.log(cart)

    return (

        <div className='products'>

            <Card>
                <Card.Img variant="top" src={e.thumbnail} alt={e.name} style={{ maxWidth: "100%", height: "12rem" }} />
                <Card.Body>
                    <Card.Title>{e.title}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                        {/* <span>₹ {e.price.split(".")[0]}</span> */}
                        <span>₹ {e.price}</span>
                        {e.fastDelivery ? (
                            <div>Fast Delivery</div>
                        ) : (
                            <div>4 days delivery</div>
                        )}

                        <Rating rating={e.rating} />

                    </Card.Subtitle>
                    {
                        cart.some((p) => p.id == e.id) ? (
                            <Button variant='danger' onClick={() => dispatch({
                                type: 'REMOVE_FROM_CART',
                                payload: e,
                            })}>Remove from cart</Button>
                        ) : (
                            <Button onClick={() => dispatch({
                                type: 'ADD_TO_CART',
                                payload: e,
                            })}
                                disabled={e.inStock <= 1}  >
                                {e.inStock <= 1 ? "out of stock" : "add to cart"}
                            </Button>
                        )
                    }


                </Card.Body>
            </Card>

        </div>

    )

}

export default SingleProduct