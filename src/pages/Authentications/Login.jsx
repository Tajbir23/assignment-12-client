import { useContext } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const Login = () => {
  const {register, reset, handleSubmit, formState: {errors}} = useForm();
  const {signInWithEmail, user, loading, setLoading} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const  from  = location?.state?.from?.pathname || '/dashboard';
  const axiosPublic = useAxiosPublic()


  const onSubmit = (data) => {
    signInWithEmail(data?.email, data?.password)
    .then(() => {
      axiosPublic.post('jwt', {email: data?.email})
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate(from, {replace: true})
      toast.success('Logged in successfully')
      reset()
        }
      })
      
    })
    .catch((error) => {
      toast.error(error?.message)
      navigate('/signup')
      setLoading(false)
    })
  }
  if(loading) return <Loading />
  if(user) return navigate('/')

  return (
    <div className="">


<div className="hero min-h-screen ">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center m-20 lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">At HealthCheck Diagnostics, we believe in providing comprehensive, accurate, and timely diagnostic services to ensure the well-being of our community. With state-of-the-art technology and a dedicated team of experts, we are committed to delivering the highest quality of care.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="mt-4">

            <div>
                <label htmlFor="emailAddress">Email Address</label>
                <input {...register('email', {required : true})} id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2   border-gray-200 rounded-md border dark:border-gray-600   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                {errors?.email?.types === "required" && <p className="text-red-800">Email is required</p>}
            </div>

            <div>
                <label  htmlFor="password">Password</label>
                <input {...register('password', {required: true})} id="password" type="password" className="block w-full px-4 py-2 mt-2  border border-gray-200 rounded-md  dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                {errors?.password?.types === "required" && <p className="text-red-800">Password is required</p>}
            </div>

        </div>

        <div className="flex justify-end mt-6">
            <button type="submit" className="px-8 py-2.5 leading-5  transition-colors duration-300 transform text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Login</button>
        </div>
        <p className="mt-5">if you don not have an account please <a className="text-blue-700 underline" href="/signup">Signup</a></p>
    </form>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login