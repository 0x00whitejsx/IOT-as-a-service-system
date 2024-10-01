import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

function AdminApp() {
  const [inventory, setInventory] = useState([]);
  const [salesData, setSalesData] = useState([]);

  // Fetch inventory
  useEffect(() => {
    const fetchInventory = async () => {
      const res = await axios.get('http://localhost:5000/inventory/all');
      setInventory(res.data);
    };
    fetchInventory();
  }, []);

  // Fetch sales data
  useEffect(() => {
    const fetchSales = async () => {
      const res = await axios.get('http://localhost:5000/admin/sales-report');
      setSalesData(res.data);
    };
    fetchSales();
  }, []);

  // Chart configuration
  const chartData = {
    labels: salesData.map(sale => sale.customerId),
    datasets: [{
      label: 'Total Amount',
      data: salesData.map(sale => sale.totalAmount),
      backgroundColor: 'rgba(75,192,192,1)',
    }],
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Inventory Management</h2>
      <ul>
        {inventory.map((item, idx) => (
          <li key={idx}>{item.itemName} - ${item.price} (Stock: {item.stock})</li>
        ))}
      </ul>
      <h2>Sales Report</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default AdminApp;
