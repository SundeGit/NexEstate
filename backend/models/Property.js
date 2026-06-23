const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["stan", "kuca", "vikendica", "garaza", "plac", "poslovni-prostor"],
      required: true,
    },
    rooms: {
      type: Number,
      required: false,
    },
    area: {
      type: Number,
      required: true,
    },
    floor: {
      type: String,
      default: 0,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    elevator: {
      type: Boolean,
      default: false,
    },
    videoSurveillance: {
      type: Boolean,
      default: false,
    },
    heating: [
      {
        type: String,
        enum: ["Podno", "Centralno", "Etažno", "Toplotna pumpa", "Klima", "Gas", "Struja", "Ostalo"],
      },
    ],
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    images: [
      {
        type: String,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    featuredUntil: {
      type: Date,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);