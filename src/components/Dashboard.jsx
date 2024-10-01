import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import styled from 'styled-components';

const Header = styled.h1`
  color: #003366;
  text-align: center;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  flex: 1;
`;

const CardTitle = styled.h3`
  color: #003366;
  margin-bottom: 10px;
`;

const CardValue = styled.p`
  font-size: 24px;
  color: #0062ff;
`;

const Section = styled.section`
  background: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

const Dashboard = ({ totalItems, totalPrice, netWorth, barChartData, pieChartData, histogramData, chartOptions }) => {
  return (
    <>
      <Header>Admin Dashboard</Header>
      <CardContainer>
        <Card>
          <CardTitle>Total Items</CardTitle>
          <CardValue>{totalItems}</CardValue>
        </Card>
        <Card>
          <CardTitle>Net Worth</CardTitle>
          <CardValue>${netWorth.toFixed(2)}</CardValue>
        </Card>
        <Card>
          <CardTitle>Total Price of Goods</CardTitle>
          <CardValue>${totalPrice.toFixed(2)}</CardValue>
        </Card>
      </CardContainer>

      <Section>
        <h3>Inventory Stock Report</h3>
        <Bar data={barChartData} options={chartOptions} />
      </Section>

      <Section>
        <h3>Stock Distribution</h3>
        <Pie data={pieChartData} options={chartOptions} />
      </Section>

      <Section>
        <h3>Stock Histogram</h3>
        <Bar data={histogramData} options={chartOptions} />
      </Section>
    </>
  );
};

export default Dashboard;
