'use client';

import Image from 'next/image'
import { FC } from 'react';

interface Props {
    src?: string | null
}

const Avatar:FC<Props> = ({ src }) => {
  return (
        <Image 
            className='rounded-full' 
            width={30} 
            height={30} 
            alt='Avatar' 
            src={ src ?? '/placeholder.jpg' }
        />
    )
}

export default Avatar