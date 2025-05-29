"use client"
import React from 'react'
import { useState,useEffect } from 'react';
import { GoVideo } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import Performance_by_piechart from './PerformancebyPiechart';
import LineChartComponent from './PerformancebyLinechart';
import Videos from './videos';
import Addvideo from './addvideo';
const All_videos = () => {
  const[openAddVideo,setOpenAddVideo]=useState(false);

  const videos_details=[
    {
      logo:<GoVideo className='text-[#0048B0] text-[23px]'/>,
      name:'Total Videos',
      total:'24'
    }
    ,
    {
      logo:<IoEyeOutline className='text-[#0048B0] text-[23px]'></IoEyeOutline>,
      name:'Total Views',
      total:'15,834'
    },
    {
      logo:<GoClock className='text-[#0048B0] text-[23px]'/>,
      name:'AVg.Watch Time',
      total:'8:42'
    },
    {
      logo:<AiOutlineUser className='text-[#0048B0] text-[23px]'/>,
      name:'Completion Rate',
      total:'68%'
    }
  ]
  const popularvideos=[
    {
      title:'Auditing Standards',
      cousrse:'Advanced Auditing',
      views:'1,532',
      wathtime:'12:24',
      completionRate:"94%"
    },
     {
      title:'Auditing Standards',
      cousrse:'Advanced Auditing',
      views:'1,532',
      wathtime:'12:24',
      completionRate:"94%"
    },
     {
      title:'Auditing Standards',
      cousrse:'Advanced Auditing',
      views:'1,532',
      wathtime:'12:24',
      completionRate:"94%"
    },
     {
      title:'Auditing Standards',
      cousrse:'Advanced Auditing',
      views:'1,532',
      wathtime:'12:24',
      completionRate:"94%"
    }
  ]
  const handleCloseAddvideo=(data: boolean | ((prevState: boolean) => boolean))=>{
    setOpenAddVideo(data)
  }
  return (
    <div className='w-full p-[20px] bg-[#E6E6ED]'>
      <div className='flex flex-col md:flex-row justify-between'>
        <h1 className='text-[30px] font-[600]'>Concept Video</h1>
        <button className='flex gap-[8px] items-center justify-center max-w-[201px] h-[45px] rounded-[12px] bg-[#0048B0] text-white text-[16px] px-[32px] py-[16px] text-center' onClick={()=>setOpenAddVideo(true)}><span>+</span> Add New Video</button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-[11px] mt-[24px]'>
        {
          videos_details.map((item,index)=>(
            <div key={index} className='flex gap-[20px] items-center px-[29px] py-[12px] rounded-[10px]  h-[100px] bg-[#FFFFFF]'>
              <div className='flex justify-center items-center w-[50px] h-[50px] rounded-full bg-[#A8CCFF]'>
              {item.logo}
              </div>
              <div className=''>
                <h1 className='text-[19px] font-[400]'>{item.name}</h1>
                <h1 className='text-[33px] font-[600]'>{item.total}</h1>
              </div>
            </div>
          ))
        }
      </div>
      <div>
       <Videos/>
      </div>
      <div className='my-[35px]'>
        <h1 className='text-[23px] font-[500] mb-[35px]'>Performance Analytics</h1>
        <div className='flex flex-col md:flex-row gap-[20px] mt-[35px]'>
        <Performance_by_piechart/>
        <LineChartComponent/>
        </div>
      </div>
      <div className='mb-[35px]'>
        <h1 className='text-[23px] font-[500] mb-[35px]'>Most Popular Videos</h1>
        <table className='md:w-full'>
          <thead className=''>
            <tr>
            {['Video Title','Course','Views','Avg.Watch Time','Completion Rate'].map((item,index)=>(
              <th key={index} className=' px-[36px] py-[16px] text-[22px] font-[500] bg-white border-[1px] border-b-black'>{item}</th>
            ))}
            </tr>
          </thead>
          <tbody>
            {popularvideos.map((item,index)=>(
              <tr key={index} className='text-center border-[1px] border-b-black'>
                <td className='px-[36px] py-[16px]'>{item.title}</td>
                <td>{item.cousrse}</td>
                <td>{item.views}</td>
                <td>{item.wathtime}</td>
                <td>{item.completionRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     {openAddVideo ===true &&<div className='fixed flex justify-center max-h-full inset-0 py-[25px] bg-black/30 backdrop-blur-sm w-full'> <Addvideo fromCancelButton={handleCloseAddvideo}/></div>}

    </div>
  )
}

export default All_videos