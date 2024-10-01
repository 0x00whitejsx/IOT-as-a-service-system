import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut, Radar, Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale, Filler } from 'chart.js';
import 'chartjs-chart-financial'; // For candlestick charts
import styled from 'styled-components';
import { CSVLink } from 'react-csv'; // For exporting logs

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
);

// Styled components for layout and design
const Container = styled.div`
  padding: 2rem;
  background-color: #f4f7f9;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #2e3a59;
  font-size: 2.5rem;
  font-weight: 600;
`;

const ChartContainer = styled.div`
  margin-bottom: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LogsContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LogTitle = styled.h3`
  margin-bottom: 1rem;
  color: #2e3a59;
  font-size: 1.75rem;
  font-weight: 500;
`;

const LogItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #e1e4e8;
  &:last-child {
    border-bottom: none;
  }
  color: #4a4a4a;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PillsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const PillButton = styled.button`
  background-color: ${props => (props.active ? '#007bff' : '#e1e4e8')};
  color: ${props => (props.active ? 'white' : '#4a4a4a')};
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#c2c7d0')};
    transform: scale(1.05);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin: 0.5rem 0;
  width: 100%;
  max-width: 200px;
`;

const PaginationContainer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

// Generate dummy data
const generateRandomData = () => ({
  customerID: Math.floor(Math.random() * 1000),
  activityLog: `Activity ${Math.floor(Math.random() * 10 + 1)}`,
  purchaseAmount: Math.floor(Math.random() * 500) + 20,
  terminalLog: `Terminal ${Math.floor(Math.random() * 100 + 1)}`,
  timestamp: new Date().toLocaleTimeString(),
});

const initialLogs = Array.from({ length: 80 }, generateRandomData);

const Customers = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [chartData, setChartData] = useState({
    labels: initialLogs.map((log) => log.timestamp),
    datasets: [
      {
        label: 'Purchase Amount',
        data: initialLogs.map((log) => log.purchaseAmount),
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.3)',
        fill: true,
      },
    ],
  });

  const [chartType, setChartType] = useState('Line');
  const [filter, setFilter] = useState('All');
  const [currentLogs, setCurrentLogs] = useState(initialLogs.slice(0, 10));

  // Update records every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = generateRandomData();
      setLogs((prevLogs) => {
        const updatedLogs = [...prevLogs.slice(1), newLog];
        return updatedLogs;
      });

      // Update chart data
      setChartData({
        labels: logs.map((log) => log.timestamp),
        datasets: [
          {
            label: 'Purchase Amount',
            data: logs.map((log) => log.purchaseAmount),
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.3)',
            fill: true,
          },
        ],
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [logs]);

  // Handle chart type change
  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Handle log pagination
  const handlePageChange = (page) => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    setCurrentLogs(logs.slice(startIndex, endIndex));
  };

  const renderChart = () => {
    if (chartType === 'Line') {
      return <Line data={chartData} />;
    }
    if (chartType === 'Bar') {
      return <Bar data={chartData} />;
    }
    if (chartType === 'Candlestick') {
      // Example of Candlestick chart data
      const candlestickData = {
        labels: logs.map((log) => log.timestamp),
        datasets: [
          {
            label: 'Purchase Amount',
            data: logs.map(log => ({
              x: log.timestamp,
              o: log.purchaseAmount - 10,
              h: log.purchaseAmount + 10,
              l: log.purchaseAmount - 20,
              c: log.purchaseAmount
            })),
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.3)',
          },
        ],
      };
      return <Bar data={candlestickData} />;
    }
    if (chartType === 'Doughnut') {
      const doughnutData = {
        labels: ['High Value', 'Low Value'],
        datasets: [
          {
            label: 'Value Distribution',
            data: [
              logs.filter(log => log.purchaseAmount > 200).length,
              logs.filter(log => log.purchaseAmount <= 200).length
            ],
            backgroundColor: ['#007bff', '#28a745'],
          },
        ],
      };
      return <Doughnut data={doughnutData} />;
    }
    if (chartType === 'Radar') {
      const radarData = {
        labels: logs.map(log => log.timestamp),
        datasets: [
          {
            label: 'Purchase Amount',
            data: logs.map(log => log.purchaseAmount),
            backgroundColor: 'rgba(0, 123, 255, 0.3)',
            borderColor: '#007bff',
          },
        ],
      };
      return <Radar data={radarData} />;
    }
    if (chartType === 'Bubble') {
      const bubbleData = {
        datasets: [
          {
            label: 'Purchase Amount',
            data: logs.map(log => ({
              x: new Date(log.timestamp).getHours(),
              y: log.purchaseAmount,
              r: log.purchaseAmount / 10,
            })),
            backgroundColor: '#007bff',
          },
        ],
      };
      return <Bubble data={bubbleData} />;
    }
  };

  return (
    <Container>
      <Heading>Customer Activity Matrix</Heading>

      {/* Chart Type Selector */}
      <FilterContainer>
        <PillsContainer>
          {['Line', 'Bar', 'Candlestick', 'Doughnut', 'Radar', 'Bubble'].map(type => (
            <PillButton
              key={type}
              active={chartType === type}
              onClick={() => handleChartTypeChange(type)}
            >
              {type}
            </PillButton>
          ))}
        </PillsContainer>
      </FilterContainer>

      {/* Chart */}
      <ChartContainer>
        {renderChart()}
      </ChartContainer>

      {/* Filters */}
      <FilterContainer>
        <FilterSelect value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="High Value">High Value</option>
          <option value="Low Value">Low Value</option>
        </FilterSelect>
        <CSVLink
          data={logs}
          filename="customer_logs.csv"
          style={{ textDecoration: 'none' }}
        >
          <Button>Export Logs</Button>
        </CSVLink>
      </FilterContainer>

      {/* Activity Logs */}
      <LogsContainer>
        <LogTitle>Customer Activity Logs</LogTitle>
        {currentLogs.map((log, index) => (
          <LogItem key={index}>
            <div>Customer ID: {log.customerID}</div>
            <div>{log.activityLog}</div>
            <div>Purchase: NGN {log.purchaseAmount}</div>
            <div>{log.terminalLog}</div>
            <div>{log.timestamp}</div>
          </LogItem>
        ))}
        <PaginationContainer>
          <Button onClick={() => handlePageChange(1)}>Page 1</Button>
          <Button onClick={() => handlePageChange(2)}>Page 2</Button>
        </PaginationContainer>
      </LogsContainer>
    </Container>
  );
};

export default Customers;
