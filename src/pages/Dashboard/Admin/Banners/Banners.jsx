import { Button, Table } from "antd";
import useBanners from "../../../../hooks/useBanners";
import Loading from "../../../../components/Loading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import Title from "../../Title"

const Banners = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const { banners, bannersLoading, refetch } = useBanners(pagination);
  const axiosSecure = useAxiosSecure();

  if (bannersLoading) return <Loading />;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Coupon code",
      dataIndex: "coupon",
      key: "coupon",
    },
    {
      title: "Offer",
      dataIndex: "rate",
      key: "rate",
      render: (text) => `${text}%`,
    },
    {
      title: "Action",
      dataIndex: "isActive",
      key: "isActive",
      render: (text, record) => (
        <div className="flex gap-5">
          <div className="flex flex-1 space-x-2">
          <input
            onChange={() => handleChange(record)}
            type="checkbox"
            checked={record.isActive}
          />
          <span className="text-sm">{text ? "Active" : "Inactive"}</span>
        </div>
        <div>
          <Button onClick={() => handleDelete(record)} >Delete</Button>
        </div>
        </div>
      ),
    },
  ];

  const handleDelete = async (record) => {
    const bannerId = record._id;
    const response = await axiosSecure.delete(`/banner/${bannerId}`)
    if (response.data.deletedCount) {
      refetch();
      toast.success("Banner deleted successfully");
    }
  }

  const handleChange = async (record) => {
    const bannerId = record._id;
    const isActive = record.isActive

    try {
      const response = await axiosSecure.patch("/activate_banner", {
        bannerId,
        isActive:!isActive,
      });
      
      if (response.data.modifiedCount) {
        refetch();
        toast.success("Banner status activate successfully");
      } else {
        refetch();
        toast.error("Failed to activate banner");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTableChange = async(data) => {
    setPagination({currentPage: data.current, pageSize: data.pageSize})
  }

  return (
    <>
    <Title text='All banners' />
      <Table
      className="w-full"
      dataSource={banners}
      columns={columns}
      rowKey="id"
      pagination={{
        pageSize: pagination.pageSize,
        current: pagination.current,
        total: banners.length,
        showTotal: (total) => `Total ${total} banners in this page`,
        
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        showQuickJumper: true,
      }}
      onChange={handleTableChange}
    />
    </>
  );
};

export default Banners;
