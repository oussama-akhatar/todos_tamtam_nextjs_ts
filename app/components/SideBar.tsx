const SideBar = ({ selectedStatus, setSelectedStatus, isLoading }: any) => {
    const handleStatusFilter = (status: string) => {
        setSelectedStatus(status); // Set the selected status
    };
    return (
        <>
            <button
                onClick={() => handleStatusFilter("all")}
                className={`btn w-full bg-white text-purple-600 hover:bg-purple-100 ${selectedStatus === 'all' ? 'bg-purple-100' : ''}`}
                disabled={isLoading}
            >
                All
            </button>
            <button
                onClick={() => handleStatusFilter("todo")}
                className={`btn w-full bg-white text-purple-600 hover:bg-purple-100 ${selectedStatus === 'todo' ? 'bg-purple-100' : ''}`}
                disabled={isLoading}
            >
                Todo
            </button>
            <button
                onClick={() => handleStatusFilter("done")}
                className={`btn w-full bg-white text-purple-600 hover:bg-purple-100 ${selectedStatus === 'done' ? 'bg-purple-100' : ''}`}
                disabled={isLoading}
            >
                Done
            </button>
        </>
    );
};

export default SideBar;
