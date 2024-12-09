"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function BarChart() {
  const [data, setData] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orderStats?startDate=2024-01-01&endDate=2024-12-31&year=2024`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const stats = await response.json();

        const monthlyData = stats.monthlyRevenue || Array(12).fill(0); // Đảm bảo có dữ liệu 12 tháng.
        setData(monthlyData);
        setMaxValue(Math.max(...monthlyData));
      } catch (error) {
        console.error("Lỗi khi gọi API thống kê:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div
      className="relative z-20 mt-10 w-1/2 p-8"
      style={{ background: "#37373e", borderRadius: "40px" }}
    >
      <div className="text-3xl text-white">Doanh thu đơn hàng</div>
      <div className="text-white">Doanh thu:</div>
      <Bar
        className="mt-8"
        data={{
          labels: [
            "Thg 1",
            "Thg 2",
            "Thg 3",
            "Thg 4",
            "Thg 5",
            "Thg 6",
            "Thg 7",
            "Thg 8",
            "Thg 9",
            "Thg 10",
            "Thg 11",
            "Thg 12",
          ],
          datasets: [
            {
              label: "Doanh thu (VND)",
              data: data,
              backgroundColor: data.map((value) =>
                value === maxValue ? "#AD3E39" : "grey",
              ),
              borderRadius: 5,
              borderSkipped: false,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Doanh thu tháng",
              color: "#ffffff", // Màu tiêu đề
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => `${value.toLocaleString()} VND`,
              },
            },
          },
        }}
      />
    </div>
  );
}
