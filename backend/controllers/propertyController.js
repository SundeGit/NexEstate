const expressAsyncHandler = require("express-async-handler");
const Property = require("../models/Property");
const geocoder = require("../config/geocoder");

const getProperties = expressAsyncHandler(async (req, res) => {
  const pageSize = 9;
  const page = Number(req.query.page) || 1;

  const filters = {};

  if (req.query.type) filters.type = req.query.type;
  if (req.query.city) filters.city = req.query.city;
  if (req.query.rooms) filters.rooms = Number(req.query.rooms);
  if (req.query.minPrice) filters.price = { $gte: Number(req.query.minPrice) };
  if (req.query.maxPrice)
    filters.price = { ...filters.price, $lte: Number(req.query.maxPrice) };
  if (req.query.minArea) filters.area = { $gte: Number(req.query.minArea) };
  if (req.query.maxArea)
    filters.area = { ...filters.area, $lte: Number(req.query.maxArea) };
  if (req.query.furnished) filters.furnished = req.query.furnished === 'true';
  if (req.query.parking) filters.parking = req.query.parking === 'true';
  if (req.query.elevator) filters.elevator = req.query.elevator === 'true';
  if (req.query.videoSurveillance) filters.videoSurveillance = req.query.videoSurveillance === 'true';
  if (req.query.floor) filters.floor = req.query.floor;
  if (req.query.heating) filters.heating = { $in: req.query.heating.split(',') };

  let sortOption = { createdAt: -1 };
  if (req.query.sort === 'price-asc') sortOption = { price: 1 };
  if (req.query.sort === 'price-desc') sortOption = { price: -1 };
  if (req.query.sort === 'area-asc') sortOption = { area: 1 };
  if (req.query.sort === 'area-desc') sortOption = { area: -1 };

  const count = await Property.countDocuments(filters);
  const properties = await Property.find(filters)
    .populate("owner", "name email avatar")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sortOption);

  res.json({
    properties,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

const getPropertyById = expressAsyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id).populate(
    "owner",
    "name email avatar"
  );

  if (property) {
    res.json(property);
  } else {
    res.status(404);
    throw new Error("Nekretnina nije pronađena");
  }
});

const createProperty = expressAsyncHandler(async (req, res) => {
    const {
        title,
        description,
        price,
        type,
        rooms,
        area,
        floor,
        furnished,
        parking,
        elevator,
        videoSurveillance,
        heating,
        city,
        address,
        isFeatured,
        featuredUntil,
    } = req.body;

    const geoData = await geocoder.geocode(`${address}, ${city}`);
    const coordinates =
        geoData.length > 0
        ? { lat: geoData[0].latitude, lng: geoData[0].longitude }
        : { lat: null, lng: null };

    const images = req.files ? req.files.map((file) => file.path) : [];

    const property = await Property.create({
        title,
        description,
        price,
        type,
        rooms,
        area,
        floor,
        furnished,
        parking,
        elevator,
        videoSurveillance,
        heating,
        city,
        address,
        coordinates,
        images,
        isFeatured: isFeatured === 'true',
        featuredUntil: featuredUntil || null,
        owner: req.user._id,
    });

    res.status(201).json(property);
});

const updateProperty = expressAsyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Nekretnina nije pronađena");
  }

  if (property.owner.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Nije dozvoljeno");
  }

  const updated = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
});

const deleteProperty = expressAsyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Nekretnina nije pronađena");
  }

  if (
    property.owner.toString() !== req.user._id.toString() &&
    !req.user.isAdmin
  ) {
    res.status(401);
    throw new Error("Nije dozvoljeno");
  }

  await property.deleteOne();
  res.json({ message: "Nekretnina obrisana" });
});

const getFeaturedProperties = expressAsyncHandler(async (req, res) => {
  const now = new Date();
  const properties = await Property.find({
    isFeatured: true,
    featuredUntil: { $gte: now },
  }).populate("owner", "name email avatar");

  res.json(properties);
});

const getMyProperties = expressAsyncHandler(async (req, res) => {
  const properties = await Property.find({ owner: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(properties);
});

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getMyProperties,
};