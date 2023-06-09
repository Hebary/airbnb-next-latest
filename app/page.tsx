import { User } from '@prisma/client';
import { getCurrentUser, getListings } from './actions';
import { Container, EmptyState } from './components'
import { ListingCard } from './components/listings';
import { IListingParams } from './actions/getListings';


interface Props {
  searchParams: IListingParams
}

const Home =  async ({ searchParams }: Props) => {
  
  const listings = await getListings(searchParams);
  const user = await getCurrentUser();

  if( listings.length === 0  ) return <EmptyState showReset/>;
  return (
    <Container>
      <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols 2xl:grid-cols-6 gap-8'>
        {
          listings.map(listing => (
              <ListingCard
                currentUser={ user as User }
                key={ listing.id }
                listing={ listing }
              />
            ))
        }
      </div>
    </Container>
  )
}

export default Home;