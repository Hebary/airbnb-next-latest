'use client';

import { FC } from 'react'
import { PuffLoader } from 'react-spinners';

interface Props{}

const Loader:FC<Props> = ({}) => {
     return (
        <div className='h-[70vh] flex flex-col justify-center items-center'> 
            <PuffLoader color='red' size={120} />
        </div>
    )
}

export default Loader;