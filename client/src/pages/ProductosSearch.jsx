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
    <div className="h-[200px] justify-center items-center text-center my-20 mx-5 border rounded-lg flex flex-col gap-5">
      {productsFilterById && productsFilterById.name}
    </div>
  );
}

export default ProductosSearch