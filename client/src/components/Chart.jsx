import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler, // Import Filler for area chart
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const Chart = () => {
  const [chartData, setChartData] = useState(null);
  const [timeRange, setTimeRange] = useState("1d"); // Default to 1 day

  // Fetch and format the data
  const getData = async () => {
    const response = await axios.get(
      "http://localhost:4030/api/all-sensor-values/"
    );

    const formattedData = response.data.collection1.map((data) => ({
      temperature: parseFloat(data.value), // Temperature
      time: new Date(data.createdAt), // Time as Date object
    }));

    setChartData(formattedData);
  };

  // Filter data based on the selected time range
  const filterData = () => {
    if (!chartData) return { labels: [], datasets: [] };

    const now = new Date();
    const filteredData = chartData.filter((data) => {
      const timeDiff = now - data.time;
      switch (timeRange) {
        case "1d":
          return timeDiff <= 24 * 60 * 60 * 1000; // Last 1 day
        case "3d":
          return timeDiff <= 3 * 24 * 60 * 60 * 1000; // Last 3 days
        case "1w":
          return timeDiff <= 7 * 24 * 60 * 60 * 1000; // Last 1 week
        default:
          return true;
      }
    });

    const labels = filteredData.map((data) => {
      switch (timeRange) {
        case "3d":
          return `${data.time.toLocaleDateString()} ${data.time.toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit", hour12: false }
          )}`;
        case "1w":
          return data.time.toLocaleDateString();
        default:
          return data.time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
      }
    });

    const temperatures = filteredData.map((data) => data.temperature);

    return {
      labels,
      datasets: [
        {
          label: "Temperature (°C)",
          data: temperatures,
          borderColor: "#8884d8",
          backgroundColor: "rgba(136, 132, 216, 0.4)",
          tension: 0.4, // Smooth curve
          fill: true, // Fill for area chart
        },
      ],
    };
  };

  useEffect(() => {
    getData();
  }, []);

  const chartDataFiltered = filterData();

  const buttonClass = (range) =>
    `border border-accent p-3 px-5 rounded-md font-medium ${
      timeRange === range ? "bg-accent" : "bg-transparent"
    }`;

  return (
    <>

      {chartData ? (
        <div style={{ width: '100%', height: '500px' }}>

        <Line
        style={{width: '100% !important',}}
          data={chartDataFiltered}
          options={{
              responsive: true,
            scales: {
              x: {
                title: {
                  display: true,
                  text: timeRange === "1w" ? "Date" : "Time (HH:mm)",
                },
              },
              y: {
                title: { display: true, text: "Temperature (°C)" },
                min: 10,
                max: 100,
              },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.raw}°C`, // Show temperature in °C
                    },
                },
            },
        }}
        />
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className="px-8 w-full flex items-center mt-5 justify-between">
        {" "}
        <button
          onClick={() => setTimeRange("1d")}
          className={buttonClass("1d")}
        >
          {" "}
          1 Day{" "}
        </button>{" "}
        <button
          onClick={() => setTimeRange("3d")}
          className={buttonClass("3d")}
        >
          {" "}
          3 Days{" "}
        </button>{" "}
        <button
          onClick={() => setTimeRange("1w")}
          className={buttonClass("1w")}
        >
          {" "}
          1 Week{" "}
        </button>{" "}
        <button
          onClick={() => setTimeRange("1m")}
          className={buttonClass("1m")}
        >
          {" "}
          1 Month{" "}
        </button>{" "}
        <button
          onClick={() => setTimeRange("6m")}
          className={buttonClass("6m")}
        >
          {" "}
          6 Months{" "}
        </button>
      </div>
    </>
  );
};

export default Chart;
