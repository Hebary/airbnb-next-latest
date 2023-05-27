'use client';


import { FC, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { FieldValues, useForm } from 'react-hook-form';

import { useRentModal } from '@/app/hooks';
import { categories } from '../navbar/Categories';
import { CategoryInput, Counter, CountrySelect } from '../inputs';
import { Modal } from '.'
import { Heading } from '..';


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
        category: '',
        location: undefined,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: '',
        price: 1,
        title: '',
        description: '',
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


    return (
        <Modal
            onClose = { rentModal.onClose }
            title={ 'Airbnb your home!' }
            isOpen={ rentModal.isOpen }
            onSubmit={ onNext }
            actionLabel={ actionLabel }
            secondaryActionLabel={ secondaryActionLabel }
            secondaryAction = { step === STEPS.CATEGORY ? undefined : onBack }
            body = { bodyContent }
        />

    )
}

export default RentModal

