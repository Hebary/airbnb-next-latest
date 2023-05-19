'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const Logo: React.FC = () => {
    const router = useRouter()


  return <Image
            alt='logo'
            className='hidden md:block cursor-pointer'
            height={100}
            src='/logo.png'
            width={100}
        />     
}

export default Logo