import { getCurrentUser, getFavoriteListings } from '../actions';
import { EmptyState } from '../components'; 
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getFavoriteListings();
    if (!currentUser) { 
        return(
            <EmptyState 
                title='No favorites found' 
                subtitle='Looks like you have not signed in or favorited any listings yet.' 
            />
        )
    }

    return (
        <FavoritesClient
            listings={ listings }
            currentUser={ currentUser }
        />
    )
}

export default FavoritesPage;