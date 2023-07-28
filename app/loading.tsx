import React from 'react'
import Loader from './components/Loader'

const loading = () => {
    return (
        <div className="flex items-center justify-center h-64">
            <Loader /> {/*Display the loader while tasks are loading*/}
        </div>
    )
}

export default loading