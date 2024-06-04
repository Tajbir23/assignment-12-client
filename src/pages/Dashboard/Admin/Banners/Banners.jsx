import { Table } from "antd";
import useBanners from "../../../../hooks/useBanners";
import Loading from "../../../../components/Loading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Banners = () => {
  const { banners, bannersLoading, refetch } = useBanners();
  const axiosSecure = useAxiosSecure();

  if (bannersLoading) return <Loading />;

  const columns = [
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "coupon",
      dataIndex: "coupon",
      key: "coupon",
    },
    {
      title: "rate",
      dataIndex: "rate",
      key: "rate",
      render: (text) => `${text}%`,
    },
    {
      title: "isActive",
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
      if (response.modifiedCount) {
        refetch();
        toast.success("Banner status activate successfully");
      } else {
        toast.error("Failed to activate banner");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table
      className="w-full"
      dataSource={banners}
      columns={columns}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        showQuickJumper: true,
      }}
    />
  );
};

export default Banners;
