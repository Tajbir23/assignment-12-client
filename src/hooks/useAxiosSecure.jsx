import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers.Authorization = token;
      return config;
    },
    (error) => {
      toast.error(error.message)
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.request.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      toast.error(error.message)
      return Promise.reject(error);
    }
  );
};

export default useAxiosSecure;
