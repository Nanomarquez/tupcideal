import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./SwiperMenu.css";
import Preview1 from '../../assets/preview1.png'
import Preview2 from '../../assets/preview2.png'
import Preview3 from '../../assets/preview3.png'
import Preview4 from '../../assets/preview4.png'
import Preview5 from '../../assets/preview5.png'
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function SwiperHome() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={Preview1} alt="preview1" className="w-20 object-contain" /></SwiperSlide>
        <SwiperSlide><img src={Preview2} alt="preview2" className="w-20 object-contain"  /></SwiperSlide>
        <SwiperSlide><img src={Preview3} alt="preview3" className="w-20 object-contain"  /></SwiperSlide>
        <SwiperSlide><img src={Preview4} alt="preview4" className="w-20 object-contain"  /></SwiperSlide>
        <SwiperSlide><img src={Preview5} alt="preview5" className="w-20 object-contain"  /></SwiperSlide>
      </Swiper>
    </>
  );
}