import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TestCard = ({item}) => {
    
    const date = new Date(Number(item?.date)).toDateString()
    
  return (
    <div className="flex flex-col rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800 w-full ">
      <img className="w-full h-48 object-cover" src={item?.image} alt={item?.title} />
      <div className="p-6 flex flex-col justify-between">
      <div className='min-h-52'>
        <div className='flex flex-col'>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.title}</h5>
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">{item?.name}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{item?.description}</p>
        </div>
        <div className="flex justify-between items-center pt-4">
          <span className="text-sm font-medium text-gray-900 dark:text-white">Price : {item?.price}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Slot : {item?.slot}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Date : {date}</span>
        </div>
        </div>
        <Link to={`/test_details/${item?._id}`}
          className="mt-4 py-2 px-4 bg-blue-500 text-center text-white font-bold rounded-lg  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 " >
          Details
        </Link>
      </div>
    </div>
  )
}

TestCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slot: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }),
};

export default TestCard