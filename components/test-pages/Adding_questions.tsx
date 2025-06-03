'use client'
import React, { useState,useRef ,useEffect} from 'react'
import { LuClock } from "react-icons/lu";
import { FaCircleQuestion } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import AddQuestion from './AddQuestion';
 type TestSeriesItem = {
  id: number;
  subject: string;
  code: string;
  exam: string;
  questions: number;
  duration: string;
  createdDate: string;
};
const Adding_questions = ({ data }: { data: TestSeriesItem }) => {
  const [questiontype,setQuestiontype]=useState('MCQ');
  const [openAddQuestion,setOpenAddQuestion]=useState(false)
   const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [questions,setQuestions]=useState([]);
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // const fileList = Array.from(file);
    // console.log('Selected files:', fileList);
   useEffect(()=>{
    const newquestion=localStorage.getItem('formData')
    if(newquestion){
      console.log('question data:',newquestion);
      setQuestions(prev=>[...prev,JSON.parse(newquestion)]);
    }
   },[])
   useEffect(()=>{
    console.log('newQuestion:',questions)
   },[questions])
    setSelectedFiles(prev=> [...prev,file]);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      console.log('url:',fileUrl)
      setPdfUrl(fileUrl);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };
  useEffect(() => {
   console.log('files:',selectedFiles)
  }, [selectedFiles])
  const handleCloseAddQuestion=(data: boolean | ((prevState: boolean) => boolean))=>{
setOpenAddQuestion(false);

  }
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };
 const  handleAddQuestion=()=>{
  setOpenAddQuestion(true);
 }
   
    if (!data) return <p>Loading...</p>;
    
  return (
    <div className=''>
        <div className='mx-w-[1513px] h-full md:h-[195px] bg-white rounded-[20px] py-[14px] px-[30px]'>
            <h1 className='text-[28px] md:text-[43px] font-[600]'>{data.subject}</h1>
            <div className='flex gap-[50px] items-center mt-[50px]'>
                        <div className='flex flex-col md:flex-row items-center gap-[10px]'>
                            <div className='bg-[#DBD8FF] flex justify-center items-center rounded-full w-[45px] h-[45px]'>
                                  <LuClock className=' text-[#0048B0]'/>
                            </div>
                            <div>
                            <p>Duration</p>
                            <p>{data.duration}</p>
                            </div>
                            <div className='bg-[#DBD8FF] flex justify-center items-center rounded-full w-[45px] h-[45px]'>
                                 <FaCircleQuestion className=' text-[#0048B0]'/>
                            </div>
                            <div>
                            <p>Total Questions</p>
                            <p>{data.questions}</p>
                            </div>
                            <div className='bg-[#DBD8FF] flex justify-center items-center rounded-full w-[45px] h-[45px]'>
                                  <FaRegStar className=' text-[#0048B0]'/>
                            </div>
                            <div>
                            <p>Total Marks</p>
                            <p>200 marks</p>
                            </div>
                        </div>
            </div>

        </div>
        {questiontype==='MCQ' && <div>
        <div className='flex flex-col md:flex-row justify-between items-center mt-[100px]'>
             <div className='flex flex-col md:flex-row'>
              <button className={`border-[1px] border-black rounded-l-[10px] h-[40px] w-[236px] bg-[#0048B0] text-white`}>MCQ questions</button>
               <button className={`border-[1px] border-black rounded-r-[10px] h-[40px] w-[236px] `} onClick={()=>setQuestiontype('Descriptive')}>Descriptive questions</button>
            </div>
             <button className='flex gap-[8px] items-center justify-center max-w-[201px] h-[45px] rounded-[12px] bg-[#0048B0] text-white text-[16px] px-[32px] py-[16px] text-center' onClick={handleAddQuestion}><span>+</span> Add a Question</button>
        </div>
        <div className='p-[10px]  mb-[35px] bg-white mt-[50px] min-h-[428px]'>
        <h1 className='text-[23px] font-[500] mb-[35px]'>{data.subject} Mock MCQ Questions</h1>
        <table className='md:w-full overflow-x-scroll md:overflow-x-none'>
          <thead className=''>
            <tr>
            {['Questions','Marks','Actions'].map((item,index)=>(
              <th key={index} className='border-[1px] border-b-black text-start border-t-black px-[10px] md:px-[36px]  text-[22px] font-[500]'>{item}</th>
            ))}
            </tr>
          </thead>
            {questions.length ?
          (<tbody>
            {questions.map((item,index)=>(
              <tr key={index} className='text-center border-[1px] border-b-black'>
                <td className='px-[36px] py-[16px]'>{item.Question}</td>
                <td>{item.marks}</td>
                <td>{item.action}</td>
              </tr>
            ))}
          </tbody>):<tr className='mt-[10px]'><td>No Question added yet!</td></tr>}
        </table>
      </div>
      </div>}
        {openAddQuestion ===true &&<div className='fixed flex justify-center max-h-full inset-0 py-[25px] bg-black/30 backdrop-blur-sm w-full'><AddQuestion fromCancelButton={handleCloseAddQuestion} /></div>}
       {questiontype==='Descriptive' && <div className='mt-[100px]'>
         <div className='flex flex-col md:flex-row'>
              <button className={`border-[1px] border-black rounded-l-[10px] h-[40px] w-[236px] `}  onClick={()=>setQuestiontype('MCQ')}>MCQ questions</button>
               <button className={`border-[1px] border-black rounded-r-[10px] h-[40px] w-[236px] bg-[#0048B0] text-white`} >Descriptive questions</button>
            </div>
            <div className='bg-white rounded-[10px] min-h-[426px] p-[10px] mt-[50px]'>
            <h1 className='text-[24px] font-[600]'>{data.subject} Descriptive Questions</h1>
           {selectedFiles.length===0?(<div className='bg-[#E6E6ED] border-[2px] border-dashed border-black rounded-[10px] h-[302px] mt-[20px] py-[34px]'>
              <div className='flex flex-col justify-center items-center gap-[30px]' onDragOver={(e) => {
                 e.preventDefault();
                 setIsDragging(true);}} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} onClick={() => inputRef.current.click()}>
                <input ref={inputRef} type="file" accept="application/pdf" multiple className="hidden" onChange={ handleFiles}/>
                <MdOutlineFileUpload className='text-[#0048B0] border-black border-[1px] rounded-[10px] p-[4px] text-[45px]'/>
                <h1 className='text-[20px] font-[600]'>Drag & Drop your file here</h1>
                <div className='flex items-center gap-[10px] justify-center'>
                <div className='w-[90px] md:w-[180px] border-[0.5px] border-[gray]'></div>
                or
                <div className='w-[90px] md:w-[180px] border-[0.5px] border-[gray]'></div>
              </div>
                <div className='bg-[#0048B0] rounded-[12px] text-white w-[140px] h-[45px] flex items-center justify-center courser-pointer' >Select File</div>
              </div>
            </div>):( <div className='flex justify-center'>
              {pdfUrl && (
        <div className="mt-4">
          <iframe
            src={pdfUrl}
            width="825px"
            height="600px"
            className="border rounded"
          ></iframe>
        </div>
      )}
            </div>
            )}
            </div>
      </div>}
    </div>
  )
}

export default Adding_questions