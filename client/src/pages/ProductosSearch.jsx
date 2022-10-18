import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector , useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getAllByName } from '../redux/actions';
function ProductosSearch() {

  const {name} = useParams()
  const dispatch = useDispatch()
  const productsFiltered = useSelector((state)=>state.products.productsFiltered)

  console.log(productsFiltered)

  useEffect(()=>{
    dispatch(getAllByName(name))
  },[])


  return (
    <div>{name}</div>
  )
}

export default ProductosSearch