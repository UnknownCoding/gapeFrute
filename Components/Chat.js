import { BellIcon, ChatIcon, EmojiHappyIcon, GiftIcon, HashtagIcon, PlusCircleIcon, UsersIcon } from '@heroicons/react/solid'
import { InboxIcon, QuestionMarkCircleIcon, SearchIcon } from '@heroicons/react/outline'
import React, { useEffect, useRef, useState } from 'react'
import { channelId, channelState } from '../atoms/modalAtoms'
import { useRecoilState } from 'recoil'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import Message from './Message'

const Chat = () => {
    const [user, loading, error] = useAuthState(auth);
    const [channelInfo ,setChannelInfo] = useRecoilState(channelState)
    const [input,setInput] = useState('')
    const ChatRef = useRef()
    const [chats , setChats] = useState([])
    const [chan ,setCHan] = useRecoilState(channelId)
    const Router = useRouter()
    
    useEffect(()=>{
        console.log(chan)
    },[chan])
    
    useEffect(()=>{
        return onSnapshot(query(collection(db,'channels',chan,'messages'),orderBy('timestamp','asc')),(snapshot)=>{
            setChats(snapshot?.docs)
        })
    },[chan,db])

    
    

    const sendMessage =  (e)=>{
        e.preventDefault()
        if(input === "" || !input.trim() ) return null
        addDoc(collection(db,'channels',channelInfo?.channelID,'messages'),{
            timestamp:serverTimestamp(),
            name:user?.displayName,
            message:input,
            photo:user?.photoURL,
            email:user?.email,
        })
        setInput("")
        scrollToBottom()
    }
    const scrollToBottom = ()=>{
        ChatRef.current.scrollIntoView({
            behavior:'smooth',
            block:'start'
        })
    }    

    return (
        <div className='flex flex-col h-screen '>
            <header className='flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1'>
                <div className='flex items-center space-x-1 '>
                    <HashtagIcon className='h-6 text-[#af3730]'/>
                    <h4 className='text-white font-semibold'>{channelInfo.name}</h4>
                </div>
                <div className='flex space-x-3'>
                    <BellIcon className='icon'/>
                    <ChatIcon className='icon'/>
                    <UsersIcon className='icon'/>
                    <div className='flex bg-[#202225] text-xs rounded-md p-1'>
                        <input type='text' placeholder='search' className='bg-transparent focus:outline-none text-white pl-1 placeholder-[#72767d]'/>
                        <SearchIcon className='h-4 text-[#72767d] mr-1'/>
                    </div>
                    <InboxIcon className='icon'/>
                    <QuestionMarkCircleIcon className='icon'/>
                </div>
            </header>

            <main className=' flex-grow overflow-y-scroll scrollbar-hide'>
                {chats?.map((data)=>(
                    <div className='text-white'>
                        <Message key={data.id} name={data.data().name} id={data.id} message={data.data().message} timestamp={data.data().timestamp} email={data.data().email} photo={data?.data()?.photo}/>
                    </div>
                ))}
                <div ref={ChatRef} className='pb-16'/>
            </main>

            <div className='flex items-center p-2.5 bg-[#40444b] mx-5 mb-7'>
                <PlusCircleIcon className='icon mr-4'/>
                <form className='w-full flex-1'>
                    <input type='text' 
                            disabled={!channelInfo?.channelID} 
                            placeholder={channelInfo?.channelID ? `Message #${channelInfo.name}` : 'Select a channel!'}
                            className='flex flex-1 text-sm w-full bg-transparent focus:outline-none text-white placeholder-[#72767d]'
                            value={input}
                            onChange={(e)=>setInput(e.target.value)}
                    />
                    <button type='submit' hidden onClick={sendMessage} >Send</button>
                </form>
                <GiftIcon className='icon mr-2'/>
                <EmojiHappyIcon className='icon mr-2'/>
            </div>

        </div>
    )
}

export default Chat
