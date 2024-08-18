import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Heading, Select } from '@chakra-ui/react';

const IntensityChart = () => {
  const [selectedYear, setSelectedYear] = useState('All');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/data', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setFilteredData(data);
        updateChartData(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setSelectedYear(selectedYear);

    if (selectedYear === 'All') {
      setFilteredData(data);
      updateChartData(data);
    } else {
      const filteredData = data.filter((item) => item.start_year === selectedYear);
      setFilteredData(filteredData);
      updateChartData(filteredData);
    }
  };

  const updateChartData = (filteredData) => {
    const intensityData = {};
  filteredData.forEach((item) => {
    if (intensityData[item.start_year]) {
      intensityData[item.start_year].push(item.intensity);
    } else {
      intensityData[item.start_year] = [item.intensity];
    }
  });
  const aggregatedYears = Object.keys(intensityData);
  const aggregatedIntensities = aggregatedYears.map((year) => {
    const intensities = intensityData[year];
    const sum = intensities.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / intensities.length);
  });

    const getColor = (value) => {
      const colors = ['#7F00FF', '#F2B93B', '#FF8000', '#FF453A'];
      const threshold = Math.max(...aggregatedIntensities) / 4;
      if (value < threshold) {
        return colors[0];
      } else if (value < threshold * 2) {
        return colors[1];
      } else if (value < threshold * 3) {
        return colors[2];
      } else {
        return colors[3];
      }
    };

    const chartData = {
      labels: aggregatedYears,
      datasets: [
        {
          label: 'Intensity',
          backgroundColor: aggregatedIntensities.map((value) => getColor(value)),
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 1,
          data: aggregatedIntensities,
        },
      ],
    };
    setChartData(chartData);
  };

  const getUniqueYears = () => {
    const years = data.map((item) => item.start_year);
    return ['All', ...new Set(years)];
  };

  const chartOptions = {
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        cornerRadius: 5,
        displayColors: false,
      },
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'start',
        offset: -20,
        font: {
          size: 14,
          weight: 'bold',
        },
        formatter: (value) => value + '%',
        shadowBlur: 10,
        shadowColor: 'white',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Roboto',
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Roboto',
            size: 14,
            weight: 'bold',
          },
          callback: (value) => value + '%',
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
      mode: 'progressive',
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ margin: '50px', padding: '10px', fontFamily: 'Arial, sans-serif', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <Heading as="h2" mb={4}>Intensity Chart</Heading>
      <Select value={selectedYear} onChange={handleYearChange} mb={4}>
        {getUniqueYears().map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </Select>
      <Bar data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default IntensityChart;
