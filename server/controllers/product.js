const productModel = require('../models/product');

const createProduct = async (req, res) => {
  try {
    const product = await productModel(req.body);
    await product.save();
    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

const getProducts = async (req, res) => {
  const { page = 0 } = req.query;
  try {
    const length = (await productModel.find()).length;
    const pageCount = Math.floor(length / 9);
    const products = await productModel.find().sort({ createdAt: -1 }).skip(page * 9).limit(9);
    res.status(200).json({
      message: 'Products fetched successfully',
      products,
      pageCount,

    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

const deleteProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Product deleted successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

module.exports = { createProduct, getProducts, deleteProducts, updateProduct };
