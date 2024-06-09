// src/ServiceCharts.js
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loading from '../../../../components/Loading';

const ServiceCharts = () => {

const axiosSecure = useAxiosSecure()

const {data, isLoading, isError} = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
        const res = await axiosSecure.get('/statistics')
        return res?.data
    }
})

if(isLoading) return <Loading />

if(isError){
    console.log(isError)
}

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <div>
      <h2>Most Booked Services</h2>
      <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data?.mostlyBooked}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="booking" fill="#8884d8" />
      </BarChart>
      </ResponsiveContainer>
      
      <h2>Service Delivery Ratio</h2>
      <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data.status}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.status.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ServiceCharts;
