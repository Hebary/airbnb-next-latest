'use client';

import { FC, useState } from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm, FieldValues, SubmitHandler, set } from 'react-hook-form';
import { useRegisterModal } from '@/app/hooks';
import { Modal } from './'

interface Props {}

const RegisterModal:FC = ({}) => {

  const registerModel = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name:'',
      email: '',
      password: '',
    }
  });


  const onSubmit: SubmitHandler<FieldValues> = async ({name, email, password}) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      registerModel.onClose();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      disabled={ isLoading }
      isOpen={ registerModel.isOpen }
      title='Sign Up'
      actionLabel='Continue'
      onClose={ registerModel.onClose }
      onSubmit={ handleSubmit(onSubmit) }
    />
  )
}

export default RegisterModal