'use client';

import { FC, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react";
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';

import { Button, Heading } from '..';
import { Input } from '../inputs';
import { Modal } from '.'
import { useLoginModal, useRegisterModal } from '@/app/hooks';

interface Props {}

const LoginModal:FC = ({}) => {

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ email, password}) => {
    signIn('credentials', { email, password, redirect: false})
      .then((callback) => {
        setIsLoading(false);
        
        if(callback?.error) {
          return toast.error(callback.error)
        }

        if(callback?.ok) {
          toast.success('Welcome back!')
          router.refresh();
          reset();
          loginModal.onClose();
        }

      }
    )
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome back'
        subtitle='Login to to your account!'
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
   
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button 
        outline 
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')} 
      />
      <Button 
        outline 
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div 
        className='
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        '
      >
        <p>First time using Airbnb?
          <span 
            onClick={onToggle} 
            className='
              text-neutral-800
              cursor-pointer 
              hover:underline
            '
            > Create an Account</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={ isLoading }
      isOpen={ loginModal.isOpen }
      title='Login'
      actionLabel='Continue'
      onClose={ loginModal.onClose }
      onSubmit={ handleSubmit(onSubmit) }
      body={ bodyContent }
      footer={ footerContent }
    />
  )
}

export default LoginModal