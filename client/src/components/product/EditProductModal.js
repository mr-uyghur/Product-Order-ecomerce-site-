import React from 'react';
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

export default function EditProductModal({ modalIsOpen, setIsOpen, setProducts, product }) {
  const { name, price, stock, _id } = product;
  const [pname, setName] = React.useState(name);
  const [pprice, setPrice] = React.useState(price);
  const [pstock, setStock] = React.useState(stock);
  function closeModal() {
    setIsOpen(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/api/products/edit/${_id}`, { name: pname, price: pprice, stock: pstock });
      toast.success(res.data.message);
      setProducts((prev) => {
        const index = prev.findIndex((p) => p._id === _id);
        prev[index] = res.data.product;
        return [...prev];
      });
      resetForm();
      closeModal();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const resetForm = () => {
    setName('');
    setPrice('');
    setStock('');
  };
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Product Modal">
      <section className="flex flex-col justify-center items-center">
        <div className="w-96 bg-white p-6 flex flex-col items-center gap-y-4 rounded">
          <h1 className="text-xl font-semibold">Products Details</h1>
          <form className="w-full flex flex-col justify-center items-center gap-y-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="p-2 w-full bg-blue-100"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={pname}
              required
            />
            <input
              type="number"
              placeholder="Price"
              className="p-2 w-full bg-blue-100"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              value={pprice}
              required
            />
            <input
              type="number"
              placeholder="Stock"
              className="p-2 w-full bg-blue-100"
              name="stock"
              onChange={(e) => setStock(e.target.value)}
              value={pstock}
              required
            />
            <input
              type="submit"
              value="Edit"
              className="p-2 w-full bg-blue-700 text-white font-semibold active:bg-blue-500"
            />
          </form>
        </div>
      </section>
    </Modal>
  );
}
