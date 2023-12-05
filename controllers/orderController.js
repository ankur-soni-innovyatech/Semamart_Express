const Order = require('../models/order');

exports.getOrder = async (req, res) => {
  try {

    const orders = await Order.find();

    if (!orders || !orders.length ) {
      return res.status(404).send({ message: 'No orders found' });
    }
    res.status(200).send(orders);
  } 
  catch (err) {
    res.status(500).send(err);
  }};

exports.addOrder = async (req, res) => {
  try {
  const newOrder = new Order({
    user: req.body.user,
    orderItems: req.body.orderItems,
    paymentMethod: req.body.paymentMethod,
    paymentResult: req.body.paymentResult,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
    isPaid: req.body.isPaid,
    paidAt: req.body.paidAt,
    isDelivered: req.body.isDelivered,
    deliveredAt: req.body.deliveredAt,
    });
  
      const savedOrder = await newOrder.save();
      res.status(200).send(savedOrder);
    } 
    catch (err) {
      res.status(500).send(err);
    }}; 