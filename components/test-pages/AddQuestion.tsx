'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
interface AddQuestionProps {
  testseriesid:string,
  fromCancelButton: (value: boolean) => void;
}
const AddQuestion:React.FC<AddQuestionProps> = ({ testseriesid,fromCancelButton}) => {
  const [questiondata,setQuestiondata]=useState();
  const router=useRouter();
   const [formData,setFormData]=useState({
     testSeriesId:'',
      questionText:'',
      optionA:'',
      optionB:'',
      optionC:'',
      optionD:'',
      correctAnswer:'',
      marks:'',
       createdAt:''
    });
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    };
   
     const handleSubmit = async (e: { preventDefault: () => void }) => {
  e.preventDefault();

  const formattedData = {
    question: formData.questionText, // backend expects 'question'
    correctAnswer: formData.correctAnswer,
    options: [
      formData.optionA,
      formData.optionB,
      formData.optionC,
      formData.optionD,
    ],
    marks: Number(formData.marks),
    // Add imageUrl if required, else leave it out
  };
  try {
    const res = await fetch(`http://localhost:8000/api/test-series/${testseriesid}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    const data = await res.json();
    console.log("Question submitted successfully:", data);

    handleCancel();
  } catch (error) {
    console.error("Error submitting question:", error);
  }
};

    const handleCancel = () => {
    fromCancelButton(false);
  };

  return (
    <div className='bg-transparent w-[1000px]'>
        <div className='bg-white flex flex-col  gap-[20px] rounded-[20px] p-[20px]'>
          <form onSubmit={handleSubmit}>
            <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>Question<input type='text' name="questionText" value={formData.questionText} placeholder='Enter Question' onChange={handleChange}  className='max-w-[1312px] text-[18px] font-normal h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
             <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
                 <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Option A<input type='text' name="optionA" value={formData.optionA} placeholder='option A' onChange={handleChange}  className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
                  <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Option B<input type='text'name="optionB" value={formData.optionB} placeholder='option B' onChange={handleChange}  className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            </div>
            <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
                 <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Option C<input type='text' name="optionC" value={formData.optionC} placeholder='option C' onChange={handleChange}   className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
                  <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Option D<input type='text' name="optionD" value={formData.optionD} placeholder='option D' onChange={handleChange}  className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            </div>
            <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Answer<input type='text' name="correctAnswer" value={formData.correctAnswer} placeholder='Enter Answer' onChange={handleChange}  className='max-w-[1312px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Marks<input type='text' name="marks" value={formData.marks} placeholder='Enter Marks' onChange={handleChange}  className='max-w-[1312px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label>
            {/* <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Description<textarea  name="description" value={formData.description} placeholder='write Description' onChange={handleChange}   className='max-w-[1312px] text-[18px] font-normal  h-[126px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></textarea></label> */}
            <div className="flex justify-end gap-[10px] mt-[20px]">
        <button type="submit" className="w-[112px] h-[45px]  border-[1px] border-[#0048B0] rounded-[12px] text-white bg-[#0048B0]"   >Create</button>
        <button  className="w-[130px] h-[45px]  border-[1px] border-[#0048B0] rounded-[12px] text-[#0048B0]" onClick={handleCancel}>Cancel</button>
      </div> 
      </form>
        </div>    
    </div>
  )
}

export default AddQuestion