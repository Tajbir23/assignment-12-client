

const TestCard = ({item}) => {
    
    const date = new Date(Number(item?.date)).toDateString()
    
  return (
    <div className="flex flex-col rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800 w-full md:w-[47%] lg:w-[32%]">
      <img className="w-full h-48 object-cover" src={item?.image} alt={item?.title} />
      <div className="p-6 flex flex-col justify-between">
        <div>
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.title}</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{item?.description}</p>
        </div>
        <div className="flex justify-between items-center pt-4">
          <span className="text-sm font-medium text-gray-900 dark:text-white">Price : {item?.price}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Slot : {item?.slot}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Date : {date}</span>
        </div>
        <button
          className="mt-4 py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          
        >
          Details
        </button>
      </div>
    </div>
  )
}

export default TestCard