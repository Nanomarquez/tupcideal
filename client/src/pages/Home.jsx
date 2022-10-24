import React from "react";
import SwiperHome from "../components/Home/SwiperHome";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Amd from "../assets/marcas/amd.png";
import Asus from "../assets/marcas/asus.png";
import Geforce from "../assets/marcas/geforce.png";
import Gigabyte from "../assets/marcas/gigabyte.png";
import Hyperx from "../assets/marcas/hyperx.png";
import Intel from "../assets/marcas/intel.png";
import Reddragon from "../assets/marcas/reddragon.png";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Home() {
  const navigate = useNavigate();

  const { usuario } = useAuth();

  useEffect(() => {
    if (usuario !== null) {
      axios.get(`/users/${usuario.email}`).then((res) => {
        console.log(res.data);
        if (res.data.error) {
          navigate("/completarform");
        } else {
          navigate("/");
        }
      });
    }
  }, [usuario]);

  return (
    <>
      <div className="flex flex-col sm:flex-row h-[400px] bg-gradient-to-br bg-gray-900">
        <section className="w-full sm:w-1/2 p-5 text-center sm:text-left sm:p-10 flex flex-col gap-5 sm:gap-24 items-center justify-center">
          <h1 className="text-4xl tracking-tight font-semibold text-white">
            Cotizamos la pc de tus sueños al{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tl from-teal-400 via-emerald-400 to-lime-200">
              Mejor Precio
            </span>
          </h1>
          <h2 className="text-3xl font-semibold text-white">
            El mejor precio del mercado lo encontras aca!
          </h2>
        </section>
        <section className="w-full sm:w-1/2 bg-gray-900">
          <SwiperHome />
        </section>
      </div>
      <div className="pt-40 sm:pt-0">
        <h1 className="text-3xl text-center font-semibold tracking-tight pt-3">
          Las mejores marcas estan en{" "}
          <span className="font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-red-700 via-purple-800 to-green-700">
            TuPcIdeal
          </span>
        </h1>
        <div className="container">
          <div className="swiperContainer h-32 w-full xl:w-[115%]">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              slidesPerView={3}
            >
              <SwiperSlide>
                <img src={Amd} alt="amd" id="swp" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Asus} alt="" id="swp" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Geforce} alt="" id="swp" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Gigabyte} alt="" id="swp" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Hyperx} alt="" id="swp" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Intel} alt="" id="swp" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={Reddragon} alt="" id="swp" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
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

export default Home;
