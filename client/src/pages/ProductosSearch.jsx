import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getAllById } from '../redux/actions';
function ProductosSearch() {

  const {id} = useParams()
  const dispatch = useDispatch()
  const {productsFilterById} = useSelector((state)=>state.products)

  useEffect(()=>{
    dispatch(getAllById(id))
  },[])


  return (
    <div className="h-[800px] justify-center items-center text-center my-20 mx-5 border rounded-lg flex flex-col gap-5">
      <img src={productsFilterById.image} className="w-100 h-100 object-contain"/>
      <h3 className="text-xl sm:text-2xl mb-2" >{productsFilterById.name}</h3>
      <h5>{productsFilterById.brand}</h5>
      <span>{productsFilterById.description}</span>
      <h4 className="text-xl sm:text-2xl mb-2">${productsFilterById.price}</h4>
    </div>
    )
}

export default ProductosSearch