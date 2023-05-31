'use client';

import { FC } from 'react'
import { useRouter } from 'next/navigation'

import Heading from './Heading';
import Button from './Button';


interface Props{
    title     ?: string
    subtitle  ?: string
    showReset ?: boolean
}

const EmptyState:FC<Props> = ({ 
    title='No matches found', 
    subtitle='Try changing or removing some filters', 
    showReset 
}) => {

    const router = useRouter();

    return (
        <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
            <Heading
                center
                title={title}
                subtitle={subtitle}
            />
            {showReset &&
                <div className='w-48 m-4'>
                    <Button outline label='Remove filters' onClick={()=>router.push('/')} />
                </div>
            }
        </div>
    )
}

export default EmptyState;