'use client';

import {  FC, useCallback, useState } from 'react'
import { Listing, Reservation, User } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'
import { Container, Heading } from '../components';
import { ListingCard } from '../components/listings';
import axios from 'axios';


interface Props{
    currentUser?: User | null;
    reservations: (Reservation & {listing: Listing})[];
}

const ReservationsClient:FC<Props> = ({currentUser, reservations}) => {
    
    const router = useRouter();
    const [ deleteId, setDeleteId ] = useState<string | null>(null);


    const onCancel = useCallback(async (id: string) => {
        setDeleteId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation canceled');
            router.refresh();
        })
        .catch(() => {
            toast.error('Something went wrong');
        })
        .finally(() => {
            setDeleteId('');
        })
    }, [router]);
    
    return (
        <Container> 
            <Heading
                title='Your Reservations'
                subtitle='Booking on your properties'
            />
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {reservations.map(reservation => (
                    <ListingCard
                        key={reservation.id}
                        listing={reservation.listing}
                        reservation={reservation}
                        onAction={onCancel}
                        actionId={reservation.id}
                        disabled={deleteId === reservation.id}
                        actionLabel={'Cancel guest reservation'}
                        currentUser={currentUser as User}
                    />
                ))}
            </div>
        </Container>
    )   
}

export default ReservationsClient;