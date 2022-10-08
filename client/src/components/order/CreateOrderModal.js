import React, { useEffect } from 'react';
import Modal from 'react-modal';
import axios from '../../utils/axios';
import { toast } from 'react-hot-toast';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

export default function CreateProductModal({ modalIsOpen, setIsOpen, setOrders }) {
  const [product, setProduct] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [products, setProducts] = React.useState([]);
  function closeModal() {
    setIsOpen(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product === 'Select' || !product || !quantity) return toast.error('Please fill all the fields');
      const res = await axios.post('/api/orders/create', { product, quantity });
      toast.success(res.data.message);
      setOrders((prev) => {
        prev?.length === 9 && prev.pop();
        return [res.data.order, ...prev];
      });
      resetForm();
      closeModal();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const getProducts = async () => {
    try {
      const res = await axios.get('/api/products/get');
      setProducts(res.data.products);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const resetForm = () => {
    setProduct('');
    setQuantity('');
  };
  console.log(products);
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Order Modal">
      <section className="flex flex-col justify-center items-center">
        <div className="w-96 bg-white p-6 flex flex-col items-center gap-y-4 rounded">
          <h1 className="text-xl font-semibold">Order Details</h1>
          <form className="w-full flex flex-col justify-center items-center gap-y-2" onSubmit={handleSubmit}>
            <select
              type="text"
              placeholder="Name"
              className="p-2 w-full"
              name="name"
              onChange={(e) => setProduct(e.target.value)}
              value={product}
              required
            >
              <option>Select</option>
              {products?.map((p) => (
                <option key={p._id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Quantity"
              className="p-2 w-full bg-blue-100"
              name="quantity"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              required
            />
            <input
              type="submit"
              value="Create"
              className="p-2 w-full bg-blue-700 text-white font-semibold active:bg-blue-500"
            />
          </form>
        </div>
      </section>
    </Modal>
  );
}
