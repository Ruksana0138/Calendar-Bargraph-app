import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const DataBarChart = ({ data }) => {
  return (
    <BarChart width={400} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="user" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#82ca9d" />
    </BarChart>
  );
};

export default DataBarChart;
