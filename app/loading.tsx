"use client"

import { Spinner } from "@material-tailwind/react";

const Loading = () => {
    return (
        <div className='flex items-center justify-center h-full'>
            <Spinner className="h-10 w-10" />
        </div>
    )
}

export default Loading