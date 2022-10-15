import React, { useState } from 'react'
import './SliderRange.css'
import ReactSlider from "react-slider";


function SliderRange() {

  const [min, setMin] = useState(100000);
  const [max, setMax] = useState(500000);

  return (
    <div className="container">
            <ReactSlider
              defaultValue={[min, max]}
              className="slider"
              trackClassName="tracker"
              min={100000}
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
              onChange={([min, max]) => {
                setMin(min);
                setMax(max);
              }}
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