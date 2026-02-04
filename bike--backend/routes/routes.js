 const express = require('express');
const router = express.Router();

// Import configured multer
const upload = require('../config/multer');   // ← adjust path if needed

const {
  createBikeListing,
  getAllBikeListings,
  getBikeById,
  updateBikeStatus,
} = require('../controllers/sellBikeController');

// Routes
router.post('/bike', upload.array('images', 5), createBikeListing);

router.get('/bike', getAllBikeListings);
router.get('/bike/:id', getBikeById);
router.patch('/bike/:id/status', updateBikeStatus);

module.exports = router;