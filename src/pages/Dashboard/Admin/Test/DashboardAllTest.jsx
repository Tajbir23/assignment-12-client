import { useQuery } from "@tanstack/react-query";
import Title from "../../Title";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../../components/Loading";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import TestUpdateModal from "../../../../components/Dashboard/TestUpdateModal";

const DashboardAllTest = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
    modal: false,
    data: {}
  })
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard-all-test", pagination],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/dashboard-all-test?current=${pagination?.current}`
      );
      return { data: response?.data?.data, total: response?.data?.total };
    },
  });

  if (isLoading) return <Loading />;

  if (isError) {
    console.log(isError);
  }

  console.log(data);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => `${text}$`,
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
      render: (text, record) => `${text} Slot`,
    },
    {
      title: "Navigation",
      render: (text, record) => {
        return (
          <Button
            onClick={() => navigate(`/dashboard/reservation/${record?._id}`)}
          >
            See reservation
          </Button>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-5">
          <div className="flex flex-1 space-x-2">
            <button onClick={() => setUpdateData({modal: true, data: record})} className="bg-blue-500 text-white px-3 py-1 rounded-md">
              Edit
            </button>
            <button
              onClick={() => handleDelete(record)}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handleDelete = async (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${record?.title} service ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/delete-test?id=${record?._id}`);
        
        if (res.data?.deletedCount) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
          refetch();
        }
        
      }
    });
  };

  const handleTableChange = (data) => {
    setPagination({ current: data.current, pageSize: data.pageSize });
    console.log(data);
  };
  return (
    <div className="relative">
      <Title text={"All Test"} />
      <Table
        className="w-full overflow-auto"
        columns={columns}
        dataSource={data?.data}
        pagination={{
          pageSize: pagination.pageSize,
          current: pagination.current,
          total: data?.total,
        }}
        onChange={handleTableChange}
      />
      
        {updateData.modal && <TestUpdateModal updateData={updateData} setUpdateData={setUpdateData} refetch={refetch} />}
      
    </div>
  );
};

export default DashboardAllTest;
