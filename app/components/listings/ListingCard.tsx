'use client';

import { FC, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { Listing, Reservation, User } from '@prisma/client';
import {  format } from 'date-fns';

import { useCountries } from '@/app/hooks';
import { Button, HeartButton } from '@/app/components';


interface Props {
    listing      : Listing
    currentUser ?: User
    reservation ?: Reservation
    onAction    ?: (id: string) => void
    disabled    ?: boolean
    actionLabel ?: string
    actionId    ?: string
}

const ListingCard: FC<Props> = ({ listing, currentUser, reservation, onAction, disabled, actionLabel, actionId }) => {

    const router = useRouter();
    const {  getByValue } = useCountries();
    const location = getByValue(listing.locationValue);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if(disabled) return;

        onAction?.(actionId as string);
    }, [onAction, actionId, disabled])

    const price = useMemo(() => {
        if(reservation) {
            return reservation.totalPrice;
        }
        return listing.price;

    }, [ reservation, listing.price ])
    

    const reservationDate = useMemo(() => {
        if(!reservation) return;
        const startDate = new Date(reservation.startDate);
        const endDate = new Date(reservation.endDate);
        return `${format(startDate, 'PP')} - ${format(endDate, 'PP')}`;
    },[reservation])

    return (
        <div onClick={() => router.push(`/listings/${listing.id}`) } className='col-span-1 cursor-pointer group'>
            <div className='flex flex-col gap-2 w-full'>
                <div className='aspect-square w-full relative overflow-hidden rounded-xl'>
                    <Image
                        fill
                        alt={`${listing.title} image`}
                        src={listing.imageSrc}
                        className='object-cover h-full w-full group-hover:scale-105 transition-all duration-300'
                    />
                    <div className='absolute top-3 right-3'>
                        <HeartButton
                            listingId={listing.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className='font-semibold text-lg'>
                    { location?.region }, { location?.label }
                </div>
                <div className='text-neutral-500 font-light'>
                    {reservationDate || listing.category} 
                </div>
                <div className='flex flex-row items-center gap-1'>
                    <div className='font-semibold'>
                        ${ price }
                    </div>
                    {!reservation && (
                        <div className='font-light'>night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={ actionLabel }
                        onClick ={ handleCancel }                    
                    />
                )}
            </div>
        </div>
    )
}

export default ListingCard;