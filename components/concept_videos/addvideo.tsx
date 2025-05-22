"use client"
import { supabase } from "@/lib/supabaseClient";
import React from 'react'
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { useRef,useState } from 'react';
const Addvideo = ({fromCancelButton}) => {
    
     const [formData, setFormData] = useState({video_url:'',specialization:'',short_desc:'',lecturer_image:'',lecturer_name:'',subject:'',duration:'',
      thumbnail_url:'',title:'',bookmarked_by:'',created_at:''
     });
   
  function handleChange(e: { target: { name: any; value: any;}; }) {
  const { name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  
}
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const { error } = await supabase.from('videos').insert([formData]);

    if (error) {
      console.log('error in submiting the data',error)
    } else {
     alert('Data submit to supabase');
      console.log('data submited successfully')
    }
  };
  const handleCancel=()=>{
    fromCancelButton(false);

  }
  return (
    <div className='bg-transparent w-[1000px]'>
        <div className='bg-white flex flex-col  gap-[20px] rounded-[20px] p-[20px]'>
          <form onSubmit={handleSubmit}>
            <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>Video Title<input type='text' name="title" value={formData.title} onChange={handleChange} className='max-w-[1312px] text-[18px] font-normal h-[35px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Description<input type='text' name="short_desc" value={formData.short_desc}  onChange={handleChange} className='max-w-[1312px] text-[18px] font-normal  h-[35px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
             <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
                 <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Specialization<input type='text' name="specialization" value={formData.specialization}  onChange={handleChange} className='max-w-[650px] text-[18px] font-normal  h-[35px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
                  {/* <div className="  relative">
                   
                      <HiOutlineCalendarDateRange className='absolute left-[10px] top-[63px] transform -translate-y-1/2 text-gray-500 cursor-pointer'onClick={handledateIconClick}/>
                       <label htmlFor='date' className='text-[20px] font-[500] flex flex-col gap-[10px]'>Date
                     <input type="date" name='date' ref={dateInputRef} className='max-w-[650px] h-[35px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input>
                      </label>
                    </div> */}
                  <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Date<input type='text'name="created_at" value={formData.created_at}  onChange={handleChange} className='max-w-[650px] text-[18px] font-normal  h-[35px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            </div>
            <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
                 <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Subject<input type='text' name="subject" value={formData.subject}  onChange={handleChange} className='max-w-[650px] text-[18px] font-normal  h-[35px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
                  <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Duration of Video<input type='text' name="duration" value={formData.duration}  onChange={handleChange} className='max-w-[650px] text-[18px] font-normal  h-[35px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            </div>
            <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
                 <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Lecture Name<input type='text' name="lecturer_name" value={formData.lecturer_name} onChange={handleChange} className='max-w-[650px] text-[18px] font-normal  h-[35px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
                  <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Lecture Image Url<input type='text' name="lecturer_image" value={formData.lecturer_image}  onChange={handleChange} className='max-w-[650px] text-[18px] font-normal  h-[35px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            </div>
            <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
                 <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Thumbnail URL<input type='text' name="thumbnail_url" value={formData.thumbnail_url}  onChange={handleChange} className='max-w-[650px] text-[18px] font-normal  h-[35px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
                  <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Video URL<input type='text'name="video_url" value={formData.video_url}  onChange={handleChange} className='max-w-[650px] text-[18px] font-normal  h-[35px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            </div>
            <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Book mark By<input type='text' name="bookmarked_by" value={formData.bookmarked_by}  onChange={handleChange} className='max-w-[650px] text-[18px] font-normal  h-[35px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            <div className="flex gap-[10px] mt-[20px]">
        <button type="submit" className="w-[112px] h-[35px]  border-[1px] border-[#0048B0] rounded-[12px] text-white bg-[#0048B0]" >ADD</button>
        <button  className="w-[130px] h-[35px]  border-[1px] border-[#0048B0] rounded-[12px] text-white bg-[#0048B0]" onClick={handleCancel}>Cancel</button>
      </div>
      </form>
        </div>
    </div>
  )
}

export default Addvideo