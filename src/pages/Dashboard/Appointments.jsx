import { Table } from "antd";
import useMyAppointments from "../../hooks/useMyAppointments";
import Title from "./Title";
import Loading from "../../components/Loading";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Appointments = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useMyAppointments(pagination);
  
  if (isLoading) return <Loading />;

  console.log(data);

  const columns = [
    {
      title: "Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Appointment Date",
      dataIndex: "date",
      key: "date",
      render : (text, record) => {
        return new Date(text).toDateString()
      }
    },
    {
      title: "Appointment Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Action",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {

        return (
          <div>
            {record?.status === "pending" ? <button onClick={() => handleCancel(record)} className="bg-red-500 text-white px-4 py-2 rounded-md">
              Cancel
            </button> : record?.status === "cancelled" && <button disabled className="bg-yellow-500 text-white px-4 py-2 rounded-md">
              Cancelled
            </button>}
          </div>
        );
      }
    }
  ]

  const handleCancel = async (record) => {
    console.log(record)
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then( async(result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.post("/cancel-appointment", record)
        if (res?.data?.acknowledged) {
          refetch()
          Swal.fire(
            "Cancelled!",
            "Your appointment has been cancelled.",
            "success"
          );
        }
      }
    });
  }

  const handleTableChange = async (data) => {
    
    setPagination({ current: data.current, pageSize: data.pageSize });
  };
  return (
    <>
      <Title text={"My Appointments"} />
      <Table
      dataSource={data?.data}
       columns={columns}
        className="w-full overflow-auto"
        pagination={{
          pageSize: pagination?.pageSize,
          current: pagination?.current,
          total: data?.total,
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default Appointments;
