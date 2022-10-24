const { Router } = require("express");
const router = Router();
const { Seller, Product, WareHouse } = require("../db.js");




//Create User
//------- PEDIR TODOS LOS PRODUCTOS Y VENDEDORES A LA BD--------
router.get("/", async (req, res) => {
  const {SellerId} = req.query
  try {
    let ware;
    ware = await WareHouse.findAll({
      include: [
        {
          model: Seller,
          attributes: ["store_name", "adress", "id", "email", "adress"],
        },
        {
          model: Product,
          attributes: [
            "categories",
            "name",
            "rating",
            "rating_count",
            "image",
            "id_table",
          ],
        },
      ],
      attributes: ["precio", "cantidad", "id"],
    });
    // console.log(ware);
    if (SellerId) {
      res.send(ware.filter(w => w.Seller.id == SellerId))
    } else {
      res.status(200).json(ware);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//------- POST A ALMACEN--------
router.post("/", async (req, res) => {
  const { precio, cantidad, id_vendedor, id_producto } = req.body;
  try {
    const [product, created] = await WareHouse.findOrCreate({
      where: {
        precio: precio,
        cantidad: cantidad,
        SellerId: id_vendedor,
        ProductId: id_producto
      },
    });
    if (created) {
      console.log("Product created successfully");
      res.status(200).json(product);
    } else {
      res.status(200).json([{error:"The product can't be created"}]);
    }
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

//--------------------PUT  UN PRODUCTO DEL ALMACEN--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad, precio } = req.body;
    const editedProduct = await WareHouse.update(
      {
        cantidad: cantidad,
        precio: precio,
      },
      { where: { id: id } }
    );
    res.json(editedProduct);
  } catch (err) {
    res.status(500).send({
      message: "Product not found",
    });
  }
});

module.exports = router;
