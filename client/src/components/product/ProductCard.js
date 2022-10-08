import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import axios from '../../utils/axios';
import toast from 'react-hot-toast';
import EditProductModal from './EditProductModal';

export default function ProductCard({ product, setProducts }) {
  const { name, price, stock, _id } = product;

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/products/delete/${_id}`);
      setProducts((prev) => prev.filter((product) => product._id !== _id));
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-96 h-48 p-2 rounded bg-white">
      <div className="flex justify-between items-center">
        <p className="bg-blue-100 text-blue-500 px-4 py-1 rounded-full font-semibold">{name}</p>
        <div className="flex gap-x-2">
          <button
            className="h-6 w-6 bg-slate-200 rounded-full flex justify-center items-center active:bg-slate-300"
            onClick={() => setIsOpen(true)}
          >
            <BiEdit />
          </button>
          <button
            className="h-6 w-6 bg-slate-200 rounded-full flex justify-center items-center active:bg-slate-300"
            onClick={handleDelete}
          >
            <MdDeleteForever />
          </button>
        </div>
      </div>
      <div className="w-full h-[calc(100%-1.5rem)] flex flex-col justify-center items-center gap-y-2">
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-2 mb-[1.5rem]">
          <p className="text-5xl font-bold text-blue-500">$ {price}</p>
          <p className="font-semibold">Stock: {stock}</p>
        </div>
      </div>
      {modalIsOpen && (
        <EditProductModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setProducts={setProducts} product={product} />
      )}
    </div>
  );
}
