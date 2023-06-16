'use client';

import { FC, useCallback, useMemo, useState } from 'react'
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import { Range } from 'react-date-range';
import qs from 'query-string'

import { Modal } from './'
import { useSearchModal } from '@/app/hooks';
import { CountrySelectValue } from '../inputs/CountrySelect';
import { formatISO } from 'date-fns';
import { Counter, CountrySelect } from '../inputs';
import { Heading }from '@/app/components';
import { Calendar } from '../inputs';

interface Props{}

const SearchModal:FC<Props> = ({}) => {
    
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const router = useRouter();

    enum STEPS {
        LOCATION =  0,
        DATE     =  1,
        INFO     =  2
    }

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathRoomCount, setBathRoomCount] = useState(1);
    
    const [dateRange, setDateRange] = useState<Range>({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    );    

    const Map = useMemo(() => dynamic(()=> import('../Map'),{
        ssr: false
    }),[location]);

    const onBack = useCallback(
        () => setStep(prev=> prev - 1),
    []);
    
    const onNext = useCallback(
        () => setStep(prev => prev+1),
    []);

    const onSubmit = useCallback(
        () =>  {
            if(step !== STEPS.INFO) return onNext();
            let currentQuery = {};
            if(params) {
                currentQuery = qs.parse(params.toString());
            }

            const updatedQuery: any = {
                ...currentQuery,
                locationValue: location?.value,
                guestCount,
                roomCount,
                bathRoomCount,
            };

            if(dateRange.startDate){
                updatedQuery.startDate = formatISO(dateRange.startDate);
            }

            if(dateRange.endDate){
                updatedQuery.endDate = formatISO(dateRange.endDate);
            }

            const url = qs.stringifyUrl({
                url: '/',
                query: updatedQuery
            }, { skipEmptyString: true, skipNull: true });
        
            setStep(STEPS.LOCATION);
            searchModal.onClose();
            router.push(url);
        },[   
        STEPS.INFO, 
        STEPS.LOCATION, 
        bathRoomCount, 
        dateRange.endDate, 
        dateRange.startDate, 
        guestCount, 
        location?.value, 
        onNext, 
        params, 
        roomCount, 
        router, 
        searchModal, 
        step
    ]);
    
    const actionLabel = useMemo(()=>{
        if(step === STEPS.INFO) {
            return 'Search';
        } else return 'Next';
    },[STEPS.INFO, step]);
    
    const secondaryActionLabel = useMemo(()=>{
        if(step === STEPS.LOCATION) {
            return undefined;
        } else return 'Back';
        
    },[STEPS.LOCATION, step]);
    
    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='Where do you wanna go?'
                subtitle='Find the perfect location'
            />
            <CountrySelect
                value={ location }
                onChange={ (value)=> setLocation(value) }
            />
            <hr/>
            <Map center={ location?.latlng }/>
        </div>
    );

    if(step === STEPS.DATE){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='When do you wanna go?'
                    subtitle='Find the perfect date'
                />
                <Calendar
                    value={ dateRange }
                    onChange={ (value)=> setDateRange(value.selection) }
                />
            </div>        
        )
    }

    if(step === STEPS.INFO){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='More information'
                    subtitle='Find your perfect place!'
                />
                <Counter
                    title='Guests'
                    subtitle='How many guests are coming?'
                    value={ guestCount }
                    onChange={ value => setGuestCount(value) }
                />
                <Counter
                    title='Rooms'
                    subtitle='How many rooms are you looking?'
                    value={ roomCount }
                    onChange={ value => setRoomCount(value) }
                />
                <Counter
                    title='Bathrooms'
                    subtitle='How many bathrooms do you need?'
                    value={ bathRoomCount }
                    onChange={ value => setBathRoomCount(value) }
                />

            </div>
        );
    }

    return (
        <Modal 
            isOpen={ searchModal.isOpen }
            onClose={ searchModal.onClose }
            onSubmit={ onSubmit }
            title='Filters'
            actionLabel={ actionLabel }
            secondaryActionLabel={ secondaryActionLabel }
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body = { bodyContent }
        /> 
            
    )
}

export default SearchModal;