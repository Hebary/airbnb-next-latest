'use client';

import { FC, useCallback, useState } from 'react'
import { signIn } from "next-auth/react";
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import axios from 'axios'
import { toast } from 'react-hot-toast';

import { useLoginModal, useRegisterModal } from '@/app/hooks';
import { Modal } from './'
import { Button, Heading } from '../';
import { Input } from '../inputs';


const RegisterModal:FC = () => {

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
    defaultValues: {
      name:'',
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async ({name, email, password}) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/auth/registry', { name, email, password });
      registerModal.onClose();
      reset();
      toast.success(`Welcome to Airbnb ${ data.name }!`);
      loginModal.onOpen();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title='Welcome to Airbnb'
        subtitle='Create an account!'
      />
      
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
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
        onClick={ () => signIn('google') } 
          
      />
      <div 
        className='
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        '
      >
        <p>Already have an account?
          <span 
            onClick={onToggle} 
            className='
              text-neutral-800
              cursor-pointer 
              hover:underline
            '
            > Log in</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={ isLoading }
      isOpen={ registerModal.isOpen }
      title='Sign Up'
      actionLabel='Continue'
      onClose={ registerModal.onClose }
      onSubmit={ handleSubmit(onSubmit) }
      body={ bodyContent }
      footer={ footerContent }
    />
  )
}

export default RegisterModal