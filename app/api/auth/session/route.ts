import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET(){
    // Get the user's session based on the `session` cookie
    const session = await getServerSession(authOptions);
    if(session){
        // If a session exists, return it
        return session;


    } else {
        console.log('error')
    }

}