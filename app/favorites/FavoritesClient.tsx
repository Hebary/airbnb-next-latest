import { Listing, User } from '@prisma/client';
import { FC } from 'react'
import { Container, Heading } from '../components';
import { ListingCard } from '../components/listings';


interface Props{
    listings: Listing[]
    currentUser?: User | null
}

const FavoritesClient:FC<Props> = ({ listings, currentUser }) => {
     return (
        <Container>
            <Heading
                title='Favorites'
                subtitle='Places you have favorited'
            />

            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {   
                    listings.map((listing) => (
                        <ListingCard
                            key={ listing.id }
                            listing={ listing }
                            currentUser={ currentUser as User }
                        />
                    ))
                }
            </div>
        </Container>
    )
}

export default FavoritesClient;