import { prisma } from '@/app/lib'

interface IParams {
    listingId?: string 
    }

export default async function getListingById( params: IParams) {
 
    const  { listingId } = params;
 
    if(!listingId) return null;
    
    try {
        const listing = await prisma.listing.findUnique({
            where: { id: listingId },
            include:{
                user: true,
            }
        });
        
        return listing || null;

    } catch (error) {
        throw new Error(error as string);
    }
}