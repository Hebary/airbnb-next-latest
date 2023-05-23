import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '../../../lib';

export async function POST (request: Request){
    const { email, password } = await request.json();

    const user = await prisma.user.findFirst({
        where:{
            email
        }
    })
    if(!user) {
        throw new Error('Invalid credentials');
    }

    const matchPassword = await bcrypt.compare(password, user?.hashedPassword as string);

    if(!matchPassword) {
        throw new Error('Incorrect password');
    }

    return NextResponse.json(user);
}