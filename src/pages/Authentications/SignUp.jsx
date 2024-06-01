import { useEffect, useState } from "react";
import useBdAddress from "../../hooks/useBdAddress";
import { useForm } from "react-hook-form";
const SignUp = () => {
  const { districts, getUpozilla } = useBdAddress();
  const [districtName, setDistrictName] = useState("");
  const [upozillasName, setUpozillasName] = useState([]);
  const [upozillaName, setUpozillaName] = useState("");
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
    console.log(data);
  };
  return (
    <div>
      <section className="max-w-4xl p-6 mx-auto  rounded-md shadow-md ">
        <h2 className="text-lg font-semibold  capitalize ">SignUp</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email">Email</label>
              <input
                required
                {...register('email', {required: true})}
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
                {...register('name', {required: true})}
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
                {...register('avatar', {required: true})}
                name="avatar"
                type="file"
                className="file-input file-input-bordered w-full block mt-2"
              />
            </div>
            <div>
              <label htmlFor="bloodGroup">Blood group</label>
              <select
                required
                {...register('bloodGroup', {required: true})}
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
                  Select district
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
                {...register('password', {required: true})}
                id="password"
                type="text"
                className="block w-full px-4 py-2 mt-2 border  border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                required
                {...register('confirmPassword', {required: true})}
                id="confirmPassword"
                type="text"
                className="block w-full px-4 py-2 mt-2 border  border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
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
        <div>if you already have an account please login</div>
      </section>
    </div>
  );
};

export default SignUp;
