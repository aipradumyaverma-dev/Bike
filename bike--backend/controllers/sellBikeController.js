const SellBike = require('../models/sellBike');

// POST - Create new bike selling listing
const createBikeListing = async (req, res) => {
  try {
    console.log("BODY  →", req.body);
    console.log("FILES →", req.files);          // ← must see array here

    const {
      bikeName, brand, model, year, price, mileage,
      condition, engineCC, fuelType, color,
      description, contactNumber, location
    } = req.body;

    // Safe number conversion + fallback
    const safeNumber = (val) => {
      const num = Number(val);
      return isNaN(num) ? 0 : num; // or throw error - your choice
    };


    // Capitalize first letter for enum match and handle hyphens
    const capitalize = (str) => {
      if (!str) return '';
      // Replace hyphens with spaces, then capitalize each word
      return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    };


    const imagePaths = req.files?.map(file => `/uploads/bikes/${file.filename}`) || [];

    const newBike = new SellBike({
      bikeName,
      brand,
      model,
      year: safeNumber(year),
      price: safeNumber(price),
      mileage: safeNumber(mileage),
      condition: capitalize(condition),      // "excellent" → "Excellent"
      engineCC: safeNumber(engineCC),
      fuelType: capitalize(fuelType),       // "petrol" → "Petrol"
      color,
      description,
      contactNumber,
      location,
      images: imagePaths,
    });

    const savedBike = await newBike.save();

    res.status(201).json({
      success: true,
      message: "Bike listed successfully",
      data: savedBike
    });

  } catch (error) {
    console.error("CREATE BIKE CRASHED:", error);

    // Very helpful for debugging
    if (error.name === 'ValidationError') {
      console.log("VALIDATION DETAILS:", error.errors);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map(e => e.message)
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating listing",
      error: error.message
    });
  }
};

// GET - Get all bike listings (for admin or public listing page)
const getAllBikeListings = async (req, res) => {
  try {
    const { status, brand, minPrice, maxPrice, location } = req.query;

    const filter = {};

    if (status) filter.status = status;
    if (brand) filter.brand = new RegExp(brand, 'i');
    if (location) filter.location = new RegExp(location, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // For public users - show only approved bikes by default
    // COMMENTED OUT: Uncomment this if you want to filter by status
    // if (!req.query.showAll) {
    //   filter.status = 'Approved';
    // }


    const bikes = await SellBike.find(filter)
      .sort({ createdAt: -1 })
      .limit(20); // you can add pagination later

    res.json({
      success: true,
      count: bikes.length,
      data: bikes
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bike listings",
      error: error.message
    });
  }
};

// GET - Get single bike detail
const getBikeById = async (req, res) => {
  try {
    const bike = await SellBike.findById(req.params.id);

    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike listing not found"
      });
    }

    res.json({
      success: true,
      data: bike
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }

};

// (Optional) For admin later
const updateBikeStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const bike = await SellBike.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    res.json({
      success: true,
      message: `Status updated to ${status}`,
      data: bike
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating status",
      error: error.message
    });
  }
};

module.exports = {
  createBikeListing,
  getAllBikeListings,
  getBikeById,
  updateBikeStatus
};