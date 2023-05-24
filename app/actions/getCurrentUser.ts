import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route"; 
import { prisma } from '../lib'

export async function getSession() {
    const session = await getServerSession(authOptions);
    return session;
}

export default async function getCurrentUser() {

    const session = await getSession();

    if(!session?.user?.email) return null;

    try {
        const currentUser = await prisma.user.findUnique({
            where: {email: session.user.email}
        })

        if(!currentUser) return null;
    
        return currentUser;
    
    } catch (error) { 

        return null;
        
    }
}