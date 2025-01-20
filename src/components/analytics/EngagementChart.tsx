import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface EngagementData {
  date: string;
  likes: number;
  comments: number;
  shares: number;
}

interface EngagementChartProps {
  data: EngagementData[];
}

export function EngagementChart({ data }: EngagementChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Engagement Overview</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
              contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem' }}
            />
            <Area
              type="monotone"
              dataKey="likes"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorLikes)"
            />
            <Area
              type="monotone"
              dataKey="comments"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorComments)"
            />
            <Area
              type="monotone"
              dataKey="shares"
              stroke="#F59E0B"
              fillOpacity={1}
              fill="url(#colorShares)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
          <span className="text-sm text-gray-600">Likes</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
          <span className="text-sm text-gray-600">Comments</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
          <span className="text-sm text-gray-600">Shares</span>
        </div>
      </div>
    </div>
  );
}