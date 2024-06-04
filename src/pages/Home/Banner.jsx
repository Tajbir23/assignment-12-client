import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";


const Banner = () => {
  const axiosSecure = useAxiosSecure();
  const {data: banner, isLoading: bannerLoading, isError} = useQuery({
    queryKey: ['banner'],
    queryFn: async () => {
      const res = await axiosSecure.get('/banner')
      return res?.data
    }
  })

  if (isError) {
    console.log(isError)
  }
  
  if(bannerLoading) return <Loading />
  console.log(banner)
  return (
    <>
    { banner && <div className="hero h-[500px]" style={{backgroundImage: `url(${banner?.image})`}}>
  <div className="hero-overlay bg-opacity-80"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-3xl font-bold">{banner?.title}</h1>
      <p className="mb-5">{banner?.description}</p>
      <h2 className="mb-5 text-green-400">For discount rate {banner?.rate}% use coupon code {banner?.coupon}</h2>
      <Link to="/all_test" className="btn btn-primary">Get Started</Link>
    </div>
  </div>
</div>}
</>
  )
}

export default Banner