'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
interface AddQuestionProps {
  fromCancelButton: (value: boolean) => void;
}
const AddQuestion:React.FC<AddQuestionProps> = ({fromCancelButton}) => {
  const [questiondata,setQuestiondata]=useState();
  const router=useRouter();
   const [formData,setFormData]=useState({
      question:'',
      optionA:'',
      optionB:'',
      optionC:'',
      optionD:'',
      answer:'',
      marks:'',
      description:''
    });
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    };
   
     const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
    router.push('/test-series/Single_test_series_details')
  };
   useEffect(()=>{
      console.log('questions:',formData)
    },[formData])
    const handleCancel = () => {
    fromCancelButton(false);
  };

  return (
    <div className='bg-transparent w-[1000px]'>
        <div className='bg-white flex flex-col  gap-[20px] rounded-[20px] p-[20px]'>
          <form onSubmit={handleSubmit}>
            <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>Question<input type='text' name="question" value={formData.question} placeholder='Enter Question' onChange={handleChange}  className='max-w-[1312px] text-[18px] font-normal h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
             <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
                 <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Option A<input type='text' name="optionA" value={formData.optionA} placeholder='option A' onChange={handleChange}  className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
                  <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Option B<input type='text'name="optionB" value={formData.optionB} placeholder='option B' onChange={handleChange}  className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            </div>
            <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
                 <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Option C<input type='text' name="optionC" value={formData.optionC} placeholder='option C' onChange={handleChange}   className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
                  <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Option D<input type='text' name="optionD" value={formData.optionD} placeholder='option D' onChange={handleChange}  className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            </div>
            <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Answer<input type='text' name="answer" value={formData.answer} placeholder='Enter Answer' onChange={handleChange}  className='max-w-[1312px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Marks<input type='text' name="marks" value={formData.marks} placeholder='Enter Marks' onChange={handleChange}  className='max-w-[1312px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Description<textarea  name="description" value={formData.description} placeholder='write Description' onChange={handleChange}   className='max-w-[1312px] text-[18px] font-normal  h-[126px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></textarea></label>
            <div className="flex justify-end gap-[10px] mt-[20px]">
        <button type="submit" className="w-[112px] h-[45px]  border-[1px] border-[#0048B0] rounded-[12px] text-white bg-[#0048B0]" >Create</button>
        <button  className="w-[130px] h-[45px]  border-[1px] border-[#0048B0] rounded-[12px] text-[#0048B0]" onClick={handleCancel}>Cancel</button>
      </div>
      </form>
        </div>    
    </div>
  )
}

export default AddQuestion