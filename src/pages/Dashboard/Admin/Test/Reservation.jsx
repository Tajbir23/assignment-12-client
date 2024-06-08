import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading";
import { useState } from "react";
import Title from "../../Title";
import { Button, Form, Input, Table } from "antd";
import Swal from "sweetalert2";
import UpdateReservation from "./UpdateReservation";


const Reservation = () => {
  const {id} = useParams();
  const axiosSecure = useAxiosSecure();
  const [searchEmail, setSearchEmail] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [updateData, setUpdateData] = useState({
    modal: false,
    id: ''
  })

  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ["reservation", pagination, searchEmail],
    queryFn: async() => {
      const res = await axiosSecure.get(`/reservation/${id}?email=${searchEmail}&current=${pagination.current}`);
      return res.data
    }
  })

  if(isLoading) return <Loading />

  if(isError){
    console.log(isError)
  }

  const columns = [
    {
      title: "Test",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        console.log(text)
        return (
          <div className="flex gap-5">
            {text === "pending" ? <>
            <div>
              <Button onClick={() => handleSubmitReport(record._id)} className="bg-green-500 ">Submit</Button>
            </div>
            <div>
              <Button onClick={() => handleCancelReservation(record)} className="bg-red-500 ">Reject</Button>
            </div>
            </> : text === "delivered" && <div>
              <Button disabled className="bg-green-500 ">Delivered</Button>
            </div> }
          </div>
        )
      }
    }
  ]
  console.log(data)

  const handleSubmitReport = (id) => {
    setUpdateData({modal: true, id: id})
  }

  const handleCancelReservation = async(record) =>    {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this reservation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.post('/cancel-reservation', record)
        if(res.data?.deletedCount){
          refetch()
          Swal.fire({
            title: "Cancelled!",
            text: "Reservation is cancelled",
            icon: "success"
          });
        }
      }
    });
  }

  const handleTableChange = (pagination) => {
    setPagination({current: pagination.current})
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchEmail(e.target.search.value)
  }

  const handleSearchDefault = (e) => {
    e.preventDefault()
    setSearchEmail('')
  }
  return (
    <div className="relative">
      <Title text={"Reservation"} />
      <form onSubmit={handleSearch} className="flex gap-5 items-center justify-center mb-5">
        <input type="text" name="search" placeholder="Search by email" className="max-w-60 mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        <button className="btn bg-blue-700" type="submit">Search</button>
        <button onClick={handleSearchDefault} className="btn bg-green-700">Default</button>
      </form>
      <Table 
        className="w-full overflow-auto"
        dataSource={data?.result}
        columns={columns}
        pagination={{
          pageSize: pagination?.pageSize,
          current: pagination?.current,
          total: data?.total,
        }}
        onChange={handleTableChange}
      />
      {updateData.modal && <UpdateReservation setUpdateData={setUpdateData} updateData={updateData} refetch={refetch} />}
    </div>
  )
}

export default Reservation