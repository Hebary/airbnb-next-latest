'use client';

import { FC } from 'react'
import { User } from '@prisma/client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';


interface Props{
    listingId ?: string;
    currentUser ?: User;
}

const HeartButton:FC<Props> = ({ listingId, currentUser }) => {
    const hasFavorited = false;
    const toggleFavorite = () => {};

    return (
        <div onClick={ toggleFavorite } className='relative hover:opacity-80 transition cursor-pointer'> 
            <AiOutlineHeart size={28} className='fill-rose-400 absolute -top-[2px] -right-[2px] '/>
            <AiFillHeart size={24} className={`${ hasFavorited ? 'fill-rose-500' : 'fill-transparent'} `}/>
        </div>
    )
}

export default HeartButton;