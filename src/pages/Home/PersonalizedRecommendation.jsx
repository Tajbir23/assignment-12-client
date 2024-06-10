import Title from "../Dashboard/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading";

const PersonalizedRecommendation = () => {
  const axiosPublic = useAxiosPublic()
  const {data, isLoading, isError} = useQuery({
    queryKey: ["personalized"],
    queryFn: async () => {
      const response = await axiosPublic.get(
        "/recommendation"
      );
      return response.data;
    },
  })

  if (isLoading) return <Loading />;
  if (isError) {
    console.log(isError);
  }
  return (
    <div className="my-10">
      <Title text={"Recommendation"} />
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
        {data?.map((item) => <SwiperSlide key={item?._id} className="md:w-96 w-full">
          <div className="border shadow-lg p-5">
            <h1 className="font-bold">{item?.title}</h1>
            <p>
              {item?.description}
            </p>
          </div>
        </SwiperSlide>)}
      </Swiper>
    </div>
  )
}

export default PersonalizedRecommendation