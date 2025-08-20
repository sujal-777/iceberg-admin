'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
interface updateQuestionProps {
  questionid:string,
  testId:string,
  fromCancelButton: (value: boolean) => void;

}
const Update_question:React.FC<updateQuestionProps> = ({ questionid,testId,fromCancelButton}) => {
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
    useEffect(()=>{
      const fetchquestionData = async () => {
    try {
      const res = await fetch(`https://icebreg-backend2.onrender.com/api/test-series/${testId}/questions/${questionid}`);
      const jsondata = await res.json();
      console.log('Fetched questions Data:', jsondata);
      // const updatequestion=jsondata.find(item=>item._id===questionid);
      const updatequestion=jsondata
      setQuestiondata(updatequestion);

    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchquestionData();
    },[questionid])

     useEffect(() => {
         console.log('for update data question:',questiondata);
         if (questiondata) {
           setFormData({
      testSeriesId:questiondata.testSeriesId || '',
      questionText:questiondata.question || '',
      optionA:questiondata.options[0] || '',
      optionB:questiondata.options[1] || '',
      optionC:questiondata.options[2] || '',
      optionD:questiondata.options[3] || '',
      correctAnswer:questiondata.correctAnswer || '',
      marks: questiondata.marks || '',
       createdAt: questiondata.createdAt || ''
            
           });
         }
       }, [questiondata]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    };
     
     
       const handleUpdate = async (e: React.FormEvent) => {
          e.preventDefault();
         const dataToSend = {
         ...formData,
          options: [
      formData.optionA,
      formData.optionB,
      formData.optionC,
      formData.optionD,
    ],
         marks: Number(formData.marks),
         createdAt:new Date().toISOString(),
          _id: questionid
       };
         try {
           const res = await fetch(`https://icebreg-backend2.onrender.com/api/test-series/${testId}/questions/${questionid}`, {
             method: 'PUT', // or PATCH
             headers: {
               'Content-Type': 'application/json',
             },
             body: JSON.stringify(dataToSend),
           });
     
           if (!res.ok){
             throw new Error('Update failed');
           
           } 
           const jsondata = await res.json();
           console.log('Updated:', jsondata);
           fromCancelButton(false);
           alert('successfully updated')

         } catch (err) {
           console.error(err);
            alert('error in updating the test series')
         }
     }
     
   
  
    
    const handleCancel = () => {
    fromCancelButton(false);
  };

  return (
    <div className='bg-transparent w-[1000px]'>
        <div className='bg-white flex flex-col  gap-[20px] rounded-[20px] p-[20px]'>
          <form onSubmit={handleUpdate}>
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
        <button type="submit" className="w-[112px] h-[45px]  border-[1px] border-[#0048B0] rounded-[12px] text-white bg-[#0048B0]" >Update</button>
        <button  className="w-[130px] h-[45px]  border-[1px] border-[#0048B0] rounded-[12px] text-[#0048B0]" onClick={handleCancel}>Cancel</button>
      </div> 
      </form>
        </div>    
    </div>
  )
}

export default Update_question