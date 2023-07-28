const SideBar = ({ selectedStatus, setSelectedStatus, isLoading } : any) => {
    return (
        <>
            <button
                onClick={() => setSelectedStatus('all')}
                className={`btn w-full btn-secondary ${selectedStatus === 'all' ? '' : 'btn-outline'}`}
                disabled={isLoading}
            >
                All
            </button>
            <button
                onClick={() => setSelectedStatus('todo')}
                className={`btn w-full btn-secondary ${selectedStatus === 'todo' ? '' : 'btn-outline'}`}
                disabled={isLoading}
            >
                Todo
            </button>
            <button
                onClick={() => setSelectedStatus('done')}
                className={`btn w-full btn-secondary ${selectedStatus === 'done' ? '' : 'btn-outline'}`}
                disabled={isLoading}
            >
                Done
            </button>
        </>
    );
};

export default SideBar;
