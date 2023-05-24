'use client';

import { FC } from 'react'
import { Container } from '..'
import { Categories, Logo, Search, UserMenu } from '.'
import { User } from '@prisma/client';

interface Props {
    currentUser?: User | null
}

const Navbar:FC<Props> = ({ currentUser }) => {

    return (
    <div className='fixed w-full shadow-sm bg-white z-10'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                    <Logo/>
                    <Search/>
                    <UserMenu currentUser={currentUser}/>
                </div>
            </Container>
        </div>
        <Categories/>
    </div>
  )
}

export default Navbar