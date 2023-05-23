'use client';

import { FC, useCallback, useState } from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { signIn } from "next-auth/react";
import { useLoginModal } from '@/app/hooks';
import { Modal } from '.'
import { Button, Heading } from '..';
import { Input } from '../inputs';

interface Props {}

const LoginModal:FC = ({}) => {

  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });


  const onSubmit: SubmitHandler<FieldValues> = async ({ email, password}) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/auth/login', {  email, password });
      loginModal.onClose();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    // loginModal.onOpen();
  }, [loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome to Airbnb'
        subtitle='Sign In!'
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
        onClick={() => signIn('google') } 
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
        <p>You don&apos;t have an account?
          <span 
            onClick={onToggle} 
            className='
              text-neutral-800
              cursor-pointer 
              hover:underline
            '
            > Sign Up</span>
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