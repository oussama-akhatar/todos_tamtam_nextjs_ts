const Header = ({ children }: any) => {
    return (
        <div className='flex flex-col lg:flex-row justify-between items-center'>
            <h1 className="text-5xl font-semibold mb-3 flex space-x-2 items-baseline ">
                <span>Todo.Tamtam</span>
                <img src='/ts.svg' alt='next logo' className='cursor-pointer w-8' />
            </h1>
            <div className='flex justify-center items-center'>
                {children}
            </div>
        </div>
    )
}

export default Header