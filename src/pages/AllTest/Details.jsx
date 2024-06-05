import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading";
import PaymentModal from "../../components/PaymentModal";

const Details = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/test_details/${id}`);
      return res?.data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError) {
    console.log(isError);
  }

  const date = new Date(data?.date).toDateString();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={data?.image}
              alt="Diagnostic Center"
              className="w-96 h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800">{data?.title}</h1>
            <h2 className="text-2xl font-semibold text-gray-600 mt-2">
              {data?.name}
            </h2>
            <p className="text-gray-600 mt-4">
              <span className="font-medium">Date:</span> {date}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Description:</span>{" "}
              {data?.description ||
                "This is a brief description of the diagnostic center. It provides various health services and diagnostic tests."}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Available Slots:</span> {data?.slot}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Price:</span> {data?.price}
            </p>
            <div>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn btn-primary mt-5"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Book now
              </button>
              <PaymentModal data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
