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

export default function EditOrderModal({ modalIsOpen, setIsOpen, setOrders, order }) {
  const { product, quantity, _id, status ,trackingNumber, trackingCompany } = order;
  const [oproduct, setProduct] = React.useState(product);
  const [oquantity, setQuantity] = React.useState(quantity);
  const [ostatus, setStatus] = React.useState(status);
  const [tcompany, setTcompany] = React.useState(trackingCompany);
  const [tNumber, setTNumber] = React.useState(trackingNumber);
  const [products, setProducts] = React.useState([]);

  function closeModal() {
    setIsOpen(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/api/orders/update/${_id}`, {
        product: oproduct,
        quantity: oquantity,
        status: ostatus,
        trackingCompany: tcompany || '',
        trackingNumber: tNumber || '',
      });
      toast.success(res.data.message);
      setOrders((prev) => {
        console.log(prev);
        const index = prev.findIndex((p) => p._id === _id);
        prev[index] = res.data.order;
        return [...prev];
      });
      resetForm();
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  const resetForm = () => {
    setProduct('');
    setQuantity('');
    setStatus('');
    setTcompany('');
    setTNumber('');
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
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Product Modal">
      <section className="flex flex-col justify-center items-center">
        <div className="w-96 bg-white p-6 flex flex-col items-center gap-y-4 rounded">
          <h1 className="text-xl font-semibold">Products Details</h1>
          <form className="w-full flex flex-col justify-center items-center gap-y-2" onSubmit={handleSubmit}>
            <select
              type="text"
              placeholder="Product"
              className="p-2 w-full"
              name="product"
              onChange={(e) => setProduct(e.target.value)}
              value={oproduct}
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
              value={oquantity}
              required
            />
            <select
              type="text"
              placeholder="Name"
              className="p-2 w-full"
              name="name"
              onChange={(e) => setStatus(e.target.value || status)}
              value={ostatus}
              required
            >
              <option value={'processing'}>processing</option>
              <option value={'delivered'}>delivered</option>
              <option value={'cancelled'}>cancelled</option>
            </select>
            <input
              type="text"
              placeholder="Tracking Company"
              className="p-2 w-full"
              name="tcompany"
              onChange={(e) => setTcompany(e.target.value)}
              value={tcompany}
              required
            />
            <input
              type="number"
              placeholder="Tracking Number"
              className="p-2 w-full"
              name="tNumber"
              onChange={(e) => setTNumber(e.target.value)}
              value={tNumber}
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
