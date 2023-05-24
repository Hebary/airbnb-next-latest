'use client';

import { FC } from 'react'

interface Props {
    label: string
    onClick?: () => void
}

const MenuItem:FC<Props> = ({ label, onClick }) => {
  return (
    <div
        onClick={onClick}
        className='px-4 py-3 hover:bg-rose-500 hover:text-white transition-colors duration-200 font-semibold'>
        {label}
    </div>
  )
}

export default MenuItem 