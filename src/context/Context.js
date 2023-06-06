import React, { createContext, useContext, useReducer, useState } from 'react'
import Cardsdata from '../component/Carddata'
import { cartReducer, productReducer } from './Reducer'


const Cart = createContext()



const Context = ({ children }) => {

    const [data, setdata] = useState(Cardsdata)

    console.log(data)

    const [state, dispatch] = useReducer(cartReducer, {
        products: data,
        cart: []
    })
    const [productstate, productdispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating:0,
        searchQuery:"",
    })

    return (
        <Cart.Provider value={{ state, dispatch ,productstate,productdispatch}}>
            {children}
        </Cart.Provider>
    )
}

export default Context

export const CartState = () => {
    return useContext(Cart)
}