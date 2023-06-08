import { getCurrentUser, getListingById, getReservations } from '@/app/actions';
import { EmptyState } from '@/app/components';
import ListingClient from './ListingClient';
import { User } from '@prisma/client';

interface IParams {
    listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();
  
    if(!listing) return ( <EmptyState/> );

    return (
        <ListingClient
            listing={listing}
            reservations={reservations}
            currentUser={currentUser as User}
        />
    )
}

export default ListingPage;