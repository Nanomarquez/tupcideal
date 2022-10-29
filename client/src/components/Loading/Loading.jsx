import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="body">
      <div className="cube">
        <div className="big ">
          <span className="uno text-5xl sm:text-8xl items-center justify-center flex">TU</span>
          <span className="dos text-5xl sm:text-8xl items-center justify-center flex">PC</span>
          <span className="tres text-5xl sm:text-7xl items-center justify-center flex">IDEAL</span>
          <span className="cuatro text-4xl sm:text-6xl items-center justify-center flex">Loading</span>
          <span class="top"></span>
        </div>
      </div>
    </div>
  );
}

export default Loading;
