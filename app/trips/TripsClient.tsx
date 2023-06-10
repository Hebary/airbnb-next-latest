'use client';

import { FC, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

import axios from 'axios';
import { toast } from 'react-hot-toast';

import { Listing, Reservation, User } from '@prisma/client';
import { Container, Heading } from '../components';
import { ListingCard } from '../components/listings';


interface Props{
    reservations : (Reservation & { listing: Listing })[]
    currentUser?: User | null;
}

const TripsClient:FC<Props> = ({ reservations, currentUser }) => {
    const router = useRouter();
    const [ deleteId, setDeleteId ] = useState<string | null>(null);
    
    const onCancel = useCallback(( id: string )=>{
        setDeleteId(id);
        axios.delete(`/api/reservations/${id}`).then(()=>{
            toast.success('Reservation canceled');
            router.refresh();
        }).catch((error)=> {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }).finally(()=> {
            setDeleteId(null);
        })
    },[router])

    return (
        <Container>
            <Heading title='Trips' subtitle='Where you&apos;ve been and where you&apos;re going '/>
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {
                    reservations?.map((reservation)=>(
                        <ListingCard
                            key={reservation.id}
                            listing={reservation.listing}
                            reservation={reservation}
                            onAction={onCancel}
                            actionId={reservation.id}
                            disabled={deleteId === reservation.id}
                            actionLabel='Cancel reservation'
                            currentUser = {currentUser as User}
                        />   
                    ))
                }
            </div>
        </Container>
    )
}

export default TripsClient;