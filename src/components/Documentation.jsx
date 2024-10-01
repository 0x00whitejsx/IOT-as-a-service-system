import React from 'react';
import './Documentation.css'; // Custom CSS for styling the documentation

function Documentation() {
  return (
    <div className="doc-container">
      <aside className="doc-sidebar">
        <nav>
          <ul>
            <li><a href="#api-routes">🚀 Backend API Routes</a></li>
            <li><a href="#inventory">📦 Inventory Management</a></li>
            <li><a href="#checkout">🛒 Checkout Process</a></li>
            <li><a href="#admin">🔍 Admin Barcode Scanning</a></li>
            <li><a href="#frontend">💻 Frontend Components</a></li>
            <li><a href="#checkout-flow">🔄 Checkout Flow</a></li>
            <li><a href="#authentication">🔐 Authentication and Security</a></li>
            <li><a href="#error-handling">⚠️ Error Handling</a></li>
            <li><a href="#hardware-configuration">🔧 Hardware Configuration</a></li>
          </ul>
        </nav>
      </aside>

      <div className="doc-content">
        <h1>📄 Application Documentation</h1>
        <p>This documentation provides an overview of our SaaS platform designed for IoT-enabled eCommerce shops. It includes details on backend API routes, frontend components, and the checkout process. Our platform offers advanced features such as a self-checkout system, inventory management, and more.</p>
        
        <section id="api-routes">
          <h2>🚀 Backend API Routes</h2>
          <p>Below are the key API routes used for managing inventory, processing user checkouts, and scanning items by barcode.</p>

          <section id="inventory">
            <h3>📦 1. Inventory Management</h3>
            <pre>
              <code className="language-javascript">
                {`
app.use('/inventory', inventoryRoutes);  // Inventory management routes
                `}
              </code>
            </pre>
            <p>The <code>/inventory</code> route handles operations like retrieving items and managing stock in the inventory.</p>
            
            <h4>Sample Request and Response</h4>
            <pre>
              <code className="language-javascript">
                {`
// GET request
GET /inventory/items

// Response
{
  "items": [
    { "id": 1, "name": "Laptop", "stock": 15, "price": 899.99 },
    { "id": 2, "name": "Headphones", "stock": 45, "price": 199.99 }
  ]
}
                `}
              </code>
            </pre>
          </section>

          <section id="checkout">
            <h3>🛒 2. Checkout Process</h3>
            <pre>
              <code className="language-javascript">
                {`
app.use('/checkout', checkoutRoutes);  // User checkout routes
                `}
              </code>
            </pre>
            <p>The <code>/checkout</code> route processes user checkouts, applying discounts, and finalizing transactions.</p>

            <h4>Sample Request and Response</h4>
            <pre>
              <code className="language-javascript">
                {`
// POST request
POST /checkout/confirm
{
  "customerID": 101,
  "items": [
    { "id": 1, "quantity": 1 },
    { "id": 2, "quantity": 2 }
  ],
  "paymentMethod": "CreditCard"
}

// Response
{
  "status": "success",
  "message": "Checkout complete! 🎉",
  "totalPrice": 1299.97,
  "receiptID": "REC123456789"
}
                `}
              </code>
            </pre>
          </section>

          <section id="admin">
            <h3>🔍 3. Admin: Barcode Scanning</h3>
            <pre>
              <code className="language-javascript">
                {`
app.use('/admin', adminRoutes);  // Admin routes

router.post('/scan', async (req, res) => {
  const { itemCode } = req.body;
  try {
    const item = await Inventory.findOne({ itemCode });
    if (!item) return res.status(404).json({ message: 'Item not found 😞' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error scanning item', error });
  }
});
                `}
              </code>
            </pre>

            <h4>Sample Request and Response</h4>
            <pre>
              <code className="language-javascript">
                {`
// POST request
POST /admin/scan
{
  "itemCode": "SKU12345"
}

// Response
{
  "id": 1,
  "name": "Laptop",
  "stock": 15,
  "price": 899.99
}
                `}
              </code>
            </pre>
          </section>
        </section>

        <section id="frontend">
          <h2>💻 Frontend Components</h2>

          <section>
            <h3>1. SDK Download Button</h3>
            <pre>
              <code className="language-jsx">
                {`
<a
  href={\`/downloads/\${selectedLanguage.toLowerCase()}-sdk.zip\`}
  download={\`\${selectedLanguage}-SDK.zip\`}
  style={{ textDecoration: 'none' }}
>
  <DownloadButton>Download {selectedLanguage} SDK 📦</DownloadButton>
</a>
                `}
              </code>
            </pre>
            <p>Allows users to download SDK files from the app, with a file name suggestion.</p>
          </section>

          <section>
            <h3>2. Random Data Generator</h3>
            <pre>
              <code className="language-javascript">
                {`
const generateRandomData = () => ({
  customerID: Math.floor(Math.random() * 1000),
  activityLog: \`Activity \${Math.floor(Math.random() * 10 + 1)}\`,
  purchaseAmount: Math.floor(Math.random() * 500) + 20,
  terminalLog: \`Terminal \${Math.floor(Math.random() * 100 + 1)}\`,
  timestamp: new Date().toLocaleTimeString(),
});
                `}
              </code>
            </pre>
            <p>This function generates random test data for use in your frontend or API testing.</p>
          </section>

          <section>
            <h3>3. Error Boundary Component</h3>
            <pre>
              <code className="language-javascript">
                {`
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error occurred:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
                `}
              </code>
            </pre>
            <p>Wrap your components with this <code>ErrorBoundary</code> component to handle JavaScript errors anywhere in their child component tree.</p>
          </section>
        </section>

        <section id="checkout-flow">
          <h2>🔄 Checkout Flow</h2>
          <p>The checkout flow follows a detailed process to ensure proper validation and management of transactions. Below is an overview of the flow:</p>

          <ol>
            <li>📱 Customer opens the mobile app.</li>
            <li>🔍 Customer scans items using the barcode scanner.</li>
            <li>If no items are scanned, the process terminates; otherwise, the mobile app sends item data to the Checkout Service.</li>
            <li>✔️ Checkout Service validates the items.</li>
            <li>💾 Checkout Service updates the Transaction Database.</li>
            <li>💵 Checkout Service calculates the total price.</li>
            <li>📝 Customer reviews and confirms the items.</li>
            <li>💳 Customer selects the payment method.</li>
            <li>🔄 If the payment is successful, the following actions take place:
              <ul>
                <li>✔️ Checkout Service processes the payment.</li>
                <li>🛠️ Checkout Service updates the Inventory Database.</li>
                <li>📧 Checkout Service sends a receipt to the customer.</li>
                <li>🔔 Customer receives any notifications (if applicable).</li>
              </ul>
            </li>
            <li>❌ If the payment fails, the transaction is aborted and the customer receives an error message.</li>
            <li>🚪 The customer can choose to exit or continue shopping.</li>
          </ol>
        </section>

        <section id="authentication">
          <h2>🔐 Authentication and Security</h2>
          <p>Proper authentication and security practices are crucial for protecting sensitive data and ensuring that only authorized users have access to certain parts of the system.</p>

          <section>
            <h3>1. User Authentication</h3>
            <pre>
              <code className="language-javascript">
                {`
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  // Validate credentials and generate JWT token
});
                `}
              </code>
            </pre>
            <p>The <code>/auth/login</code> route is used for user login. It validates credentials and generates a JSON Web Token (JWT) for authenticated sessions.</p>
          </section>

          <section>
            <h3>2. Token-based Authentication</h3>
            <pre>
              <code className="language-javascript">
                {`
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
                `}
              </code>
            </pre>
            <p>This middleware function verifies JWT tokens and protects routes from unauthorized access.</p>
          </section>
        </section>

        <section id="error-handling">
          <h2>⚠️ Error Handling</h2>
          <p>Effective error handling is essential for diagnosing and troubleshooting issues in your application.</p>

          <section>
            <h3>1. Global Error Handling Middleware</h3>
            <pre>
              <code className="language-javascript">
                {`
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
                `}
              </code>
            </pre>
            <p>This middleware catches and handles errors globally within your application, providing a response to the client and logging the error for debugging purposes.</p>
          </section>

          <section>
            <h3>2. Custom Error Classes</h3>
            <pre>
              <code className="language-javascript">
                {`
class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = CustomError;
                `}
              </code>
            </pre>
            <p>Create custom error classes to better manage and categorize errors within your application.</p>
          </section>
        </section>

        <section id="hardware-configuration">
          <h2>🔧 Hardware Configuration</h2>
          <p>To integrate the system with hardware and generate API keys and terminal numbers, follow the instructions below.</p>

          <section>
            <h3>1. Generate API Keys & Terminal Number</h3>
            <pre>
              <code className="language-jsx">
                {`
<Form>
  <h3>Generate API Keys & Terminal Number</h3>
  <Label>
    <IconLabel>🔑</IconLabel> Public Key
  </Label>
  <Input type="text" value={keys.publicKey} readOnly />
  
  <Label>
    <IconLabel>🔒</IconLabel> Private Key
  </Label>
  <Input type="text" value={keys.privateKey} readOnly />

  <Label>
    <IconLabel>🗝️</IconLabel> Secret Key
  </Label>
  <Input type="text" value={keys.secretKey} readOnly />

  <Label>
    <IconLabel>📟</IconLabel> Terminal Number
  </Label>
  <Input type="text" value={keys.terminalNumber} readOnly />

  <GenerateButton onClick={generateKeys}>Generate Keys</GenerateButton>
</Form>
                `}
              </code>
            </pre>
            <p>This form allows users to generate API keys and a terminal number. The fields are read-only, and the <code>Generate Keys</code> button triggers the key generation process.</p>
          </section>

          <section>
            <h3>2. Configuring with Hardware</h3>
            <p>To configure the system with hardware, follow these steps:</p>
            <ol>
              <li>Connect the hardware devices to the system.</li>
              <li>Ensure that the hardware drivers are installed and up-to-date.</li>
              <li>Configure the hardware settings through the application settings or management interface.</li>
              <li>Verify the connection and functionality of the hardware devices.</li>
              <li>Test the integration by performing sample operations and verifying that the hardware is correctly interacting with the system.</li>
            </ol>
          </section>

          <section>
            <h3>3. Handling Bad Requests</h3>
            <pre>
              <code className="language-javascript">
                {`
router.post('/scan', async (req, res) => {
  const { itemCode } = req.body;
  if (!itemCode) {
    return res.status(400).json({ message: 'Bad Request: Item code is required' });
  }
  
  try {
    const item = await Inventory.findOne({ itemCode });
    if (!item) return res.status(404).json({ message: 'Item not found 😞' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error scanning item', error });
  }
});
                `}
              </code>
            </pre>
            <p>In the example above, the API handles cases where the item code is missing by returning a <code>400 Bad Request</code> response. Proper error handling ensures that invalid requests are addressed and appropriate responses are given.</p>
          </section>
        </section>
      </div>
    </div>
  );
}

export default Documentation;
