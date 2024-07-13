import Title from "../Dashboard/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const Promotions = () => {
  return (
    <div className="my-10" data-aos="fade-up">
      <Title text={"Promotions"} />
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          250: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="md:w-96 w-full">
          <div className="border h-40 shadow-lg p-5">
            <h1 className="font-bold">Comprehensive Health Check-Up Package</h1>
            <p>
              Stay ahead of your health with our all-inclusive health check-up
              package. Get a full diagnostic evaluation including blood tests,
              imaging, and more.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="md:w-96 w-full">
          <div className="border h-40 shadow-lg p-5">
            <h1 className="font-bold">Discount on Imaging Services</h1>
            <p>
              Get 20% off on all MRI, CT scans, and X-rays. Ensure early
              detection and accurate diagnosis with our advanced imaging
              services.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="md:w-96 w-full">
          <div className="border h-40 shadow-lg p-5">
            <h1 className="font-bold">Patient Referral Program</h1>
            <p>
              Refer a friend or family member and receive a $50 discount on your
              next service. Your referral will also get 10% off their first
              visit.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Promotions;
