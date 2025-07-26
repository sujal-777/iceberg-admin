"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type itemToEdit = {
  _id: string;
  categoryId: string;
  title: string;
  examId: string;
  // questions:'',
  duration: string;
  createdAt: string;
  // marks:'',
  status: string;
  description: string;
};

const Update_Test_Series = ({ data }: { data: itemToEdit }) => {
  const [exam, setExam] = useState([]);
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    examId: "",
    // questions:'',
    duration: "",
    createdAt: "",
    // marks:'',
    totalMarks : "",
    status: "",
    description: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/categories");
        const data = await res.json();
        console.log("Fetched categories Data:", data);
        setCategory(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCategoryData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/exams/");
        const data = await res.json();
        console.log("Fetched exam Data:", data);
        setExam(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("data upd:", data);
    if (data) {
      setFormData({
        categoryId: data.categoryId || "",
        examId: data.examId || "",
        name: data.name || "",
        examId: data.examId || "",
        totalMarks: data.totalMarks || "0",
        // questions:'',
        duration: data.duration || "",
        createdAt: data.createdAt || "",
        // marks:'',
        status: data.status || "",
        description: data.description || "",
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      duration: Number(formData.duration),
      createdAt: new Date().toISOString(),
      _id: data._id,
    };
    try {
      const res = await fetch(
        `http://localhost:8000/api/test-series/${data._id}`,
        {
          method: "PUT", // or PATCH
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }
      const jsondata = await res.json();
      console.log("Updated:", jsondata);
      alert("successfully updated");
      router.push("/test-series");
    } catch (err) {
      console.error(err);
      alert("error in updating the test series");
    }
  };
  return (
    <div>
      <div>
        <h1 className="text-[25px] font-[600]">Update Test Series</h1>
        <p className="text-[25px] font-[600]">Basic Information</p>
      </div>
      <div className="mt-10">
        <form onSubmit={handleUpdate}>
          <div className="bg-white flex flex-col  gap-[20px] rounded-[20px] p-[20px]">
            <label className="text-[20px] font-[500] flex flex-col gap-[10px]">
              Test series Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Principles and Practice of Accounting Mock Test Series"
                className="max-w-[1312px] text-[18px] font-normal h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]"
              ></input>
            </label>

            <div className="grid grid-cols-2 gap-[12px] max-w-[1312px]">
              <div className="flex flex-col gap-[10px]">
                <label htmlFor="select" className="">
                  Select Exam Category
                </label>
                <select
                  id="select"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="block max-w-[650px] h-[45px] p-2 border border-black rounded-[10px]  focus:ring-[#0048B0] focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {category?.map((option, idx) => (
                    <option key={idx} value={option._id} className="">
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-[10px]">
                <label htmlFor="select" className="">
                  Select Exam
                </label>
                <select
                  id="select"
                  name="examId"
                  value={formData.examId}
                  onChange={handleChange}
                  className="block max-w-[650px] h-[45px] p-2 border border-black rounded-[10px]  focus:ring-[#0048B0] focus:border-blue-500"
                  required
                >
                  {exam.map((option, idx) => (
                    <option key={idx} value={option._id} className="">
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[12px] max-w-[1312px]">
              <label className="text-[20px] font-[500] flex  flex-col gap-[10px]">
                Duration(minutes)
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="180"
                  className="max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]"
                ></input>
              </label>
              {/* <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Total Questions<input type='text'name="questions" value={formData.questions} onChange={handleChange} placeholder='100'  className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label> */}
            </div>
            <div className="grid grid-cols-2 gap-[12px] max-w-[1312px]">
              {/* <label className='text-[20px] font-[500] flex  flex-col gap-[10px]'>Total Marks<input type='text' value={formData.marks} name="marks" onChange={handleChange} placeholder='200'  className='max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]'></input></label> */}
              <label className="text-[20px] font-[500] flex  flex-col gap-[10px]">
                Status
                <input
                  type="text"
                  name="status"
                  value={formData.totalMarks}
                  onChange={handleChange}
                  placeholder="40"
                  className="max-w-[650px] text-[18px] font-normal  h-[45px] border-[1px] border-[#000000] rounded-[10px] px-[30px]"
                ></input>
              </label>
            </div>
            <label className="text-[20px] font-[500] flex flex-col gap-[10px]">
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a brief description of this test series...."
                className="max-w-[1312px] text-[18px] font-normal h-[126px] border-[1px] border-[#000000] rounded-[10px] px-[30px]"
              ></textarea>
            </label>
          </div>
          <div className="flex justify-end gap-[10px] mt-[20px] '>">
            <button
              type="submit"
              className="w-[112px] h-[45px]  border-[1px] border-[#0048B0] rounded-[12px] text-white bg-[#0048B0]"
            >
              Update
            </button>
            <Link href="/test-series">
              <button className="w-[130px] h-[45px]  border-[1px] border-[#0048B0] rounded-[12px] text-[#0048B0] ">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update_Test_Series;
