const mongoose = require('mongoose');
const { Schema } = mongoose;


function arrayLimit(val) {
  return val.length <= 5;
}

const sellBikeSchema = new Schema(
  {
    bikeName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1900,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    mileage: {
      type: Number,
      required: true,
      min: 0,
    },
    condition: {
      type: String,
      required: true,
      enum: ['New', 'Like New', 'Good', 'Fair', 'Poor', 'Excellent'],
    },
    engineCC: {
      type: Number,
      required: true,
      min: 50,
    },
    fuelType: {
      type: String,
      required: true,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    },
    color: {
      type: String,
      required: true,
      maxlength: 30,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500,
    },
    contactNumber: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 15,
    },
    location: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    images: {
      type: [String],
      validate: [arrayLimit, 'Maximum 5 images allowed'],
      default: [],
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    }
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('SellBike', sellBikeSchema);
