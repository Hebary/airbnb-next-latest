import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'

import { toast } from 'react-hot-toast'
import { User } from '@prisma/client'
import { useLoginModal } from '@/app/hooks';


interface Props {
    listingId: string;
    currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: Props) => {

    const router = useRouter();
    const loginModal = useLoginModal();
    
    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        if (!currentUser) return false;
        return list.includes(listingId);
    },[currentUser, listingId])

    const toggleFavorite = useCallback(async (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if(!currentUser) return loginModal.onOpen();

        try {

            let request;
            if(hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }
            await request()
            router.refresh();
            toast.success('Success!');

        } catch (error: any) {
            toast.error(error?.message);
            console.log(error?.message);
        }
    },[currentUser, hasFavorited, listingId, loginModal, router])

    return { hasFavorited, toggleFavorite }
};

export default useFavorite;

