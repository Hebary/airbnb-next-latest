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
        className='px-4 py-3 hover:bg-neutral-200 transition font-semibold'>
        {label}
    </div>
  )
}

export default MenuItem 