import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend} from "recharts";
import TempTooltip from './TempTooltip';
import CustomLegend from './CustomLegend';


const CustomPieChart = ({ data, colors }) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={300} >
        <PieChart className='z-10'>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="count"
            nameKey="status"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>

          <Tooltip content={<TempTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomPieChart;