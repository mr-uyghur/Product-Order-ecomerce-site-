const orderModel = require('../models/order');

const createOrder = async (req, res) => {
  console.log(req.body);
  try {
    const order = await orderModel(req.body);
    await order.save();
    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

const getOrders = async (req, res) => {
  const { page = 0 } = req.query;
  try {
    const length = (await orderModel.find()).length;
    const pageCount = Math.floor(length / 9);
    const orders = await orderModel.find().sort({ createdAt: -1 }).skip(page * 9).limit(9);
    res.status(200).json({
      message: 'Orders fetched successfully',
      orders,
      pageCount,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

const deleteOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await orderModel.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Order deleted successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await orderModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      message: 'Order updated successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  deleteOrders,
  updateOrder,
};
