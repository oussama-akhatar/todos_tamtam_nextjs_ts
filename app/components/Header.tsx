const Header = ({ children }: any) => {
    return (
        <div className='flex justify-between items-center'>
            <h1 className="text-5xl font-semibold mb-3 flex space-x-2 items-baseline ">
                <span>Todo.Tamtam</span>
                <img src='/ts.svg' alt='next logo' className='cursor-pointer w-8' />
            </h1>
            <div className='flex space-x-3'>
                {children}
            </div>
        </div>
    )
}

export default Header