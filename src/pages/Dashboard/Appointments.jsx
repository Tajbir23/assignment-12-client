import { Table } from "antd";
import useMyAppointments from "../../hooks/useMyAppointments";
import Title from "./Title";
import Loading from "../../components/Loading";
import { useState } from "react";

const Appointments = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useMyAppointments(pagination);
  
  if (isLoading) return <Loading />;

  console.log(data);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    }
  ]

  const handleTableChange = async (data) => {
    
    setPagination({ current: data.current, pageSize: data.pageSize });
  };
  return (
    <>
      <Title text={"My Appointments"} />
      <Table
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
