import React from "react";
import Card from '../components/Card'

function ArmaTuPc() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tighter text-center p-5">
        Que uso le vas a dar a tu proxima PC?
      </h1>
      <div className="flex flex-col sm:flex-row p-5 gap-10 h-full">
          <Card title='Home/Office' img='https://http2.mlstatic.com/D_NQ_NP_700405-MLA44219455198_122020-O.jpg' subtitle="Linea economica" detail="Perfecta para estudiar"/>
          <Card title='Diseño' img="https://http2.mlstatic.com/D_NQ_NP_855023-MLA51446194123_092022-O.webp" subtitle="Linea standard" detail='Hecha para diseñar/producir'/>
          <Card title='Gamer' img='https://http2.mlstatic.com/D_NQ_NP_658643-MLA31115500498_062019-O.webp' subtitle="Linea premium" detail='Maximo rendimiento'/>
      </div>
      <div className="p-5 flex flex-col gap-10">
        <img
          src="https://cdn.jsdelivr.net/gh/persano/BannersWebMaximus/top-under-header/mejores-precios-main-top.webp"
          alt=""
        />
        <img
          src="https://cdn.jsdelivr.net/gh/persano/BannersWebMaximus/armado-pc-home/arma-tu-compu-new.webp"
          alt=""
        />
      </div>
    </>
  );
}

export default ArmaTuPc;
