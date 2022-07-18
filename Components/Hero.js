import React from 'react'
import { CursorClickIcon } from '@heroicons/react/outline'

const Hero = () => {
    return (
        <div className='bg-[#CC4D46] pb-8 md:pb-0'>
            <div className='h-[120vh] p-7 py-9 md:h-screen md:flex relative '>
                <div className='flex flex-col gap-7 md:max-w-md lg:max-w-none lg:justify-center'>
                    <h1 className='text-5xl text-white font-bold '>Talk to anyone anytime</h1>
                    <h2 className='text-white text-lg font-light tracking-wide lg:max-w-3xl'> 
                        Whether youre part of a school club, gaming group, worldwide art
                        community, or just a handful of friends that want to spend time
                        together, gapeFrute makes it easy to talk every day and hang out more often.
                    </h2>
                    <div className='flex flex-col sm:flex-row sm:items-center md:flex-col md:items-start lg:flex-row gap-6'>
                        <button className='flex bg-white w-60 font-medium items-center justify-center rounded-full p-4 text-lg hover:shadow-2xl hover:text-[#CC4D41] focus:outline-none transition-all duration-500 ease-in-out  '> 
                            <CursorClickIcon className='w-6 mr-3'/> Check me out!
                        </button>
                        <button className='group bg-gray-900 text-white w-80 font-medium flex items-center justify-center rounded-full p-4 text-lg hover:shadow-2xl hover:bg-gray-800 focus:outline-none transition duration-500 ease-in-out'>
                            Open <span className='group-hover:text-[#CC4D46] transition duration-500 ease-in-out pl-[5px] pr-[5px] '>grapFrute</span> in your browser
                        </button>
                    </div>
                </div>
                <div className='flex-grow'>
                    <img className='absolute -left-[40px]  sm:-left-[60px] mt-[30px] w-[400px] md:hidden' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Grapefruit.svg/1280px-Grapefruit.svg.png"/>
                </div>
            </div>
        </div>
    )
}

export default Hero
