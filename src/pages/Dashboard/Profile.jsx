import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import Loading from "../../components/Loading"
import { MdManageAccounts } from "react-icons/md";
import { BiDonateBlood } from "react-icons/bi";
import { Button } from "antd";
import { useState } from "react";
import UpdateProfile from "../Dashboard/UpdateProfile"



const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const [updateModal, setUpdateModal] = useState(false);

    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const response = await axiosSecure.get('/profile')
            return response.data
        }
    })

    if(isLoading) return <Loading />

    if(isError){
        console.log(isError)
    }


    const details = <>
          <div className="flex px-6 py-3  bg-gray-900">
            <div className="flex items-center grow md:justify-end">
              <MdManageAccounts className="text-2xl text-white" />

              <h1 className="mx-3 text-lg font-semibold text-white">{data?.role}</h1>
            </div>
          </div>

          <div className="px-6 py-4 md:mt-10">
            <h1 className="text-xl font-semibold text-gray-800 ">
              {data?.name}
            </h1>

            <div className="flex items-center mt-4 text-gray-700 dark:">
              <BiDonateBlood className="text-2xl" />

              <h1 className="px-2 text-sm">{data?.bloodGroup}</h1>
            </div>

            <div className="flex items-center mt-4 text-gray-700 dark:">
              <svg
                aria-label="location pin icon"
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
                />
              </svg>

              <h1 className="px-2 text-sm">{data?.upozilla}, {data?.district}</h1>
            </div>

            <div className="flex items-center mt-4 ">
              <svg
                aria-label="email icon"
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                />
              </svg>

              <h1 className="px-2 text-sm">{data?.email}</h1>




            </div>
            <Button onClick={() => setUpdateModal(true)} className="mt-5 min-w-36 bg-blue-700">Update</Button>
          </div>
    </>

  return (
    <div className="flex items-center justify-center">
      
        <div className="w-full md:hidden  overflow-hidden  rounded-lg shadow-lg ">

          <img
            className="object-cover object-center w-full h-56"
            src={data?.avatar}
            alt="avatar"
          />

          
          {details}
          


        </div>
        <div className="w-full hidden md:block">
          <div className="relative">
            <img className="w-full h-56" src="https://png.pngtree.com/thumb_back/fh260/background/20211031/pngtree-abstract-bg-image_914283.png" alt="cover" />
            <img className="absolute -bottom-20 left-20 h-40 w-40" src={data?.avatar} alt="avatar" />
          </div>

          <div className="block ">
            {details}
          </div>
        </div>
      {updateModal && <UpdateProfile data={data} setUpdateModal={setUpdateModal} refetch={refetch} />}
    </div>
  )
}

export default Profile