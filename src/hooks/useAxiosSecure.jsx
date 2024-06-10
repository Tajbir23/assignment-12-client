import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const axiosSecure = axios.create({
  baseURL: "https://ass-12.vercel.app",
});
// http://localhost:5000
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut, setLoading } = useContext(AuthContext);

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    },
    function (error) {
      toast.error(error.message);
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
        setLoading(false);
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
