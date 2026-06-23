const expressAsyncHandler = require("express-async-handler");
const { paypal, client } = require("../config/paypal");
const Property = require("../models/Property");

const createOrder = expressAsyncHandler(async (req, res) => {
  const { plan } = req.body;

  const amount = plan === "featured" ? "20.00" : "5.00";

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "EUR",
          value: amount,
        },
        description:
          plan === "featured"
            ? "NexEstate - Istaknuti oglas (30 dana)"
            : "NexEstate - Osnovni oglas",
      },
    ],
  });

  const order = await client.execute(request);
  res.json({ orderID: order.result.id });
});

const captureOrder = expressAsyncHandler(async (req, res) => {
  const { orderID, plan, propertyData } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  const capture = await client.execute(request);

  if (capture.result.status === "COMPLETED") {
    const isFeatured = plan === "featured";
    const featuredUntil = isFeatured
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      : null;

    const property = await Property.create({
      ...propertyData,
      isFeatured,
      featuredUntil,
      owner: req.user._id,
    });

    res.json({ success: true, propertyId: property._id });
  } else {
    res.status(400);
    throw new Error("Plaćanje nije uspelo");
  }
});

module.exports = { createOrder, captureOrder };