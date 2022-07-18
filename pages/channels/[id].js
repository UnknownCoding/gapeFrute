import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRecoilState } from 'recoil'
import { channelId } from '../../atoms/modalAtoms'
import Home from '../../Components/Home'
import { auth } from '../../firebase'

const Contents = () => {
    const Router = useRouter()
    const [chan ,setCHan] = useRecoilState(channelId)
    const [user, loading, error] = useAuthState(auth);
    const id = Router?.query?.id
    
    useEffect(()=>{
        console.log(id)
        setCHan(id)
    },[id])

    if (!user){
        return ()=> Router.push('/')
    
    }
    return (
        <div>
            <Home/>
        </div>
    )
}

export default Contents
