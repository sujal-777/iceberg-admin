
'use client';
import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
const data = [
  { name: 'CMA', value: 100, color: '#FF8042' },
  { name: 'CA Foundation', value: 200, color: '#FFBB28' },
  { name: 'CA Inter', value: 300, color: '#00C49F' },
  { name: 'CA Final', value: 400, color: '#0088FE' },
];
const total = data.reduce((sum, entry) => sum + entry.value, 0);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const Performance_by_piechart = () => {
  const [activeLabel, setActiveLabel] = useState('CMA');
  return (
  <div className="relative w-full  md:max-w-[745px] h-[400px]  py-[19px] md:px-[23px] mx-auto bg-white rounded-[10px]">
    <h1 className='text-[23px] font-[500]'>View by Course</h1>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="30%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            onClick={(data, index) => {setActiveLabel(data.name);}} 
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Center text */}
      <div className="absolute top-[210px] left-[180px]">
        <div className="text-[20px] font-bold text-gray-800">{activeLabel}</div>
      </div>
      
      <div className='absolute top-[150px] left-[250px] md:left-[400px]'>
        {
          data.map((item,indx)=>(
            <div key={indx} className='flex items-center gap-[10px]'>
              <div className=' w-[30px] h-[10px]' style={{ backgroundColor: item.color }}></div>
              <p>{item.name}</p>
            </div>
          ))
        }
      </div>
      
    </div>
  )
}

export default Performance_by_piechart