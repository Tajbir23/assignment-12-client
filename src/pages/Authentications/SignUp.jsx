import { useContext, useEffect, useState } from "react";
import useBdAddress from "../../hooks/useBdAddress";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const SignUp = () => {
  const { districts, getUpozilla } = useBdAddress();
  const [districtName, setDistrictName] = useState("");
  const [upozillasName, setUpozillasName] = useState([]);
  const [upozillaName, setUpozillaName] = useState("");
  const { createUserWithEmail, updateUserProfile } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()
  const location = useLocation();
  const  from  = location?.state?.from?.pathname || '/dashboard'
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const upozilla = getUpozilla(districtName);
    setUpozillasName(upozilla);
  }, [districtName]);
  // console.log(districts[0].name)

  const onSubmit = (data) => {
    
    if (data.password !== data.confirmPassword) {
      setPasswordError("Password does not match");
      return;
    }
    const image = { image: data.avatar[0] };
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_upload_key
        }`,
        image,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        const imageUrl = response.data.data.url;
        createUserWithEmail(data.email, data.password)
        .then((user) => {
          console.log(user)
          updateUserProfile(data?.name, imageUrl)
           .then((result) => {
            console.log(result?.user)
            console.log(data.name)
              const user = {
                name: data.name,
                email: data.email,
                avatar: imageUrl,
                upozilla: upozillaName,
                district: districtName,
                bloodGroup: data.bloodGroup,
                status: 'active',
                role: 'user'
              }
              axiosPublic.post('/signup', user)
              .then(res => {
                if(res.data.insertedId){
                  console.log(res.data.insertedId)
                  reset();
                  toast.success('User signup successful')
                  navigate(from, {replace: true})
                }
              }) 
            })
            .catch((error) => {
              toast.error(error?.message)
            })
          
        })
        .catch((error) => {
          toast.error(error?.message)
        })
      })
      .catch((error) => {
        toast.error(error?.message)
      })
  };

  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md ">
        <h2 className="text-lg font-semibold  capitalize ">SignUp</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email">Email</label>
              <input
                required
                {...register("email", { required: true })}
                id="email"
                name="email"
                type="email"
                className="block w-full px-4 py-2 mt-2 border  border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                required
                {...register("name", { required: true })}
                id="name"
                name="name"
                type="text"
                className="block w-full px-4 py-2 mt-2 border  border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label htmlFor="avatar">Photo</label>
              <input
                required
                {...register("avatar", { required: true })}
                name="avatar"
                type="file"
                className="file-input file-input-bordered w-full block mt-2"
              />
            </div>
            <div>
              <label htmlFor="bloodGroup">Blood group</label>
              <select
                required
                {...register("bloodGroup", { required: true })}
                name="bloodGroup"
                className="select w-full block mt-2 border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              >
                <option disabled selected>
                  blood group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label htmlFor="district">district</label>
              <select
                required
                onChange={(e) => setDistrictName(e.target.value)}
                className="select w-full block mt-2 border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              >
                <option disabled selected>
                  Select district
                </option>
                {districts.map((district, id) => (
                  <option key={id} value={district?.name}>
                    {district?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="district">Upozilla</label>
              <select
                required
                onChange={(e) => setUpozillaName(e.target.value)}
                className="select w-full block mt-2 border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              >
                <option disabled selected>
                  Select Upozilla
                </option>
                {upozillasName?.map((upozilla, id) => (
                  <option key={id} value={upozilla?.name}>
                    {upozilla?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                required
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
                id="password"
                type="text"
                className="block w-full px-4 py-2 mt-2 border  border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                required
                {...register("confirmPassword", { required: true })}
                id="confirmPassword"
                type="text"
                className="block w-full px-4 py-2 mt-2 border  border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
          </div>

          <div className="flex justify-end my-6">
            <button
              type="submit"
              className="px-8 w-full sm:w-auto py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Sign up
            </button>
          </div>
        </form>
        <div>if you already have an account please <a className="text-blue-700 underline" href="/login">login</a></div>
      </section>


    </div>
  );
};

export default SignUp;
