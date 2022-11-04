import React, { useEffect, useState } from 'react'
import './SliderRange.css'
import ReactSlider from "react-slider";
import {useSelector, useDispatch } from "react-redux"
import { getFiltered } from "../redux/actions"


function SliderRange({setCurrentPage, brand , category}) {
  const dispatch = useDispatch()

  const { allProducts } = useSelector(state=>state.products)
  
  
  const [precioMax, setPrecioMax] = useState(0);
  const [precioMin, setPrecioMin] = useState(0);

  useEffect(() => {
  
    if(allProducts.length>0){
      setPrecioMax(Math.max(...allProducts.map(p=>p.precio)))
      setPrecioMin(Math.min(...allProducts.map(p=>p.precio)))
      setMin(precioMin)
      setMax(precioMax)
    }
    
  }, [allProducts])

  
  const [min, setMin] = useState(precioMin);
  const [max, setMax] = useState(precioMax);
  

  const productNotNull = allProducts.filter(p=>p.precio !== null)
  const filterByRange = productNotNull.filter(product=>product.precio >= min && product.precio <= max)
  

  const handleSlide = (e) => {
    setMin(e[0]);
    setMax(e[1]);
    dispatch(getFiltered(brand,category,min,max))
    setCurrentPage(1)
  }

  return (
    <div className="text-center mt-7   flex flex-col gap-5 text-lg">
            <ReactSlider
              defaultValue={[precioMin, precioMax]}
              className="slider"
              trackClassName="tracker"
              min={precioMin}
              max={precioMax}
              minDistance={0}
              step={200}
              withTracks={true}
              pearling={true}
              renderThumb={(props) => {
                return <div {...props} className="thumb"></div>;
              }}
              renderTrack={(props) => {
                return <div {...props} className="track"></div>;
              }}
              onChange={handleSlide}
            />
            <div className="flex gap-5 flex-col">
              <p>
                Minimo: <span className='font-bold'>$ {min}</span>
              </p>
              <p>
                Maximo: <span className='font-bold'>$ {max}</span>
              </p>
            </div>
          </div>
  )
}

export default SliderRange