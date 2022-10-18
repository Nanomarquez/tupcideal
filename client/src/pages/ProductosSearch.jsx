import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getAllById } from '../redux/actions';
function ProductosSearch() {

  const {id} = useParams()
  const dispatch = useDispatch()
  const {productsFilterById} = useSelector((state)=>state.products)

  console.log(productsFilterById)

  useEffect(()=>{
    dispatch(getAllById(id))
  },[])


  return (
    <div>{productsFilterById && productsFilterById.name}</div>
    )
}

export default ProductosSearch