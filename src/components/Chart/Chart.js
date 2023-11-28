import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import zoomPlugin from "chartjs-plugin-zoom";

// Register the zoom plugin
Chart.register(zoomPlugin);

function BarChart({
  chartTitle = "My Chart Title",
  backgroundColor = "rgba(220, 220, 220, 0.2)",
  gridLineColor = "rgba(0, 0, 0, 0.2)",
  tooltipsFontSize = 16,
  customTooltipsLabel = (item) => `${item.label}: ${item.value}`,
  chartWidth = window.innerWidth >= 768
    ? "500px"
    : window.innerWidth >= 576
    ? "400px"
    : "300px",
  chartHeight = window.innerWidth >= 768
    ? "300px"
    : window.innerWidth >= 576
    ? "250px"
    : "200px",
  chartData = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6"],
    datasets: [
      {
        label: "Data",
        data: [12, 19, 14, 13, 25, 35],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
      },
    ],
  },
}) {
  // Create references for the canvas and chart instance
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Get the canvas context
    const myChartRef = chartRef.current.getContext("2d");

    // Create the chart instance with customized options
    chartInstance.current = new Chart(myChartRef, {
      type: "bar",
      data: chartData,
      options: {
        scales: {
          x: {
            grid: {
              color: gridLineColor,
              lineWidth: 1,
            },
          },
          y: {
            grid: {
              color: gridLineColor,
              lineWidth: 1,
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: chartTitle,
          },
          backgroundColor: backgroundColor,
          tooltip: {
            enabled: true,
            mode: "label",
            bodyFontSize: tooltipsFontSize,
            callbacks: {
              label: customTooltipsLabel,
            },
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "xy",
            },
          },
        },
      },
    });

    // Clean up when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [
    chartTitle,
    backgroundColor,
    gridLineColor,
    tooltipsFontSize,
    customTooltipsLabel,
    chartData, // Add chartData as a dependency
  ]);

  useEffect(() => {
    // Update chart when chartData changes
    if (chartInstance.current) {
      chartInstance.current.data = chartData;
      chartInstance.current.update();
    }
  }, [chartData]);

  return (
    <div>
      <canvas
        style={{
          width: chartWidth,
          height: chartHeight,
        }}
        ref={chartRef}
      />
    </div>
  );
}

export default BarChart;
