import React from 'react'
import Link from 'next/link'
import { MenuIcon } from '@heroicons/react/solid'
import { auth, provider } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router'
import { signInWithPopup } from 'firebase/auth'

const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    const Router = useRouter()
    const signIn =(e)=>{
        console.log('runnnn')
        e.preventDefault()
        signInWithPopup(auth,provider).then(()=> Router.push('/channels')).catch((err)=> alert(err.messages))
    }

    return (
        <header className='flex items-center justify-between py-4 px-6 bg-[#CC4D46]'>
            <Link href="/">
                <img src="https://icon-library.com/images/e04be9de9c.svg.svg" className="w-32 h-12 object-contain -ml-10" alt=""/>
            </Link>
            <div className='hidden lg:flex space-x-6'>
                <a className='link'>About</a>
                <a className='link'>Why gapeFrute </a>
                <a className='link'>Sign Up</a>
                <a className='link'>Safety</a>
                <a className='link'>Support</a>
            </div>
            <div className='flex space-x-4'>
                {/* whitespace no wrap dont wrape your whole button text in blocks in small  screen */}
                <button className='bg-white p-2 px-4 md:text-sm focus:outline-none rounded-full text-xs hover:shadow-2xl 
                                hover:text-[#CC4D46] transition duration-500 ease-in-out hover:scale-125 whitespace-nowrap
                                font-medium' onClick={!user ? signIn : ()=> Router.push('/channels')}>
                        {!user ? 'Login' : 'Open gapeFrute'}
                </button>
                <MenuIcon className='h-9 text-white cursor-pointer lg:hidden'/>
            </div>
        </header>
    )
}


export default Header
