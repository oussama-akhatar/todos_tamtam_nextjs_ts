import { useState } from 'react'
import { PiUserCircleLight } from 'react-icons/pi'

const Header = ({ children }: any) => {
    const [langage, setLangage] = useState('ts')

    return (
        <div className='flex justify-between items-center'>
            <h1 className="text-5xl font-bold mb-3 flex space-x-2 items-baseline ">
                <span>Todo.Tamtam</span>
                {
                    langage == 'ts'
                        ?
                        <img src='/ts.svg' alt='next logo' onClick={() => setLangage('js')} className='cursor-pointer w-8' />
                        :
                        <img src='/js.svg' alt='next logo' onClick={() => setLangage('ts')} className='cursor-pointer w-8 rounded-sm' />
                }
            </h1>
            <div className='flex'>
                {children}
            </div>
        </div>
    )
}

export default Header