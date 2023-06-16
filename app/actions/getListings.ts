import { prisma } from '@/app/lib';

export interface IListingParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;

}

export default async function getListing( params : IListingParams ) {
    
    try {

        const { 
            userId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category
         } = params;
        
        let query: any = {};
        
        if(userId){
            query.userId = userId;  
        }

        if(category){
            query.category = category;  
        }

        if(guestCount){
            query.guestCount = {
                gte: +guestCount
            };  
        }

        if(roomCount){
            query.roomCount = {
                gte: +roomCount
            };  
        }

        if(bathroomCount){
            query.bathroomCount = {
                gte: +bathroomCount
            };  
        }

        if(locationValue){
            query.location = locationValue;  
        }

        if(startDate && endDate){
            query.NOT = {
                reservations:{
                    some:{
                        OR:[
                            {
                                endDate:{ gpe: startDate },
                                startDate:{ lte: startDate }
                            },
                            {
                                startDate:{ lte: endDate },
                                endDate:{ gte: endDate }
                            }
                        ]
                    }
                }
            }
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