"use client";
import React, { useState, useRef, useEffect } from "react";
import { LuClock } from "react-icons/lu";
import { FaCircleQuestion } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import AddQuestion from "./AddQuestion";
import { Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Update_question from "./Update_question";
type TestSeriesItem = {
  _id: string;
  title: string;
  examId: string;
  questions: number;
  duration: string;
  createdAt: string;
  testSeriesId: string;
};
const Adding_questions = ({ data }: { data: TestSeriesItem }) => {
  const [questiontype, setQuestiontype] = useState("MCQ");
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [questions, setQuestions] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [openUpdateQuestion, setOpenUpdateQuestion] = useState(false);
  const [updateQuestionId, setUpdateQuestionId] = useState<string | null>(null);
  useEffect(() => {
    if (!data?._id) return;
    const fetchquestionData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/test-series/${data._id}/questions`
        );
        const jsondata = await res.json();
        console.log("Fetched questions Data:", jsondata);
        setQuestionsData(jsondata);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchquestionData();
  }, [data]);
  useEffect(() => {
    if (!data?._id) return;
    const fetchdescriptivequestionData = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/test-series/questions/${data._id}`
        );
        const jsondata = await res.json();
        console.log("Fetched questions Data:", jsondata);
        setQuestionsData(jsondata);
        console.log("questionsData",questionsData)
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchdescriptivequestionData();
  }, [data]);

  const deleteQuestion = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/test-series/${data._id}/questions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      const responseData = await res.json();
      setQuestionsData(prev =>
        prev.filter((question) => question._id !== id)
      );
      alert("Question deleted successfully!");
      console.log("Deleted:", responseData);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    // const fileList = Array.from(file);
    // console.log('Selected files:', fileList);

    setSelectedFiles((prev) => [...prev, file]);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      console.log("url:", fileUrl);
      setPdfUrl(fileUrl);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("fileUrl", selectedFiles[0]);
    formData.append("title", selectedFiles[0].name.replace(/\.[^/.]+$/, ""));
    formData.append("examId", data.examId);
    formData.append("testSeriesId", data._id);
    formData.append("createdAt", new Date().toISOString());

    // Instead of console.log(formData), iterate:
    for (const [key, val] of formData.entries()) {
      console.log(key, val);
    }
    try {
      const res = await fetch("http://localhost:8000/api/question-papers", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      console.log("Success:", data);
      alert("Question paper uploaded successfully!");
       setSelectedFiles([]);       // if you're using file state
    // setIsModalOpen(false);  
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed");
    }
  };

  useEffect(() => {
    console.log("files:", selectedFiles);
  }, [selectedFiles]);

  const handleCloseAddQuestion = (
    data: boolean | ((prevState: boolean) => boolean)
  ) => {
    setOpenAddQuestion(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };
  const handleAddQuestion = () => {
    setOpenAddQuestion(true);
  };
  const handleUpdateQuestion = (id: string) => {
    setUpdateQuestionId(id);
    setOpenUpdateQuestion(true);
  };
  const handleCancel = () => {
  setSelectedFiles([]);
  // setIsModalOpen(false); // or close drawer/modal
};

  const handleCloseUpdateQuestion = (
    data: boolean | ((prevState: boolean) => boolean)
  ) => {
    setOpenUpdateQuestion(false);
  };
  if (!data) return <p>Loading...</p>;

  return (
    <div className="">
      <div className="mx-w-[1513px] h-full md:h-[195px] bg-white rounded-[20px] py-[14px] px-[30px]">
        <h1 className="text-[28px] md:text-[43px] font-[600]">{data.title}</h1>
        <div className="flex gap-[50px] items-center mt-[50px]">
          <div className="flex flex-col md:flex-row items-center gap-[10px]">
            <div className="bg-[#DBD8FF] flex justify-center items-center rounded-full w-[45px] h-[45px]">
              <LuClock className=" text-[#0048B0]" />
            </div>
            <div>
              <p>Duration</p>
              <p>{data.duration}</p>
            </div>
            <div className="bg-[#DBD8FF] flex justify-center items-center rounded-full w-[45px] h-[45px]">
              <FaCircleQuestion className=" text-[#0048B0]" />
            </div>
            <div>
              <p>Total Questions</p>
              <p>{data.questions}</p>
            </div>
            <div className="bg-[#DBD8FF] flex justify-center items-center rounded-full w-[45px] h-[45px]">
              <FaRegStar className=" text-[#0048B0]" />
            </div>
            <div>
              <p>Total Marks</p>
              <p>200</p>
            </div>
          </div>
        </div>
      </div>
      {questiontype === "MCQ" && (
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-[100px]">
            <div className="flex flex-col md:flex-row">
              <button
                className={`border-[1px] border-black rounded-l-[10px] h-[40px] w-[236px] bg-[#0048B0] text-white`}
              >
                MCQ questions
              </button>
              <button
                className={`border-[1px] border-black rounded-r-[10px] h-[40px] w-[236px] `}
                onClick={() => setQuestiontype("Descriptive")}
              >
                Descriptive questions
              </button>
            </div>
            <button
              className="flex gap-[8px] items-center justify-center max-w-[201px] h-[45px] rounded-[12px] bg-[#0048B0] text-white text-[16px] px-[32px] py-[16px] text-center"
              onClick={handleAddQuestion}
            >
              <span>+</span> Add a Question
            </button>
          </div>
          <div className="p-[10px]  mb-[35px] bg-white mt-[50px] min-h-[428px]">
            <h1 className="text-[23px] font-[500] mb-[35px]">
              {data.title} Mock MCQ Questions
            </h1>
            <table className="md:w-full overflow-x-scroll md:overflow-x-none">
              <thead className="">
                <tr>
                  {["Questions", "Marks", "Actions"].map((item, index) => (
                    <th
                      key={index}
                      className="r border-[1px] border-b-black text-start border-t-black px-[10px] md:px-[36px]  text-[22px] font-[500]"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              {questionsData.length ? (
                <tbody>
                  {questionsData.map(
                    (item, index) =>
                      // item._id?.toString() ===
                      //   data._id?.toString() &&
                      (
                        <tr
                          key={index}
                          className=" border-[1px] border-b-black "
                        >
                          <td className="  py-[16px] px-[10px] md:px-[36px]">
                            {index + 1}.{item.question}
                          </td>
                          <td className="text-center md:pr-[90px]">
                            {item.marks}
                          </td>

                          <td className="flex  items-center gap-[20px] px-[10px] pt-[15px] md:px-[36px]">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 hover:bg-blue-100 rounded transition-colors duration-200"
                            >
                              <Edit
                                className="w-4 h-4 text-blue-600"
                                onClick={() => handleUpdateQuestion(item._id)}
                              />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 hover:bg-red-100 rounded transition-colors duration-200"
                            >
                              <Trash2
                                className="w-4 h-4 text-red-600"
                                onClick={() => deleteQuestion(item._id)}
                              />
                            </motion.button>
                          </td>
                          <td></td>
                        </tr>
                      )
                  )}
                </tbody>
              ) : (
                <tbody>
                  <tr className="mt-[10px]">
                    <td>No Question added yet!</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
      {openAddQuestion === true && (
        <div className="absolute z-40 flex justify-center max-h-full inset-0 py-[25px] bg-black/30 backdrop-blur-sm w-full">
          <AddQuestion
            testseriesid={`${data._id}`}
            fromCancelButton={handleCloseAddQuestion}
          />
        </div>
      )}
      {openUpdateQuestion === true && (
        <div className="absolute z-40 flex justify-center max-h-full inset-0 py-[25px] bg-black/30 backdrop-blur-sm w-full">
          <Update_question
            questionid={updateQuestionId}
            testId={data._id}
            fromCancelButton={handleCloseUpdateQuestion}
          />
        </div>
      )}
      {questiontype === "Descriptive" && (
        <div className="mt-[100px]">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col hover:cursor-pointer md:flex-row ">
              <button
                className={`border-[1px] hover:cursor-pointer border-black rounded-l-[10px] h-[40px] w-[236px] `}
                onClick={() => setQuestiontype("MCQ")}
              >
                MCQ questions
              </button>
              <button
                className={`border-[1px] hover:cursor-pointer border-black rounded-r-[10px] h-[40px] w-[236px] bg-[#0048B0] text-white`}
              >
                Descriptive questions
              </button>
            </div>
            {/* <button className='flex gap-[8px] items-center justify-center max-w-[500px] h-[45px] rounded-[12px] bg-[#0048B0] text-white text-[16px] px-[32px] py-[16px] text-center' onClick={handleAddQuestion}><span>+</span> Upload Descriptive Question</button> */}
          </div>
          <div className="bg-white rounded-[10px] min-h-[426px] p-[10px] mt-[50px]">
            <h1 className="text-[24px] font-[600]">
              {data.title} Descriptive Questions
            </h1>
            <div></div>
            {selectedFiles.length === 0 ? (
              <div className="bg-[#E6E6ED] border-[2px] border-dashed border-black rounded-[10px] h-[302px] mt-[20px] py-[34px]">
                <div
                  className="flex flex-col justify-center items-center gap-[30px]"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current.click()}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    multiple
                    className="hidden"
                    onChange={handleFiles}
                  />
                  <MdOutlineFileUpload className="text-[#0048B0] border-black border-[1px] rounded-[10px] p-[4px] text-[45px]" />
                  <h1 className="text-[20px] font-[600]">
                    Drag & Drop your file here
                  </h1>
                  <div className="flex items-center gap-[10px] justify-center">
                    <div className="w-[90px] md:w-[180px] border-[0.5px] border-[gray]"></div>
                    or
                    <div className="w-[90px] md:w-[180px] border-[0.5px] border-[gray]"></div>
                  </div>
                  <div className="bg-[#0048B0] hover:cursor-pointer rounded-[12px] text-white w-[140px] h-[45px] flex items-center justify-center courser-pointer">
                    Select File
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                {pdfUrl && (
                  <div className="mt-4">
                    <iframe
                      src={pdfUrl}
                      width="825px"
                      height="600px"
                      className="border rounded"
                    ></iframe>
                    <div className="flex justify-end gap-[10px] mt-[20px]">
                      <button
                        type="submit"
                        className="w-[112px] h-[45px] hover:cursor-pointer border-[1px] border-[#0048B0] rounded-[12px] text-white bg-[#0048B0]"
                        onClick={handleUpload}
                      >
                        Upload
                      </button>
                      <button onClick={handleCancel} className="w-[130px] hover:cursor-pointer h-[45px]  border-[1px] border-[#0048B0] rounded-[12px] text-[#0048B0]">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Adding_questions;
