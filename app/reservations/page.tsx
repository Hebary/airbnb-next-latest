import { getCurrentUser, getReservations } from '../actions';
import { EmptyState } from '../components';
import ReservationsClient from './ReservationsClient';


export default async function ReservationsPage() {
    const currentUser = await getCurrentUser();
    const reservations = await getReservations({ userId: currentUser?.id});
    
    if(!currentUser) 
        return <EmptyState
            title='Your not logged'
            subtitle='Please login to see your reservations'
        />;
    
    if(reservations.length === 0){
        return <EmptyState
            title='You have no reservations'
            subtitle='Please make a reservation to see it here'
        />;
    }
    
    return (
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}