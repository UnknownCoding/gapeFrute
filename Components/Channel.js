import { HashtagIcon } from '@heroicons/react/solid'
import {  useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil'
import { channelState } from '../atoms/modalAtoms'
import { channelId } from '../atoms/modalAtoms'

const Channel = ({id,channelName}) => {
    const [channelInfo ,setChannelInfo] = useRecoilState(channelState)
    const [channelsId ,setChanneslId] = useRecoilState(channelId)

    const Router = useRouter()
    const setChannel =  ()=>{
        setChannelInfo({name:channelName,channelID:id})
        setChanneslId(id)
        Router.push(`/channels/${id}`)
    }

    return (
        <div className='font-medium flex items-center cursor-pointer hover:bg-[#3a3c43] hover:text-white' onClick={setChannel}>
            <HashtagIcon className='h-5 mt-1 sm:mt-1 flex-shrink mr-2'/> <span className='truncate w-36' > {channelName}</span>
        </div>
    )
}

export default Channel
