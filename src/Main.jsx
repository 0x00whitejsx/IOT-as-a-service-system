import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import Modal from 'react-modal';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import stocks from './db'; // Adjust the path as necessary
import API from './components/API_Integration'
import Customers from './components/Customers';
import OrderDetails from './components/Orders';

// Register components for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Modal styling
Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
};

// Styled-components for IBM-inspired design
const Container = styled.div`
  font-family: 'IBM Plex Sans', sans-serif;
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #003366;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const SidebarItem = styled.a`
  color: white;
  text-decoration: none;
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0050e6;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f4f4f4;
  overflow-y: auto;
`;

const Header = styled.h1`
  color: #003366;
  text-align: center;
  margin-bottom: 20px;
`;

const Section = styled.section`
  background: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
`;

const Button = styled.button`
  background-color: #0062ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #0050e6;
  }
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #f1f1f1;
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #e0e7ff; /* Light blue hover effect */
  }
`;

const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const LoadMoreButton = styled(Button)`
  margin-top: 10px;
  background-color: #004bb5;

  &:hover {
    background-color: #003a9e;
  }
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

function App() {
  const [inventory, setInventory] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    itemName: '',
    itemCode: '',
    price: '',
    stock: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Dashboard'); // Track selected menu item

  // Use imported stocks for initial data
  useEffect(() => {
    setInventory(stocks);
  }, []);

  // Fetch sales data
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get('http://localhost:5000/admin/sales-report');
        setSalesData(res.data);
      } catch (err) {
        console.error('Error fetching sales data:', err);
      }
    };
    fetchSales();
  }, []);

  // Calculate metrics
  const totalItems = inventory.length;
  const totalPrice = inventory.reduce((acc, item) => acc + (Number(item.price) * Number(item.stock)), 0);
  const netWorth = totalPrice; // In this case, net worth is the same as total price

  // Chart data and options
  const barChartData = {
    labels: inventory.map(item => item.itemName),
    datasets: [
      {
        label: 'Stock in Store',
        data: inventory.map(item => item.stock),
        backgroundColor: '#0062ff',
      },
    ],
  };

  const pieChartData = {
    labels: inventory.map(item => item.itemName),
    datasets: [
      {
        label: 'Stock Distribution',
        data: inventory.map(item => item.stock),
        backgroundColor: [
          '#ff6384',
          '#36a2eb',
          '#cc65fe',
          '#ffce56',
          '#ff7f7f',
          '#7f7fff',
          '#7fff7f',
          '#ffff7f',
        ],
      },
    ],
  };

  const histogramData = {
    labels: ['0-20', '21-40', '41-60', '61-80', '81-100'],
    datasets: [
      {
        label: 'Stock Histogram',
        data: [
          inventory.filter(item => Number(item.stock) <= 20).length,
          inventory.filter(item => Number(item.stock) > 20 && Number(item.stock) <= 40).length,
          inventory.filter(item => Number(item.stock) > 40 && Number(item.stock) <= 60).length,
          inventory.filter(item => Number(item.stock) > 60 && Number(item.stock) <= 80).length,
          inventory.filter(item => Number(item.stock) > 80 && Number(item.stock) <= 100).length,
        ],
        backgroundColor: '#ffce56',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Inventory and Sales Report',
        font: {
          size: 18,
        },
      },
    },
  };

  // Handle opening modal
  function openModal() {
    setIsOpen(true);
  }

  // Handle closing modal
  function closeModal() {
    setIsOpen(false);
  }

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/inventory/add', newItem);
      setInventory([...inventory, res.data.item]);
      closeModal();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Handle loading more records
  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  // Slice the inventory array for pagination
  const displayedItems = inventory.slice(0, currentPage * itemsPerPage);

  // Function to render components based on the selected menu item
  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'Inventory':
        return (
          <>
            <h2>Inventory</h2>
            <Button onClick={openModal}>Add Item</Button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <h2>Add Item</h2>
              <form onSubmit={handleAddItem}>
                <label>Item Name:</label>
                <Input type="text" name="itemName" value={newItem.itemName} onChange={handleChange} />
                <label>Item Code:</label>
                <Input type="text" name="itemCode" value={newItem.itemCode} onChange={handleChange} />
                <label>Price:</label>
                <Input type="number" name="price" value={newItem.price} onChange={handleChange} />
                <label>Stock:</label>
                <Input type="number" name="stock" value={newItem.stock} onChange={handleChange} />
                <Button type="submit">Add</Button>
              </form>
            </Modal>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Item Code</TableHeader>
                  <TableHeader>Item Name</TableHeader>
                  <TableHeader>Price</TableHeader>
                  <TableHeader>Stock</TableHeader>
                </tr>
              </thead>
              <tbody>
                {displayedItems.map(item => (
                  <TableRow key={item.itemCode}>
                    <TableData>{item.itemCode}</TableData>
                    <TableData>{item.itemName}</TableData>
                    <TableData>NGN {item.price}</TableData>
                    <TableData>{item.stock}</TableData>
                  </TableRow>
                ))}
              </tbody>
            </Table>
            {currentPage * itemsPerPage < inventory.length && (
              <LoadMoreButton onClick={handleLoadMore}>Load More</LoadMoreButton>
            )}
          </>
        );
      case 'Dashboard':
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
                <CardValue>NGN {netWorth.toFixed(2)}</CardValue>
              </Card>
              <Card>
                <CardTitle>Total Price of Goods</CardTitle>
                <CardValue>NGN {totalPrice.toFixed(2)}</CardValue>
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
      case 'Orders':
          return (
            <>
              
              <OrderDetails />
            </>
          );
          case 'Customers':
            return (
              <>
                {/* <Header>Admin Dashboard - Customers</Header> */}
                <Customers />
              </>
            );
        // case 'Reports':
        //       return (
        //         <>
        //           <Header>Admin Dashboard - Reports</Header>
        //         </>
        //       );
              case 'API':
                return (
                  <>
                    {/* <Header>Admin Dashboard - API Integration</Header> */}
                    <API />
                  </>
                );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Sidebar>
        <SidebarItem onClick={() => setSelectedMenuItem('Dashboard')}>Dashboard</SidebarItem>
        <SidebarItem onClick={() => setSelectedMenuItem('Inventory')}>Inventory</SidebarItem>
        <SidebarItem onClick={() => setSelectedMenuItem('Orders')}>Orders</SidebarItem> {/* Added back */}
        <SidebarItem onClick={() => setSelectedMenuItem('Customers')}>Customers</SidebarItem> {/* Added back */}
        {/* <SidebarItem onClick={() => setSelectedMenuItem('Reports')}>Reports</SidebarItem>  */}
        <SidebarItem onClick={() => setSelectedMenuItem('API')}>API Integration</SidebarItem> {/* Added back */}
      </Sidebar>
      <MainContent>
        {renderContent()}
      </MainContent>
    </Container>
  );
}

export default App;
