import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main'; // Importing the Main component
import Documnet from '../src/components/Documentation'; // Importing the Dashboard component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Main page */}
        <Route path="/" element={<Main />} />
        {/* Route for Dashboard page */}
        <Route path="/Documnet" element={<Documnet />} />
      </Routes>
    </Router>
  );
};

export default App;
