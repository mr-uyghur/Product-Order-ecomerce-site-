import React, { useCallback, useEffect } from 'react';
import { FcPlus } from 'react-icons/fc';
import CreateProductModal from '../components/product/CreateProductModal';
import axios from '../utils/axios';
import { toast } from 'react-hot-toast';
import ProductCard from '../components/product/ProductCard';
import ReactPaginate from 'react-paginate';

export default function Product() {
  const [page, setPage] = React.useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [pageCount, setPageCount] = React.useState(0);
  const getProducts = useCallback(async () => {
    try {
      const res = await axios.get('/api/products/get?page=' + page);
      setProducts(res.data.products);
      setPageCount(res.data.pageCount);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }, [page]);
  useEffect(() => {
    getProducts();
  }, [page, getProducts]);
  const handlePageClick = (e) => {
    setPage(e.selected);
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="mt-2 w-full flex flex-col gap-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-700">Products</h1>
          <button
            className="h-8 w-8 bg-slate-200 rounded-full flex justify-center items-center active:bg-slate-300"
            onClick={() => setIsOpen(true)}
          >
            <FcPlus size={20} />
          </button>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 p-2 w-full">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} setProducts={setProducts} />
          ))}
        </div>
        <div className="flex justify-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount+1}
            previousLabel="previous"
            renderOnZeroPageCount={null}
            className="flex justify-center items-center gap-x-2"
            pageLinkClassName="text-sm  bg-white  hover:bg-blue-200  border border-blue-300  rounded w-8 h-8 flex justify-center items-center"
            previousLinkClassName="text-sm text-gray-700  bg-white  hover:bg-blue-500 hover:text-white border border-blue-300  rounded w-24 h-8 flex justify-center items-center"
            nextLinkClassName="text-sm text-gray-700  bg-white  hover:bg-blue-500 hover:text-white border border-blue-300  rounded w-24 h-8 flex justify-center items-center"
            breakLinkClassName="text-sm text-gray-700  bg-white  hover:bg-blue-500 hover:text-white border border-blue-300  rounded w-24 h-8 flex justify-center items-center"
            activeLinkClassName={
              'text-sm text-white bg-blue-500  hover:bg-blue-500 hover:text-white border border-blue-300  rounded w-8 h-8 flex justify-center items-center'
            }
          />
        </div>
      </div>

      {modalIsOpen && <CreateProductModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setProducts={setProducts} />}
    </section>
  );
}
