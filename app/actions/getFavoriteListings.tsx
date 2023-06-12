import { prisma } from '@/app/lib';
import getCurrentUser from "./getCurrentUser"

export default async function getFavoriteListings() {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser) return [];
        const favs = await prisma.listing.findMany({
            where:{
                id:{
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        })
        return favs;
    } catch (error: any) {
        throw new Error(error);
    }
}