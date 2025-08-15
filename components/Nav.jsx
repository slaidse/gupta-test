'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect} from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    //use session for current use data
    const {data : session} = useSession();

    const [providers, setProviders] = useState (null);
    const [toggleDropdown, setToggleDropdown] = useState (false)


    useEffect (() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response)
        }

        setUpProviders();
    }, [])

  return (
    <nav className = "flex-between w-full mb-16 pt-3">
        <Link href = "/" className = "flex gap-2 flex-center">
            <Image src="/assets/images/logo.svg" alt="Promptopia Logo" width={30} height={30} className = "object-contain" />
            <p className = "logo_text">Gupta</p>
        </Link>

   {/* Desktop view when it is on large devices it will flex but small devices */}
     
        <div className = "sm:flex hidden">
            {session?.user ? 
            (<div className='flex gap-3 md:gap-5'>
                <Link href = "/create-prompt" 
                className='black_btn'>
                    Post Question
                </Link>
                <Link href = "/aitutor" 
                className='black_btn'>
                    AI Tutor
                </Link>
                <Link href = "/subjects" 
                className='black_btn'>
                    Subjects
                </Link>
                <button type = "button" onClick={signOut} className = "outline_btn">
                    Sign Out
                </button>

                <Link href = "/profile">
                <Image src = {session?.user.image} width = {37} 
                height = {37} className='rounded-full' alt="Profile"/>
                </Link>
            </div>) : (
                <>
                    {providers && Object.values(providers).map((provider) => {
                        return (<button type = "button" key = {provider.name}
                        onClick = {() => signIn(provider.id)} className='black_btn'
                        >
                            Sign In
                        </button>)
                    })
                    }
                </>
            )
            }
        </div>

    
        {/*Anything above sm will be hidden, hidden is the breakpoint */}
        <div className = "sm:hidden flex relative">
            {session?.user ? 
            (<div className='flex'>
                <Image src = {session?.user.image} width = {37} 
                height = {37} className='rounded-full' alt="Profile" onClick = {() => setToggleDropdown((prev) => !prev)}/>
                {toggleDropdown && (
                <div className='dropdown'>
                    <Link href = "/profile" className='dropdown_link' onClick = {() => setToggleDropdown(false)}>
                        My Profile
                    </Link>
                    <Link href = "/create-prompt" className='dropdown_link' onClick = {() => setToggleDropdown(false)}>
                        Create Prompt
                    </Link>
                    <button type = "button" onClick = {() => {
                        setToggleDropdown(False)
                        signOut();
                        }} className='mt-5 w-fill black_btn'>
                    Sign
                    </button>
                </div>)}
            </div>) : (
                <>
                    {providers && Object.values(providers).map((provider) => {
                        return (<button type = "button" key = {provider.name}
                        onClick = {() => signIn(provider.id)} className='black_btn'
                        >
                            Sign In
                        </button>)
                    })
                    }
                </>
            )
            }
        </div>

    </nav>
  )
}

export default Nav