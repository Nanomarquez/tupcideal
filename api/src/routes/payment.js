const { Router } = require("express");
const router = Router();
const { Purchase, User, Product } = require("../db.js");
const  payProducts = require('../funciones/payProducts')



router.post("/", payProducts)



module.exports = router;