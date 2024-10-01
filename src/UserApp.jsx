import  { useState } from 'react';
import axios from 'axios';
import { QrReader } from 'react-qr-barcode-scanner';

function UserApp() {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Scan item and add to cart
  const handleScan = async (result) => {
    if (result) {
      const itemCode = result.text;  // Extract the barcode from the result
      try {
        const res = await axios.post('http://localhost:5000/checkout/scan', { itemCode });
        const item = res.data;
        setCart([...cart, item]);
        setTotalAmount(totalAmount + item.price);
        setErrorMessage('');  // Clear any previous error message
      } catch (error) {
        setErrorMessage('Item not found');
      }
    }
  };

  // Handle Checkout
  const handleCheckout = async () => {
    try {
      const res = await axios.post('http://localhost:5000/checkout/checkout', {
        customerId: '12345',  // Replace with dynamic user ID
        items: cart.map(item => ({ ...item, quantity: 1 })),
        totalAmount,
      });
      alert('Payment Successful');
      setCart([]);
      setTotalAmount(0);
    } catch (error) {
      setErrorMessage('Checkout failed');
    }
  };

  // Handle scan errors
  const handleError = (error) => {
    setErrorMessage('Scan error');
  };

  return (
    <div>
      <h1>User Checkout System</h1>
      <QrReader
        onResult={handleScan}
        onError={handleError}
        style={{ width: '100%' }}
      />
      <h3>Items in Cart:</h3>
      <ul>
        {cart.map((item, idx) => (
          <li key={idx}>{item.itemName} - ${item.price}</li>
        ))}
      </ul>
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
      <button onClick={handleCheckout}>Finish Checkout</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default UserApp;
