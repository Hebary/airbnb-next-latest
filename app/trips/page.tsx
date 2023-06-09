import { getCurrentUser, getReservations } from '../actions';
import { EmptyState } from '../components';
import TripsClient from './TripsClient';


const Trips = async () => {
    const user = await getCurrentUser();

    if (!user) {
        return <EmptyState 
            title='Unauthorized' 
            subtitle='Login to view, plase.' 
        />
    }

    const reservations = await getReservations({ userId: user.id});
    
    if(reservations.length === 0){
        return <EmptyState 
            title='No Trips' 
            subtitle='Looks like you havent reserverd any trips.' 
        />
    }
    
    return (
        <div>
            <TripsClient
                reservations={reservations}
                currentUser={user}
            />
        </div>
    )
}

export default Trips