import { useQuery } from "@tanstack/react-query";
import Title from "../Title";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import { Button, Table } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const {user} = useContext(AuthContext)

  const {
    data: users,
    isLoading: usersLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["users", pagination],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?currentPage=${pagination.current}&pageSize=${pagination.pageSize}`);
      return res?.data;
    },
  });

  if (isError) {
    console.log(isError);
  }

  if (usersLoading) return <Loading />;

  console.log(users);

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
        return <div className="flex gap-5">
          <div className="flex-1">
            {record.status === "active" ? <Button>Block</Button> : <Button>Unblock</Button>}
          </div>
          <div className="flex-1">
            {record.role === "admin" ? <Button disabled={record.email === user?.email}>Make as User</Button> : <Button>Make as admin</Button>}
          </div>

          <div>
            
          </div>
        </div>
      }
    },
  ];

  const handleTableChange = async (data) => {
    setPagination({ currentPage: data.currentPage, pageSize: data.pageSize });
  };
  return (
    <>
      <Title text={"All Users"} />
      <Table
        className="w-full overflow-auto"
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: pagination.pageSize,
          current: pagination.current,
          total: users.length,
          showTotal: (total) => `Total ${total} user details in this page`,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
      />
    </>
  );
};

export default AllUsers;
