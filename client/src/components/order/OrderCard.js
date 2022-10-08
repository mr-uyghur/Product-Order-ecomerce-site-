import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import axios from '../../utils/axios';
import toast from 'react-hot-toast';
import EditOrderModal from './EditOrderModal';

export default function OrderCard({ order, setOrders }) {
  const { product, quantity, _id, status, trackingCompany, trackingNumber } = order;

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/orders/delete/${_id}`);
      setOrders((prev) => prev.filter((order) => order._id !== _id));
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);
  return (
    <div className="w-96 h-48 p-2 rounded bg-white">
      <div className="flex justify-between items-center">
        <p
          className={`${
            status === 'processing'
              ? 'bg-blue-100 text-blue-500'
              : status === 'delivered'
              ? 'bg-green-100 text-green-500'
              : 'bg-red-100 text-red-500'
          } px-4 py-1 rounded-full font-semibold`}
        >
          {status}
        </p>
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
        <div className="w-full h-full flex flex-col justify-center items-center gap-y-2">
          <p
            className={`text-5xl font-bold ${
              status === 'processing' ? ' text-blue-500' : status === 'delivered' ? ' text-green-500' : ' text-red-500'
            } `}
          >
            $ {product}
          </p>
          <p className="font-semibold">quantity: {quantity}</p>
        </div>
        <div className="flex justify-between w-full">
          {trackingCompany && (
            <p
              className={`${
                status === 'processing'
                  ? 'bg-blue-100 text-blue-500'
                  : status === 'delivered'
                  ? 'bg-green-100 text-green-500'
                  : 'bg-red-100 text-red-500'
              } px-2 text-sm font-semibold text-center`}
            >
              {trackingCompany}
            </p>
          )}
          {trackingNumber && (
            <p
              className={`${
                status === 'processing'
                  ? 'bg-blue-100 text-blue-500'
                  : status === 'delivered'
                  ? 'bg-green-100 text-green-500'
                  : 'bg-red-100 text-red-500'
              } px-4 py-1 text-sm font-semibold text-center`}
            >
              {trackingNumber}
            </p>
          )}
        </div>
      </div>
      {modalIsOpen && (
        <EditOrderModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setOrders={setOrders} order={order} />
      )}
    </div>
  );
}
