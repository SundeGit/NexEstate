const expressAsyncHandler = require("express-async-handler");
const { paypal, client } = require("../config/paypal");
const Property = require("../models/Property");

const createOrder = expressAsyncHandler(async (req, res) => {
  const { propertyId, plan } = req.body;

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
  const { orderID, propertyId, plan } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  const capture = await client.execute(request);

  if (capture.result.status === "COMPLETED") {
    if (plan === "featured") {
      const featuredUntil = new Date();
      featuredUntil.setDate(featuredUntil.getDate() + 30);

      await Property.findByIdAndUpdate(propertyId, {
        isFeatured: true,
        featuredUntil,
      });
    }

    res.json({ success: true, status: capture.result.status });
  } else {
    res.status(400);
    throw new Error("Plaćanje nije uspelo");
  }
});

module.exports = { createOrder, captureOrder };