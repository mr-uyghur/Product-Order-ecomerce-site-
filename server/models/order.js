const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    trackingCompany: {
        type: String,
    },
    trackingNumber: {
        type: Number,
    },
    status: {
        type: String,
        default: "processing"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
