'use client';


import { FC, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import { useRentModal } from '@/app/hooks';
import { categories } from '@/app/components/navbar/Categories';
import { CategoryInput, Counter, CountrySelect, ImageUpload, Input } from '@/app/components/inputs';
import { Modal } from '@/app/components/modals'
import { Heading } from '@/app/components';


enum STEPS  {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal : FC = () => {

    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onBack = () => { 
      if(step === STEPS.CATEGORY) 
        return rentModal.onClose();
        setStep( value => value - 1);
    }

    const onNext = () => {
      if(step === STEPS.PRICE) 
        return rentModal.onClose();
        setStep( value => value + 1);
    }


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      if (step !== STEPS.PRICE) {
        return onNext();
      }
      
      setIsLoading(true);
      
      axios.post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY)
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
    }


    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE){ 
            return 'Create';
        }
            return 'Next';
    }, [ step ])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY){ 
            return undefined;
        }
        return 'Back';
    }, [ step ])
    

    const { register, handleSubmit, setValue, watch, formState: { errors}, reset } = useForm<FieldValues>({
      defaultValues: {
        category      : '',
        location      : undefined,
        guestCount    : 1,
        roomCount     : 1,
        bathroomCount : 1,
        imageSrc      : '',
        price         : 1,
        title         : '',
        description   : '',
      }
  });

  
  const location = watch('location');
  const category = watch('category');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');
  
  
  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false,
  }), [location])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

    let bodyContent = (
        <div className='flex flex-col gap-8'>
          <Heading
            title='Which of these best describes your place?'
            subtitle='Pick a category'
          />
          <div className=' grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>
            {categories.map((item) => (
              <div key={item.label} className='col-span-1'>
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
    )

    if(step === STEPS.LOCATION) {
        bodyContent = (
          <div className='flex flex-col gap-8'>
            <Heading title ='Where is your place located ?' subtitle={'Help guests find you!'}/>
            <CountrySelect
              onChange={ (value) => setCustomValue('location', value) }
              value={ location }
            />
            <Map
              center = { location?.latlng }
            />
          </div>  
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
          <div className='flex flex-col gap-8'>
            <Heading 
              title ='Share some basics about your place' 
              subtitle={ 'How is your place ?' }/>
            <Counter
              title={ 'Guests' }
              subtitle={ 'How many guests can you allow?' }
              onChange={ (value) => setCustomValue('guestCount', value) }
              value={guestCount}
            />
            <Counter
              title={ 'Rooms' }
              subtitle={ 'How many rooms do you have?' }
              onChange={ (value) => setCustomValue('roomCount', value) }
              value={roomCount}
            />
            <Counter
              title={ 'Bathrooms' }
              subtitle={ 'How many bathrooms do you have?' }
              onChange={ (value) => setCustomValue('bathroomCount', value) }
              value={bathroomCount}
            />
          </div>
        )
    }

    if(step === STEPS.IMAGES) {
        bodyContent = (
          <div className='flex flex-col gap-8'>
            <Heading
              title='Add some photos of your place'
              subtitle='Show guests waht your place looks like'
            />
            <ImageUpload
              onChange={ (value) => setCustomValue('imageSrc', value) }
              value={ imageSrc }
            />
          </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
      bodyContent = (
        <div className='flex flex-col gap-8'>
          <Heading
            title='How would you describe your place?'
            subtitle='Short and sweet works best!'
          />
          <Input
            id='title'
            label='Title'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id='description'
            label='Description'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      )
    }

    if (step === STEPS.PRICE) {
      bodyContent = (
        <div className='flex flex-col gap-8'>
          <Heading
            title='Now, set your price'
            subtitle='How much do you charge per night?'
          />
          <Input
            id='price'
            label='Price'
            formatPrice 
            type='number' 
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      )
    }

    return (
        <Modal
            onClose = { rentModal.onClose }
            title={ 'Airbnb your home!' }
            isOpen={ rentModal.isOpen }
            onSubmit={ handleSubmit(onSubmit) }
            actionLabel={ actionLabel }
            secondaryActionLabel={ secondaryActionLabel }
            secondaryAction = { step === STEPS.CATEGORY ? undefined : onBack }
            body = { bodyContent }
        />

    )
}

export default RentModal

