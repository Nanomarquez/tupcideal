import React, { useState } from 'react'
import './SliderRange.css'
import ReactSlider from "react-slider";
import {useSelector, useDispatch } from "react-redux"
import { orderByPrice } from "../redux/actions"


function SliderRange({setCurrentPage}) {
  const dispatch = useDispatch()

  const { productsFiltered , allProducts } = useSelector(state=>state.products)
  
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(50000);

  const productNotNull = allProducts.filter(p=>p.price_usd !== null)
  const filterByRange = productNotNull.filter(product=>product.price_usd >= min && product.price_usd <= max)
  

  const handleSlide = (e) => {
    setMin(e[0]);
    setMax(e[1]);
    dispatch(orderByPrice(filterByRange))
    setCurrentPage(1)
  }

  return (
    <div className="text-center mt-7   flex flex-col gap-5 text-lg">
            <ReactSlider
              defaultValue={[min, max]}
              className="slider"
              trackClassName="tracker"
              min={0}
              max={50000}
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