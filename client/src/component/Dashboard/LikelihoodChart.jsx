import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import { Box, useColorModeValue, Heading, Select } from "@chakra-ui/react";

const LikelihoodChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/data', {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
      })
      .then(data => {
        setChartData(data);
        setFilteredData(data);
        
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    
    if (selectedCountry === "All") {
      setFilteredData(chartData);
    } else {
      setFilteredData(chartData.filter((entry) => entry.country === selectedCountry));
    }
  };

  useEffect(() => {
    if (selectedCountry === "All") {
      setFilteredData(chartData);
    } else {
      setFilteredData(chartData.filter((entry) => entry.country === selectedCountry));
    }
  }, [selectedCountry, chartData]);

  const radarChartData = {
    labels: filteredData.map((entry) => entry.country),
    datasets: [
      {
        label: "Likelihood",
        data: filteredData.map((entry) => entry.likelihood),
        backgroundColor: useColorModeValue(
          "rgba(0, 129, 169, 0.7)",
          "(173, 140, 216,0.7)"
        ),
        borderColor: useColorModeValue(
          "rgba(0, 129, 169, 1)",
          "rgba(173, 140, 216,1)"
        ),
        borderWidth: 2,
        pointBackgroundColor: useColorModeValue("white", "black"),
        pointBorderColor: useColorModeValue(
          "rgba(0, 129, 169, 1)",
          "rgba(0, 119, 255, 1)"
        ),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 5,
        stepSize: 1,
        fontSize: 12,
      },
      pointLabels: {
        fontSize: 12,
      },
    },
    legend: {
      display: false, 
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
  };

  const countries = chartData ? [...new Set(chartData.map((entry) => entry.country))] : [];

  return (
    <Box
      borderRadius={20}
      pt={6}
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
      mt={50}
      shadow="md"
      pb={100}
      bg={useColorModeValue("white", "gray.800")}
      maxHeight={800} 
      maxWidth={800}
      overflow="hidden" 
    >
      <Heading as="h2" mb={4} ml={6}>
        Likelihood Chart
      </Heading>
      <Select value={selectedCountry} onChange={handleCountryChange} mb={4} ml={6}>
        <option value="All">All</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </Select>

      <Radar data={radarChartData} options={chartOptions} />
    </Box>
  );
};

export default LikelihoodChart;
