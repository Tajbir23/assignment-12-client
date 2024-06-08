import { useQuery } from "@tanstack/react-query";
import Title from "../Title";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { Button, Table } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserPdfTable from "./UserPdfTable";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [downloadMOdal, setDownloadMOdal] = useState({
    modal: false,
    email: ''
  })

  const navigate = useNavigate()
  const { user } = useContext(AuthContext);

  const {
    data: users,
    isLoading: usersLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["users", pagination],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?currentPage=${pagination.current}&pageSize=${pagination.pageSize}`);
      return { data: res?.data.data, total: res.data.total };
    },
  });

  if (isError) {
    console.log(isError);
  }

  if (usersLoading) return <Loading />;

  const handleStatus = async (status, id, name) => {
    const response = await axiosSecure.patch(`/status_action?status=${status}&id=${id}`);
    if (response.data.modifiedCount) {
      refetch();
      toast.success(`${name} ${status} successfully`);
    }
  };

  const handleRole = async (role, id) => {
    const response = await axiosSecure.patch(`/role_action?role=${role}&id=${id}`);
    if (response.data.modifiedCount) {
      refetch();
      toast.success(`${name} switch to ${role} successfully`);
    }
  };

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "User name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Upozilla",
      dataIndex: "upozilla",
      key: "upozilla",
    },
    {
      title: "Action",
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            <div className="flex-1">
              {record.status === "active" ? (
                <Button
                  disabled={record?.email === user?.email}
                  onClick={() => handleStatus("blocked", record?._id, record.name)}
                >
                  Block
                </Button>
              ) : (
                <Button
                  onClick={() => handleStatus("active", record._id, record.name)}
                >
                  Unblock
                </Button>
              )}
            </div>
            <div className="flex-1">
              {record?.role === "admin" ? (
                <Button
                  onClick={() => handleRole("user", record?._id)}
                  disabled={record?.email === user?.email}
                >
                  Make as User
                </Button>
              ) : (
                <Button onClick={() => handleRole("admin", record?._id)}>
                  Make as admin
                </Button>
              )}
            </div>

            <div className="flex-1">
              <Button onClick={() => {
                setDownloadMOdal({
                  modal: true,
                  email: record.email
                })
                
              }}>Download</Button>
            </div>
          </div>
        );
      },
    },
  ];

  const handleTableChange = async (data) => {
    setPagination({ current: data.current, pageSize: data.pageSize });
  };

  return (
    <div className="relative">
      <Title text={"All Users"} />
      <Table
        className="w-full overflow-auto"
        dataSource={users.data}
        columns={columns}
        pagination={{
          pageSize: pagination.pageSize,
          current: pagination.current,
          total: users.total,
        }}
        onChange={handleTableChange}
      />
      {downloadMOdal.modal && <UserPdfTable email={downloadMOdal.email} setDownloadMOdal={setDownloadMOdal} />}
    </div>
  );
};

export default AllUsers;
