import { prisma } from '@/app/lib';

export interface IListingParams {
    userId?: string;
}

export default async function getListing( params : IListingParams ) {
    
    try {

        const { userId } = params;
        
        let query: any = {};
        
        if(userId){
            query.userId = userId;  
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: { 
                createdAt: 'desc'
            }
        })
        return listings

    } catch (error) {
        throw new Error(error as string);
    }
}