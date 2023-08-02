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
                    className={`btn w-full flex justify-start hover:bg-blue-100 hover:text-blue-600 ${selectedStatus === 'all' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-gray-500'}`}
                >
                    <BsCalendar className="text-2xl me-3" /> <span className="text-xl">All</span>
                </button>
                <button
                    onClick={() => handleStatusFilter("todo")}
                    className={`btn w-full flex justify-start hover:bg-blue-100 hover:text-blue-600 ${selectedStatus === 'todo' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-gray-500'}`}
                >
                    <BsCalendarPlus className="text-2xl me-3" /> <span className="text-xl">Todo</span>
                </button>
                <button
                    onClick={() => handleStatusFilter("done")}
                    className={`btn w-full flex justify-start hover:bg-blue-100 hover:text-blue-600 ${selectedStatus === 'done' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-gray-500'}`}
                >
                    <BsCalendarCheck className="text-2xl me-3" /><span className="text-xl">Done</span>
                </button>
                <button
                    onClick={() => handleStatusFilter("deleted")}
                    className={`btn w-full flex justify-start hover:bg-blue-100 hover:text-blue-600 ${selectedStatus === 'deleted' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-gray-500'}`}
                >
                    <BsTrash3 className="text-2xl me-3" /><span className="text-xl">Deleted</span>
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
