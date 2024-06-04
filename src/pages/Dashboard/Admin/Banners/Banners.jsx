import { Table } from "antd";
import useBanners from "../../../../hooks/useBanners";
import Loading from "../../../../components/Loading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";

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
        <div className="flex items-center space-x-2">
          <input
            onChange={() => handleChange(record)}
            type="checkbox"
            checked={record.isActive}
          />
          <span className="text-sm">{text ? "Active" : "Inactive"}</span>
        </div>
      ),
    },
  ];

  const handleChange = async (record) => {
    const bannerId = record._id;

    try {
      const response = await axiosSecure.patch("/activate_banner", {
        bannerId,
      });
      
      if (response.data.modifiedCount) {
        refetch();
        toast.success("Banner status activate successfully");
      } else {
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
    <Table
      className="w-full"
      dataSource={banners}
      columns={columns}
      rowKey="id"
      pagination={{
        pageSize: pagination.pageSize,
        current: pagination.current,
        total: banners.length,
        showTotal: (total) => `Total ${total} banners`,
        
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        showQuickJumper: true,
      }}
      onChange={handleTableChange}
    />
  );
};

export default Banners;
