import React from 'react'
import { Badge, Button, Container, FormControl, NavLink, Navbar } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import { BsFillCartFill } from 'react-icons/bs';
import { CartState } from '../context/Context';
import { Link } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
  const {
    state: { cart }, 
    dispatch,
    productdispatch,
} = CartState()
  return (
    <>
    <Navbar bg="dark" variant="dark" style={{height:80}}>
        <Container>
          <Navbar.Brand href="#home">
            <NavLink to="/">Shooping Cart</NavLink>
           
          </Navbar.Brand>
          <Navbar.Text className='search' >
            <FormControl style={{width:500}} className='m-auto' onChange={(e)=>{
              productdispatch({
                type:"FILTER_BY_SEARCH",
                payload:e.target.value,
              })
            }}/>
           </Navbar.Text>
           <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {/* Dropdown Button */}<BsFillCartFill color="white" background="#0dcaf0" fontSize="25px"/>
        <Badge style={{background:"#0dcaf0"}}>{cart.length}</Badge>
      </Dropdown.Toggle>

      <Dropdown.Menu >
{
  cart.length>0?(
    <>
                  {cart.map((e) => (
                    <span className="cartitem" key={e.id}>
                      <img
                        src={e.thumbnail}
                        className="cartItemImg"
                        alt={e.title}
                      />
                      <div className="cartItemDetail">
                        <span>{e.title}</span>
                        <span>₹ {e.price}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: e,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart" >
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
  ):(
    <span style={{ padding: 10 }}>Cart is Empty!</span>
  )}
</Dropdown.Menu>
    </Dropdown>
        </Container>
      </Navbar>
    </>
  )
}

export default Header