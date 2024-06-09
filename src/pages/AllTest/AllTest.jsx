import { Pagination } from "antd";
import Loading from "../../components/Loading";
import TestCard from "../../components/TestCard";
import useAllTest from "../../hooks/useAllTest"
import Title from "../Dashboard/Title";
import { useState } from "react";


const AllTest = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [filter, setFilter] = useState()
  const {data, isLoading} = useAllTest({currentPage, filter});
  

  const handlePagination = (page) => {
    console.log(page)
    setCurrentPage(page)
  }

  const handleFilter = (e) => {
    e.preventDefault()
    const date = new Date(e.target.filter.value).getTime();
    setFilter(date)
  }

  if(isLoading) return <Loading />;
  return (
    <>
      <Title text={'All Test'} />
      <form onSubmit={handleFilter} className="flex gap-5 flex-1 my-5">
        <input type="date" name="filter" className=" p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        <button type="submit" className="btn btn-primary">Filter</button>
      </form>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-5 flex-1">
        {data && data?.data?.map((item) => <div key={item?._id} className="md:w-[47%] lg:w-[32%]"><TestCard  item={item} /></div>)}
      </div>
      <div className="flex mt-5 justify-center">
        <Pagination defaultCurrent={currentPage} pageSize={6} total={data?.total} onChange={handlePagination} />
      </div>
    </>
  )
}

export default AllTest