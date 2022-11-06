const { Router } = require("express");
const router = Router();
const { Review, WareHouse, User , Product } = require("../db.js");

router.get("/product/:productId", async (req, res) => {
  const { productId } = req.params;
  const productReview = await Review.findAll({
    include: [
      {
        model: WareHouse,
        where: { id: [productId] },
      },
      {
        model: User,
        attributes: ["email"],
      },
    ],
  });
  res.send(productReview);
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const userReview = await Review.findAll({
    include: [
      {
        model: User,
        where: { id: [userId] },
      },
      {
        model: WareHouse,
        include: [
          {
            model: Product
          }
        ]
      },
    ],
  });
  res.send(userReview);
});

router.post("/", async (req, res) => {
  const { ProductId, rating, comment, UserId } = req.body;
  if (ProductId) {
    try {
      const newReview = await Review.create({
        rating: rating,
        comment: comment,
        WareHouseId: ProductId,
        UserId: UserId,
      });
      res.status(201).send(newReview);
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  } else {
    res
      .status(400)
      .send({
        err: "Es necesario que puntues el producto para guardar tu review",
      });
  }
});

router.put("/:id", async (req, res) => {
  const { rating, comment } = req.body;
  const id = req.params.id;
  if (rating) {
    try {
      const review = await Review.findByPk(id);
      review.rating = rating;
      review.comment = comment;
      await review.save();
      res.status(201).send(review);
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  } else {
    res
      .status(400)
      .send({
        err: "Es necesario que puntues el producto para guardar tu review",
      });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteReview = await Review.findOne({
      where: { id: id },
    });
    await deleteReview.destroy();
    res.status(200).send({ message: "Review eliminada con éxito" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;

