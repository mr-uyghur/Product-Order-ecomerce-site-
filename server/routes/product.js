const express = require('express');
const { createProduct, getProducts, deleteProducts, updateProduct } = require('../controllers/product');
const router = express.Router();

router.post('/create', createProduct);
router.get('/get', getProducts);
router.delete('/delete/:id', deleteProducts);
router.patch('/edit/:id', updateProduct);

module.exports = router;
