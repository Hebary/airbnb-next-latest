'use client';

import { FC, useCallback, useState } from 'react'
import { signOut } from 'next-auth/react';
import { AiOutlineMenu } from 'react-icons/ai'
import { User } from '@prisma/client';

import { Avatar } from '..'
import { MenuItem } from '.'
import { useLoginModal, useRegisterModal, useRentModal } from '@/app/hooks';

interface Props {
    currentUser?: User | null
}

const UserMenu:FC<Props> =  ({ currentUser }) => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsOpen( value => !value );
    },[])

    const handleClick = (label:string) => {
        if(label === 'Login'){
            loginModal.onOpen();
            toggleMenu()
            return;
        }

        registerModal.onOpen();
        toggleMenu()
    }

    const onRent = useCallback(() => {
        if(!currentUser) 
            return loginModal.onOpen();
            
            rentModal.onOpen();

    }, [currentUser, loginModal, rentModal]);

     return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                <div className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer' 
                    onClick={ onRent }>
                        Airbnb your home
                </div>
                <div className='p-4 md:py-1 md:px-2 border-[1px] hover:bg-neutral-100 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-sm transition' 
                    onClick={ toggleMenu }>
                        <AiOutlineMenu/>
                        <div className='hidden md:block'>
                            <Avatar src={ currentUser?.image }/>
                        </div>
                </div>
            </div>
        { isOpen && (
            <div className='absolute rounded-xl shadow-md w-[40vh] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                    {   currentUser ? (
                            <>
                                <MenuItem 
                                    label={'My trips'} 
                                    onClick={ ()=>{} }
                                />
                                <MenuItem 
                                    label={'My favorites'} 
                                    onClick={ ()=>{} }
                                />
                                <MenuItem 
                                    label={'My reservations'} 
                                    onClick={ ()=>{} }
                                />

                                <MenuItem 
                                    label={'My propereties'} 
                                    onClick={ ()=>{} }
                                />
                                <MenuItem 
                                    label={'Airbnb my home'} 
                                    onClick={ () => { onRent(); toggleMenu(); } }
                                />
                                <hr/>
                                <MenuItem 
                                    label={'Sign out'} 
                                    onClick={ ()=>signOut() }
                                />
                            </>
                        ) : 
                        (
                            <>
                                <MenuItem 
                                    label={'Login'} 
                                    onClick={ () => handleClick('Login') }
                                />
                                <MenuItem 
                                    label={'Sign Up'} 
                                    onClick={ () => handleClick('SignUp') }
                                />
                            </>
                        )
                    }
                </div>
            </div>
        )}
        </div>
    );
}

export default UserMenu