import React from 'react'
import moment from 'moment';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { TrashIcon } from '@heroicons/react/outline';
import { doc, deleteDoc } from "firebase/firestore";
import { channelId } from '../atoms/modalAtoms';
import { useRecoilState } from 'recoil';

const Message = ({message,id,timestamp,email,photo,name}) => {
    const [user, loading, error] = useAuthState(auth);
    const [chan ,setCHan] = useRecoilState(channelId)

    const deleteDocs = async () =>{
        await deleteDoc(doc(db,'channels',chan,'messages',id))
    }

    return (
        <div className='flex items-center p-1 pl-5 my-5 mr-2 hover:bg-[#32354b] group'>
            <img src={photo} alt='w' className='h-10 w-10 rounded-full mr-3 hover:shadow-2xl '/>
            <div className='flex flex-col '>
                <h4 className='flex items-center space-x-2 font-medium '>
                    <sapn className='hover:underline text-white text-sm'>{name}</sapn>
                    <span className='text-[#72767d] text-xs'>{moment(timestamp?.toDate()?.getTime()).format("lll")}</span>
                </h4>
                <p className='text-sm text-[#dcddde] '>{message}</p>
            </div>
            {user?.email === email &&(
                <div className='hover:bg-[#ed4245] cursor-pointer hover:text-white pb-1 ml-auto rounded-sm text-[#ed4245]' onClick={deleteDocs}>
                    <TrashIcon className='h-5 hidden group-hover:inline '/>
                </div>
            )}
        </div>
    )
}

export default Message
