import React, { useState } from "react";
import BarChart from "./Chart"; 

function ChartForm() {
 
  const [chartOptions, setChartOptions] = useState({
    chartTitle: "My Chart Title",
    backgroundColor: "rgba(220, 220, 220, 0.2)",
    gridLineColor: "rgba(0, 0, 0, 0.2)",
    tooltipsFontSize: 16,
  });

  // State to manage chart data
  const [chartData, setChartData] = useState({
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
  });

  // Event handler for updating chart customization options
  const handleOptionChange = (key, value) => {
    setChartOptions((prevOptions) => ({ ...prevOptions, [key]: value }));
  };

  // Event handler for updating chart data
  const handleDataChange = (newData) => {
    setChartData((prevData) => ({
      ...prevData,
      datasets: [{ ...prevData.datasets[0], data: newData }],
    }));
  };

  // Event handler for submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any additional actions when the form is submitted
  };

  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <form onSubmit={handleSubmit}>
          {/* Chart Customization Options */}
          <label style={{ display: "block", marginBottom: "8px" }}>
            Chart Title:
            <input
              type="text"
              value={chartOptions.chartTitle}
              onChange={(e) => handleOptionChange("chartTitle", e.target.value)}
            />
          </label>
       
          <label style={{ display: "block", marginBottom: "8px" }}>
            Grid Line Color:
            <input
              type="text"
              value={chartOptions.gridLineColor}
              onChange={(e) =>
                handleOptionChange("gridLineColor", e.target.value)
              }
            />
          </label>
      

          {/* Chart Data */}
          <label style={{ display: "block", marginBottom: "8px" }}>
            Chart Data :
            <input
              type="text"
              value={chartData.datasets[0].data.join(",")}
              onChange={(e) =>
                handleDataChange(e.target.value.split(",").map(Number))
              }
            />
          </label>

          <button type="submit">Update Chart</button>
        </form>
      </div>
      {/* Render the BarChart component with the updated options and data */}

      <div >
        <BarChart
          chartTitle={chartOptions.chartTitle}
         
          gridLineColor={chartOptions.gridLineColor}
        
          chartData={chartData}
        />
      </div>
    </div>
  );
}

export default ChartForm;
