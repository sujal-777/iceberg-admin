"use client"
import { supabase } from "@/lib/supabaseClient";
import React, { useRef, useState } from 'react';

interface AddVideoProps {
  fromCancelButton: (value: boolean) => void;
}

const Addvideo: React.FC<AddVideoProps> = ({ fromCancelButton }) => {
  const [formData, setFormData] = useState({
    title: '',
    short_desc: '',
    specialization: '',
    lecturer_image: '',
    lecturer_name: '',
    subject: '',
    duration: '',
    thumbnail_url: '',
    video_url: '',
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);

  function handleChange(e: { target: { name: any; value: any; }; }) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    let finalVideoUrl = formData.video_url;

    if (!finalVideoUrl && videoFile) {
      const fileExt = videoFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, videoFile);

      if (uploadError) {
        console.error('Error uploading video:', uploadError);
        alert('Failed to upload video file.');
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      finalVideoUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from('videos').insert([{
      ...formData,
      video_url: finalVideoUrl,
    }]);

    if (error) {
      console.error('Submit error:', error);
      alert('Failed to submit video data.');
    } else {
      alert('Video submitted successfully!');
      setFormData({
        title: '',
        short_desc: '',
        specialization: '',
        lecturer_image: '',
        lecturer_name: '',
        subject: '',
        duration: '',
        thumbnail_url: '',
        video_url: '',
      });
      setVideoFile(null);
    }
  };

  const handleCancel = () => {
    fromCancelButton(false);
  };

  return (
    <div className='bg-transparent w-[1000px]'>
      <div className='bg-white flex flex-col gap-[20px] rounded-[20px] p-[20px]'>
        <form onSubmit={handleSubmit}>
          <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>
            Video Title
            <input type='text' name="title" value={formData.title} onChange={handleChange}
              className='max-w-[1312px] text-[18px] font-normal h-[35px] border border-black rounded-[10px] px-[30px]' />
          </label>

          <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>
            Description
            <input type='text' name="short_desc" value={formData.short_desc} onChange={handleChange}
              className='max-w-[1312px] text-[18px] font-normal h-[35px] border border-black rounded-[10px] px-[30px]' />
          </label>

          <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
            <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>
              Specialization
              <input type='text' name="specialization" value={formData.specialization} onChange={handleChange}
                className='max-w-[650px] text-[18px] font-normal h-[35px] border border-black rounded-[10px] px-[30px]' />
            </label>

            <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>
              Subject
              <input type='text' name="subject" value={formData.subject} onChange={handleChange}
                className='max-w-[650px] text-[18px] font-normal h-[35px] border border-black rounded-[10px] px-[30px]' />
            </label>
          </div>

          <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
            <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>
              Duration of Video
              <input type='text' name="duration" value={formData.duration} onChange={handleChange}
                className='max-w-[650px] text-[18px] font-normal h-[35px] border border-black rounded-[10px] px-[30px]' />
            </label>

            <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>
              Lecturer Name
              <input type='text' name="lecturer_name" value={formData.lecturer_name} onChange={handleChange}
                className='max-w-[650px] text-[18px] font-normal h-[35px] border border-black rounded-[10px] px-[30px]' />
            </label>
          </div>

          <div className='grid grid-cols-2 gap-[12px] max-w-[1312px]'>
            <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>
              Lecturer Image URL
              <input type='text' name="lecturer_image" value={formData.lecturer_image} onChange={handleChange}
                className='max-w-[650px] text-[18px] font-normal h-[35px] border border-black rounded-[10px] px-[30px]' />
            </label>

            <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>
              Thumbnail URL
              <input type='text' name="thumbnail_url" value={formData.thumbnail_url} onChange={handleChange}
                className='max-w-[650px] text-[18px] font-normal h-[35px] border border-black rounded-[10px] px-[30px]' />
            </label>
          </div>

          <label className='text-[20px] font-[500] flex flex-col gap-[10px]'>
            Video URL (paste or upload)
            <input
              type='text'
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              placeholder="Paste URL or leave empty to upload"
              className='max-w-[650px] text-[18px] font-normal h-[35px] border border-black rounded-[10px] px-[30px]' />
            <input
              type='file'
              accept='video/*'
              onChange={handleVideoFileChange}
              className='mt-2' />
          </label>

          <div className="flex gap-[10px] mt-[20px]">
            <button type="submit" className="w-[112px] h-[35px] border border-[#0048B0] rounded-[12px] text-white bg-[#0048B0]">ADD</button>
            <button type="button" className="w-[130px] h-[35px] border border-[#0048B0] rounded-[12px] text-white bg-[#0048B0]" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Addvideo;
