'use client';

import { FC } from 'react'
import { Container } from '..'
import { Logo, Search, UserMenu } from '.'


const Navbar:FC = () => {
  return (
    <div className='fixed w-full shadow-sm bg-white z-10'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                    <Logo/>
                    <Search/>
                    <UserMenu/>
                </div>
            </Container>
        </div>
    </div>
  )
}

export default Navbar