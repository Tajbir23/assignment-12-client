import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useState } from "react";
import Loading from "../../components/Loading";
import Title from "./Title";
import { Table } from "antd";

const TestResults = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState('')
  const {data, isLoading, isError} = useQuery({
    queryKey: ['test_results', currentPage],
    queryFn: async () => {
      const response = await axiosSecure.get(`/test-results`)
      return {data: response?.data?.data, total: response?.data?.total}
    }
  })

  if(isError){
    console.log(isError)
  }

  if(isLoading) return <Loading />

  const columns = [
    {
      title: "Test Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Action",
      dataIndex: "link",
      key: "link",
      render: (text, record) => {
        return (
          <a href={text}>View</a>
        )
      }
    }
  ]

  console.log(data.data)

  return (
    <div>
      <Title text={"My test results"} />
      <Table 
        className="w-full overflow-auto"
        dataSource={data?.data}
        columns={columns}
      />
    </div>
  )
}

export default TestResults