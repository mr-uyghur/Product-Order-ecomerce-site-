import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Product from './pages/Product';
import Order from './pages/Order';
import Modal from 'react-modal';
import { Toaster } from 'react-hot-toast';

Modal.setAppElement('#root');

function App() {
  return (
    <Router>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </main>
      <Toaster />
    </Router>
  );
}

export default App;
