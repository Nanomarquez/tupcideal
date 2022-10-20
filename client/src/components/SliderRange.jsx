import React, { useState } from 'react'
import './SliderRange.css'
import ReactSlider from "react-slider";
import {useSelector, useDispatch } from "react-redux"
import { orderByPrice } from "../redux/actions"


function SliderRange() {
  const dispatch = useDispatch()

  const { productsFiltered } = useSelector(state=>state.products)

  const priceMaxOfProducts = Math.max(...productsFiltered.map(e=>e.price))

  const priceMinOfProducts = Math.min(...productsFiltered.map(e=>e.price))


  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500000);

  const filterByRange = productsFiltered.filter(product=>product.price >= min && product.price <= max)


  const handleSlide = (e) => {
    setMin(e[0]);
    setMax(e[1]);
    dispatch(orderByPrice(filterByRange))
  }

  return (
    <div className="container">
            <ReactSlider
              defaultValue={[min, max]}
              className="slider"
              trackClassName="tracker"
              min={0}
              max={500000}
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
            <div className="values-wrapper">
              <p>
                Precio minimo: <span>{min}</span>
              </p>
              <p>
                Precio maximo: <span>{max}</span>
              </p>
            </div>
          </div>
  )
}

export default SliderRange