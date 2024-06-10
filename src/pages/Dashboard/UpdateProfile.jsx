import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useBdAddress from "../../hooks/useBdAddress";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateProfile = ({data, setUpdateModal, refetch}) => {
  const axiosSecure = useAxiosSecure()
  const { districts, getUpozilla } = useBdAddress();
  const [districtName, setDistrictName] = useState(data?.district);
  const [upozillasName, setUpozillasName] = useState([]);
  const [upozillaName, setUpozillaName] = useState(data?.upozilla);
  const {register, handleSubmit} = useForm();
  const {updateUserProfile} = useContext(AuthContext);
  

  useEffect(() => {
    const upozilla = getUpozilla(districtName);
    setUpozillasName(upozilla);
  }, [districtName]);

  const onSubmit = async(user) => {
    console.log(user)
    try {
      const res = await updateUserProfile(user?.name, user?.avatar)
      console.log(res)
    
      const formData = {
        name: user?.name,
        avatar: user?.avatar,
        district: districtName,
        upozilla: upozillaName,
      }
      const result = await axiosSecure.patch('/update-profile', formData)
      if(result.data?.modifiedCount){
        setUpdateModal(false)
        refetch()
        toast.success("Profile updated successfully")
      }
    
    } catch (error) {
      console.log(error)
    }
  };
  
  return (
    <div className="absolute p-10">
      <section className="max-w-4xl p-6 mx-auto rounded-md shadow-md bg-gray-700 bg-opacity-30 ">
        <h2 className="text-lg font-semibold  capitalize ">Update profile</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white" htmlFor="name">Name</label>
              <input
                defaultValue={data?.name}
                {...register("name")}
                id="name"
                name="name"
                type="text"
                className="block w-full px-4 py-2 mt-2 border  border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white" htmlFor="avatar">Photo url</label>
              <input
                defaultValue={data?.avatar}
                {...register("avatar")}
                name="avatar"
                type="text"
                className="file-input file-input-bordered w-full block mt-2"
              />
            </div>

            <div>
              <label className="text-white" htmlFor="district">district</label>
              <select
                
                onChange={(e) => setDistrictName(e.target.value)}
                className="select w-full block mt-2 border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              >
                <option disabled selected>
                  Select district
                </option>
                <option selected={!districtName}>{data?.district}</option>
                {districts.map((district, id) => (
                  <option key={id} value={district?.name}>
                    {district?.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-white" htmlFor="district">Upozilla</label>
              <select
                required
                onChange={(e) => setUpozillaName(e.target.value)}
                className="select w-full block mt-2 border-black rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              >
                <option disabled selected>
                  Select upozilla
                </option>
                {upozillasName?.map((upozilla, id) => (
                  <option key={id} value={upozilla?.name}>
                    {upozilla?.name}
                  </option>
                ))}
              </select>
            </div>


          </div>

          <div className="flex justify-end my-6">
            <button
              type="submit"
              className="px-8 w-full sm:w-auto py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Update
            </button>
          </div>
        </form>
      </section>


    </div>
  );
};

export default UpdateProfile;
