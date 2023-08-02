import { BsCalendar, BsCalendarCheck, BsCalendarPlus, BsTrash3 } from 'react-icons/bs'

const SideBar = ({ selectedStatus, setSelectedStatus }: any) => {
    const handleStatusFilter = (status: string) => {
        setSelectedStatus(status); // Set the selected status
    };
    console.log(selectedStatus);
    return (
        <>
            <div className="space-y-4">
                <button
                    onClick={() => handleStatusFilter("all")}
                    className={`btn w-full flex justify-start hover:bg-blue-50 hover:text-blue-600 ${selectedStatus === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-500'}`}
                >
                    {/* <BsCalendar className="text-2xl me-3" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>

                    <span className="text-xl">All</span>

                </button>
                <button
                    onClick={() => handleStatusFilter("todo")}
                    className={`btn w-full flex justify-start hover:bg-blue-50 hover:text-blue-600 ${selectedStatus === 'todo' ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-500'}`}
                >
                    {/* <BsCalendarPlus className="text-2xl me-3" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>

                    <span className="text-xl">Todo</span>
                </button>
                <button
                    onClick={() => handleStatusFilter("done")}
                    className={`btn w-full flex justify-start hover:bg-blue-50 hover:text-blue-600 ${selectedStatus === 'done' ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-500'}`}
                >
                    {/* <BsCalendarCheck className="text-2xl me-3" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                    </svg>

                    <span className="text-xl">Done</span>
                </button>
                <button
                    onClick={() => handleStatusFilter("deleted")}
                    className={`btn w-full flex justify-start hover:bg-blue-50 hover:text-blue-600 ${selectedStatus === 'deleted' ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-500'}`}
                >
                    {/* <BsTrash3 className="text-2xl me-3" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 me-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>


                    <span className="text-xl">Deleted</span>
                </button>
            </div>


            <div className="flex justify-center lg:justify-start my-6 items-baseline space-x-2">
                <img src='/next.svg' alt='next logo' className='w-1/4' />
                <span>&copy; 2023 Vercel, Inc.</span>
            </div>
        </>
    );
};

export default SideBar;
