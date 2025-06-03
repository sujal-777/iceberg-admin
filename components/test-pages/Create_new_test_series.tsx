"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Create_new_test_series = () => {
  const router=useRouter();
  const [formData,setFormData]=useState({
     subject: "",
    code: "",
    exam: "",
    questions:'',
    duration: "",
    createdDate: "",
    marks:'',
    passmarks:'',
    description:'',
    level:''
  });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));

  
    router.push('/test-series');
  };

  const eaxm_type=[
    "CA",
    "CA ",
    "CA Intermediate",
    "CMA Final",
  ]
   const eaxm_level=[
     "CA Foundation",
    "CA Intermediate",
  ]
  return (
    <div>
        <div>
            <h1 className='text-[25px] font-[600]'>Create New Test Series</h1>
            <p className='text-[25px] font-[600]'>Basic Information</p>
        </div>
        <div className='mt-10'>
            <form onSubmit={handleSubmit}>
                <div className='bg-white flex flex-col  gap-[20px] rounded-[20px] p-[20px]'>
                     <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>Test series Name<input type='text' name="subject" value={formData.subject} onChange={handleChange} placeholder='e.g. Principles and Practice of Accounting Mock Test Series'  className='max-w-[1312px] text-[18px] font-normal h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
                    
            <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
             <div className="flex flex-col gap-[10px]">
                <label htmlFor="select" className="">
                Select Exam Category
                </label>
                <select
                  id="select" name='exam' value={formData.exam} onChange={handleChange}
                  className="block max-w-[650px] h-[45px] p-2 border border-black rounded-[10px]  focus:ring-[#0048B0] focus:border-blue-500" required>
                  {eaxm_type.map((option, idx) => (
                    <option key={idx}  value={option} className=''>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-[10px]">
                <label htmlFor="select" className="">
                Select Exam Level
                </label>
                <select
                  id="select" name='level' value={formData.level} onChange={handleChange} 
                  className="block max-w-[650px] h-[45px] p-2 border border-black rounded-[10px]  focus:ring-[#0048B0] focus:border-blue-500" required>
                  {eaxm_level.map((option, idx) => (
                    <option key={idx}  value={option} className=''>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              </div>
               <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
                 <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Duration(minutes)<input type='text'  name="duration" value={formData.duration} onChange={handleChange} placeholder='180'  className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
                  <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Total Questions<input type='text'name="questions" value={formData.questions} onChange={handleChange} placeholder='100'  className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            </div>
            <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
                 <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Total Marks<input type='text' value={formData.marks} name="marks" onChange={handleChange} placeholder='200'  className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
                  <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Passing Marks<input type='text'name="passmarks" value={formData.passmarks} onChange={handleChange} placeholder='40' className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            </div>
            <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>Description<textarea name="description" value={formData.description} onChange={handleChange} placeholder='Provide a brief description of this test series....'  className='max-w-[1312px] text-[18px] font-normal h-[126px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></textarea></label>
                </div>
               <div className="flex justify-end gap-[10px] mt-[20px] '>">
        <button type="submit" className="w-[112px] h-[45px]  border-[1px] border-[#0048B0] rounded-[12px] text-white bg-[#0048B0]" >Create</button>
       <Link href='/test-series'><button  className="w-[130px] h-[45px]  border-[1px] border-[#0048B0] rounded-[12px] text-[#0048B0] ">Cancel</button></Link>
      </div>
            </form>
        </div>
    </div>
  )
}

export default Create_new_test_series