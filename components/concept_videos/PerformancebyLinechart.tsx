'use client';

import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,ReferenceArea} from 'recharts';

const data = [
  { name: 'Apr 15', views: 850 },
  { name: 'Apr 20', views: 920 },
  { name: 'Apr 25', views: 900 },
  { name: 'Apr 30', views: 1300 },
  { name: 'May-1', views: 1350 },
];

export default function LineChartComponent() {
  return (
    <div className="w-full  h-[400px] mx-auto py-[19px] px-[23px] bg-white rounded-[10px]" >
      <h1 className='text-[23px] font-[500] '>Engagement Over Time</h1>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 25, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <ReferenceArea
          x1={data[0].name}
          y1={Math.max(...data.map(d => d.views))}
          x2={data[0].name}
          y2={0}
          ifOverflow="visible"
          strokeOpacity={0}
           fill="#A8CCFF"
        />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#A8CCFF"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
