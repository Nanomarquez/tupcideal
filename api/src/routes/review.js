const { Router } = require('express');
const router = Router();
const { Review, Product} = require('../db.js');

router.get('/:productId', async (req,res) => {
    const { productId } = req.params;
    const productReview = await Review.findAll({
        include: [{
            model: Product,
            where: { id : [productId] }
        }]
    })
    res.send(productReview)
});

module.exports = router;