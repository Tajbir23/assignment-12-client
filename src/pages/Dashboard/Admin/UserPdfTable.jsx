

import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/Loading';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from 'antd';



const UserPdfTable = ({email, setDownloadMOdal}) => {
    const axiosSecure = useAxiosSecure()
    const {data, isLoading} = useQuery({
        queryKey: [email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-test-report/${email}`)
            console.log(res?.data)
            return res?.data
        }
    })
    if(isLoading) return <Loading />

    const generatePDF = () => {
        const unit = 'pt';
        const size = 'A4'; // Use A1, A2, A3, A4 or A5 as needed
        const orientation = 'landscape'; // 'portrait' or 'landscape'

        const doc = new jsPDF(orientation, unit, size);

        const headers = [['user name', 'user email', 'Test', 'status']]; // Example headers

        const item = data.map(row => [row.name, row.email, row.serviceName, row.status]); // Adjust according to your data structure

        doc.autoTable({
            head: headers,
            body: item,
            startY: 40 // Adjust this value to start table lower or higher on the page
        });

        doc.save(`${email}.pdf`);
    };


    console.log(data)
  return(
    <div className='absolute z-50 top-0 h-screen w-full flex items-center justify-center bg-slate-600 bg-opacity-25'>
        <div className='bg-white p-10 shadow-2xl rounded-xl'>
        <h1 className='font-bold text-xl mb-5'>Do you want to download <span className='text-red-700'>{email}</span> details pdf?</h1>
        <div className='flex gap-3'>
            <Button onClick={generatePDF}>Download Pdf</Button>
            <Button onClick={() => setDownloadMOdal({...email, modal: false})} className='bg-red-600'>Close</Button>
        </div>
        </div>
    </div>
  )
};

export default UserPdfTable;
