"use client"
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import React from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useState,useEffect } from 'react'
import { IoMdPlay } from "react-icons/io";
const videos = () => {
    const [videos, setVideos] = useState([]);
    const [categorySelection,setCategorySelection]=useState('All Videos');
    const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  

    const fetchVideos = async () => {
        const { data, error } = await supabase
          .from("videos")
          .select("*");
    
        if (error) {
          console.error("Error fetching videos:", error);
        } else {
          setVideos(data || []);
        }
      };
    
      useEffect(() => {
        fetchVideos();
      }, []);
      
const delete_videos=async()=>{
  const {error}=await supabase
  .from('videos')
  .delete()
  .in('id',selectedItems)

   if (error) {
        console.error("Error deleting videos:", error);
    } else {
      alert('selected item deleted');
      setVideos((prevVideos) => prevVideos.filter(video => !selectedItems.includes(video.id)))
      console.log("selected video is delete");
  }
  
}
useEffect(()=>{
  console.log("slected items",selectedItems);
},[selectedItems])

  useEffect(() => {
    
  console.log("Videos array:", videos);
}, [videos]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]); // Unselect all
    } else {
      setSelectedItems(videos.map((item,index) => item.id)); // Select all
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };
  return (
    <main className="bg-white rounded-t-[10px]">
     <div className=' mt-[35px] flex items-center  h-[67px] border-2 rounded-t-[10px]  border-b-gray-400 gap-[20px]'>
            <h1 className={`text-[20px] py-[15px] border-white font-[500] pl-[29px] rounded-t-[10px] courser-pointer ${categorySelection==='All Videos'?"text-[#0048B0] border-[3px] border-b-[#0048B0]":"text-black"}`} onClick={()=>setCategorySelection('All Videos')}>All Videos  <span className='bg-[#D9D9D9] w-[40px] h-[26px] px-[11px] py-[5px] rounded-[14px]'>24</span></h1>
            <h1 className={`text-[20px] py-[15px] border-white font-[500] courser-pointer ${categorySelection==='Playlists'?"text-[#0048B0] border-[3px] border-b-[#0048B0]":"text-black"}`} onClick={()=>setCategorySelection('Playlists')}>Playlists <span className='bg-[#D9D9D9] w-[40px] h-[26px] px-[11px] py-[5px] rounded-[14px]'>5</span></h1>
            <h1 className={`text-[20px] py-[15px] border-white font-[500] courser-pointer ${categorySelection==='Learning Paths'?"text-[#0048B0] border-[3px] border-b-[#0048B0]":"text-black"}`} onClick={()=>setCategorySelection('Learning Paths')}>Learning Paths <span className='bg-[#D9D9D9] w-[40px] h-[26px] px-[11px] py-[5px] rounded-[14px]'>3</span></h1>
      </div>
     <div className=' bg-white pb-[20px] px-[20px] pt-[35px]'>
      <div className="flex justify-between items-center w-full ">
       <label className="flex items-center gap-[10px] text-[20px] font-[500]">
        <input type="checkbox" className="w-[20px] h-[20px]" checked={selectAll} onChange={handleSelectAll}></input>
        Select All
       </label>
       <div className="flex gap-[10px]">
       <button className="w-[112px] h-[45px] text-[#0048B0] border-[1px] border-[#0048B0] rounded-[12px] hover:text-white hover:bg-[#0048B0]" onClick={delete_videos}>Delete</button>
      <button className="w-[170px] h-[45px] text-[#0048B0] border-[1px] border-[#0048B0] rounded-[12px] hover:text-white hover:bg-[#0048B0]">Add to playlist</button>
      </div>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px] mt-[35px]">
          {
            videos.map((item)=>(
              <div key={item.id} className="relative border-[1px] border-black rounded-[10px]">
                <div className=" absolute flex justify-between items-center">
                  <input type="checkbox" className="relative left-[10px] top-[4px]"  checked={selectedItems.includes(item.id)} onChange={() => handleSelectItem(item.id)}></input>
                  <p className="bg-black text-white text-[15px]  rounded-full w-[62px] text-center h-[29px] relative top-[10px] left-[250px]">{item.duration}</p>
                </div>
                <Image src={'/videoThum.png'} alt="" width={447} height={212}></Image>
                <a href={item.video_url}>
                <div className="absolute flex justify-center items-center top-[80px] left-[160px]  bg-[#EEF6FF] rounded-full p-[13px] w-[50px] h-[50px]">
                <IoMdPlay className="text-[#0048B0] text-[25px]"/>
                </div>
                </a>
                <div className="bg-[#EEF6FF] rounded-b-[10px] p-4">
                  <h1 className="text-[20px] font-[600]">{item.specialization}</h1>
                  <p className="text-[15px] font-[300] my-[20px]">{item.short_desc}</p>
                  <div className="flex justify-between items-center">
                  <div className="flex items-center gap-[10px]">
                    <Image src={item.lecturer_image} alt="name" width={60} height={60} className="rounded-full"></Image>
                    <div>
                      <p className="text-[15px] font-[500]">{item.lecturer_name}</p>
                      <p className="text-[12px]">{item.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-[10px]">
                  <FiEdit className="w-[30px] h-[30px]"/>
                  <RiDeleteBinLine className="w-[30px] h-[30px]"/>
                  </div>
                  </div>
                </div>
              </div>
            ))
          }
            
        </div>
    </div>
    </main>
  )
}

export default videos
