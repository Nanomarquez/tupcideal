const { Router } = require("express");
const mercadopago = require("mercadopago");
const { DatabaseError, UUID } = require("sequelize");
const router = Router();
const { Purchase, WareHouse, User } = require("../db.js");
const payProducts = require("../funciones/payProducts");
const sendMailMP = require("../funciones/sendMailMP");

router.post("/notification", async (req, res) => {
  const { query } = req;
  const topic = query.topic;

  var merchantOrder;
  var purchase;

  switch (topic) {
    case "payment":
      const paymentId = query.id;
      const payment = await mercadopago.payment.findById(paymentId);

      merchantOrder = await mercadopago.merchant_orders.findById(
        payment.body.order.id
      );

      purchase = await Purchase.findOne({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id],
        },
      });

      if (purchase && purchase.status === "Pending") {
        if (merchantOrder.body.payments[0].status === "approved") {
          purchase.status = "Paid";
          purchase.mp_payment_id = paymentId;
          await purchase.save();
        
          const sellers = [];
          merchantOrder.body.items.forEach(async i => {
            const product = await WareHouse.findByPk(i.id);
            purchase.addWareHouse(product)
            product.cantidad = product.cantidad - i.quantity;
            await product.save();
            sellers.push(product.SellerId.toString())
          });
          
          setTimeout(()=> {
            const unicos = sellers.filter((id, index) => sellers.indexOf(id)===index);
            unicos.map(s => purchase.addSeller(s))
          },1000);

          sendMailMP(merchantOrder, "success");

          res.status(200).send(merchantOrder);
        } else if (merchantOrder.body.payments[0].status === "cancelled") {
          purchase.status = "Canceled";
          purchase.mp_payment_id = paymentId;
          await purchase.save();
          sendMailMP(merchantOrder, "cancelled");
          res.status(200).send(merchantOrder);
        }
      }

      break;

    case "merchant_order":
      const orderId = query.id;
      merchantOrder = await mercadopago.merchant_orders.findById(orderId);

      purchase = await Purchase.findOrCreate({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id],
          totalprice: [merchantOrder.body.total_amount],
        },
      });

      purchase = await Purchase.findOne({
        where: {
          mp_merchantOrder_id: [merchantOrder.body.id],
        },
      });

      const user = await User.findOne({
        where: { email: merchantOrder.body.additional_info },
      });

      await purchase.setUser(user);

      //sendMailMP(merchantOrder, 'pending');

      res.status(200).send(merchantOrder);
      break;
  }
});

router.post("/", payProducts);

module.exports = router;
