"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
);

export default function LineChart() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(new Array(12).fill(0));
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    async function fetchBookingStatistics() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bookingStats?startDate=2024-01-01&endDate=2024-12-31&year=2024`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Đảm bảo dữ liệu monthlyRevenue là một mảng với 12 phần tử
        const revenueData = data.monthlyRevenue || new Array(12).fill(0);
        setMonthlyRevenue(revenueData);
        setMaxValue(Math.max(...revenueData));
      } catch (error) {
        console.error("Error fetching booking statistics:", error);
      }
    }

    fetchBookingStatistics();
  }, []);

  return (
    <div
      className="relative z-20 mt-10 w-1/2 p-8"
      style={{ background: "#37373e", borderRadius: "40px" }}
    >
      <div className="text-3xl text-white">Doanh thu từ spa</div>
      <div className="mb-4 text-white">Doanh thu:</div>
      <Line
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
              data: monthlyRevenue,
              backgroundColor: "rgba(173, 62, 57, 0.2)", // Màu nền vùng dưới đường
              borderColor: "#AD3E39", // Màu của đường
              fill: true,
              tension: 0.4, // Độ cong của đường
              pointBackgroundColor: monthlyRevenue.map((value) =>
                value === maxValue ? "#AD3E39" : "grey",
              ),
              pointRadius: 6, // Bán kính điểm
              pointHoverRadius: 8, // Bán kính khi hover
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: {
                color: "#ffffff", // Màu chữ của legend
              },
            },
            title: {
              display: true,
              text: "Doanh thu tháng",
              color: "#ffffff", // Màu tiêu đề
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Tháng",
                color: "#ffffff",
              },
              ticks: {
                color: "#ffffff", // Màu chữ trục x
              },
            },
            y: {
              title: {
                display: true,
                text: "Doanh thu (VND)",
                color: "#ffffff",
              },
              ticks: {
                callback: (value) => `${value.toLocaleString()} VND`, // Format số tiền
                color: "#ffffff", // Màu chữ trục y
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}
