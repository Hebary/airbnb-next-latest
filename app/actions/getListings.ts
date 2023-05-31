import { prisma } from '@/app/lib';

export default async function getListing() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: { 
                createdAt: 'desc'
            }
        })
        return listings

    } catch (error) {
        throw new Error(error as string);
    }
}