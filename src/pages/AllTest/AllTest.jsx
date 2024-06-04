import { Pagination } from "antd";
import Loading from "../../components/Loading";
import TestCard from "../../components/TestCard";
import useAllTest from "../../hooks/useAllTest"
import Title from "../Dashboard/Title";
import { useState } from "react";


const AllTest = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const {data, isLoading, refetch} = useAllTest(currentPage);
  

  const handlePagination = (page) => {
    console.log(page)
    setCurrentPage(page)
  }

  if(isLoading) return <Loading />;
  return (
    <>
      <Title text={'All Test'} />
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-5">
        {data && data.data.map((item) => <TestCard key={item?._id} item={item} />)}
      </div>
      <div className="flex mt-5 justify-center">
        <Pagination defaultCurrent={currentPage} pageSize={6} total={data.total} onChange={handlePagination} />
      </div>
    </>
  )
}

export default AllTest