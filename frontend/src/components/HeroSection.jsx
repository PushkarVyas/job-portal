import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery} from '@/redux/jobSlice';

const HeroSection = () =>  {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  }

  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-200 text-[#F83002] font-medium'>No. 1 Job Portal</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br />Get Your <span className='text-[#6A38C2]'>Dream Job</span></h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At illum commodi molestias accusamus quis!</p>
        <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center mx-auto gap-4'>
            <input type="text"
            onChange={(e) => setQuery(e.target.value) }
            placeholder='Find your dream job' 
            className='outline-none border-none w-full'/>
            <Button onClick={searchJobHandler} className='bg-[#6A38C2] p-2 text-white cursor-pointer hover:bg-[#5b30a6] h-full rounded-r-full px-4 '><Search className='h-5 w-5'/></Button>
        </div>
        </div>
    </div>
  )
}

export default HeroSection