import React from 'react'
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct'
import Filters from './Filters'

const Home = () => {
    const{state:{products},
    productstate:{byStock, byFastDelivery,sort, byRating,searchQuery}}= CartState()
    console.log(products)
    const transformproducts=()=>{
        let sortedproducts=products;

        if(sort){
            sortedproducts=sortedproducts.sort((a,b)=>
                sort==="lowToHigh"?a.price-b.price:b.price-a.price
            )
        }
        if (!byStock) {
            sortedproducts = sortedproducts.filter((prod) => prod.inStock);
          }
      
          if (byFastDelivery) {
            sortedproducts = sortedproducts.filter((prod) => prod.fastDelivery);
          }
      
          if (byRating) {
            sortedproducts = sortedproducts.filter(
              (prod) => prod.rating >= byRating
            );
          }
      
          if (searchQuery) {
            sortedproducts = sortedproducts.filter((prod) =>
              prod.title.toLowerCase().includes(searchQuery)
            );
          }
      
        return sortedproducts;
    }
  return (
    <div className='home'>
        <Filters/>
            <div className='productContainer'>
                {
                    transformproducts().map((e)=>{
                        return (
                            <>
                            <SingleProduct e={e} key={e.id}/>
                            </>
                        )
                    })
                }
            </div>
    </div>
  )
}

export default Home