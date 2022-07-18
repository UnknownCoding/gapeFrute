import { ChevronDownIcon, MicrophoneIcon, PhoneIcon, PlusIcon,CogIcon } from '@heroicons/react/solid';
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Channel from './Channel';
import Chat from './Chat';
import ServerIcon from './ServerIcon';

const Home = () => {
    const [user, loading, error] = useAuthState(auth);
    const Router = useRouter()
    const [channels,setChannels] = useState([])


    useEffect(()=>{
        return onSnapshot(collection(db,'channels'),(snapshot)=>{
            setChannels(snapshot?.docs)
        })
    },[db])

    const addChanel = async (e) =>{
        const channelName = prompt('Enter a channel name')
        if(!channelName?.trim() || channelName=== "") return null
        await addDoc(collection(db,'channels'),{
            channelName:channelName,
        })
    }

    return (
        <>
        {!user && (() => Router.push('/'))}
        <div className='flex h-screen'>
            <div className='flex flex-col space-y-3 bg-gray-600 p-2'>
                <div className='server-default transition hover:bg-[#CC4D46] h-16 w-16  flex justify-center mx-auto '>
                    <img  className='h-8 w-8' src='https://icon-library.com/images/e04be9de9c.svg.svg' alt=''/>
                </div>
                <hr className='border-gray-700 border w-8 mx-auto'/>
                <ServerIcon image="https://media.pitchfork.com/photos/5cd32a3593a53659a01ed648/16:9/w_1280,c_limit/Logic.jpeg"/>
                <div className='server-default group h-14 w-14 flex hover:bg-[#CC4D46] mx-auto'>
                    <PlusIcon className='text-[#CC4D46] h-7 w-7  group-hover:text-white '/>
                </div>
            </div>

            <div className='bg-[#2f3136] max-w-[132px] sm:min-w-[250px] flex flex-col'>
                <h2 className='flex text-white cursor-pointer font-bold text-lg items-center border-b border-gray-800  p-2 hover:bg-[#34373c]  '>Update this part of  <ChevronDownIcon className='h-5 ml-1'/> </h2>
                <div className='text-[#8e9297]  overflow-y-scroll scrollbar-hide mt-0.5'>
                    <div className='flex items-center p-2 mb-2'>
                        <ChevronDownIcon className='h-5 mr-1 mt-0.5'/>
                        <h4 className='font-semibold'>Channels</h4>
                        <PlusIcon className='h-6 ml-auto cursor-pointer hover:text-white ' onClick={addChanel}/>
                    </div>
                    <div className='flex flex-col  px-2 mb-4 space-y-2 '>
                        {channels?.map((data)=>(
                            <Channel key={data?.id} id={data?.id} channelName={data?.data()?.channelName}/>
                        ))}
                    </div>
                </div>
                <div className='mt-auto bg-[#292b2f] p-2 flex justify-between items-center'>
                    <div className='flex items-center space-x-2'>
                        <img src={user?.photoURL} className='h-10 rounded-full cursor-pointer' onClick={()=>{signOut(auth); Router.push('/')}} />
                        <h4 className='text-white text-xs font-medium'>
                            {user?.displayName}
                            <span className='text-[#af3730] block'>{user?.uid?.substring(0,4)}</span>
                        </h4>
                    </div>
                    <div className='text-gray-500 hidden sm:inline-flex items-center '>
                        <div className='hover:bg-[#d7736e] rounded-md p-2 '>
                            <MicrophoneIcon className='h-5 icon'/>
                        </div>
                        <div className='hover:bg-[#d7736e] rounded-md p-2 '>
                            <PhoneIcon className='h-5 icon'/>
                        </div>
                        <div className='hover:bg-[#d7736e] rounded-md p-2 '>
                            <CogIcon className='h-5 icon'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#36393f] flex-grow'>
                <Chat/>
            </div>
        </div>
        </>
    )
}

export default Home
