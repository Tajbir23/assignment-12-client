import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TestCard from "../../components/TestCard";
import Title from "../Dashboard/Title"

const FeaturedTest = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["featured"],
    queryFn: async () => {
      const res = await axiosPublic.get("/featured-test");
      return res?.data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError) {
    console.log(isError);
  }

  console.log(data);
  return (
    <div className="my-10">
    <Title text={"Featured Test"} />
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
        {data &&
          data?.map((item) => (
            <SwiperSlide key={item?._id} className="md:w-96 w-full">
              <TestCard item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default FeaturedTest;
