import React, { useEffect, useState } from 'react'
import './SliderRange.css'
import ReactSlider from "react-slider";
import { useSelector, useDispatch } from "react-redux"
import { orderByPrice } from "../redux/actions"


function SliderRange() {
  const dispatch = useDispatch()
 const allP = useSelector((state) => state.products.productsFiltered);

  const [min, setMin] = useState(10000);
  const [max, setMax] = useState(500000);
  const filterPrice = allP.filter(f => f.price >= min && f.price <= max)
  const handleSlide = (e) => {
    setMin(e[0]);
    setMax(e[1]);
    dispatch(orderByPrice(filterPrice))
  }

  return (
    <div className="container">
            <ReactSlider
              defaultValue={[min, max]}
              className="slider"
              trackClassName="tracker"
              min={10000}
              max={500000}
              minDistance={25000}
              step={25000}
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