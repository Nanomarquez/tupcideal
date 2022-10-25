const { Router } = require("express");
const router = Router();
const { Seller, Product, WareHouse } = require("../db.js");

//Create User
//------- PEDIR TODOS LOS PRODUCTOS Y VENDEDORES A LA BD--------
router.get("/", async (req, res) => {
  const { brand, category } = req.query;
  let response = []
  try {
    let ware;
    console.log("estoy dentro");
    ware = await WareHouse.findAll({
      include: [
        {
          model: Seller,
          attributes: ["store_name", "adress", "id", "email", "adress"],
        },
        {
          model: Product,
          attributes: [
            "id",
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
    response = ware;
    brand ? response = response.filter(p => p.Product.name.includes(brand)) : null;
    category ? response = response.filter(p => p.Product.categories === category): null;
    res.send(response);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.get('/product/:Product_id', async (req, res) => {
  const {Product_id} = req.params;

  try {
    const products = await WareHouse.findAll({
      where: {ProductId :[Product_id]},
      include: [
        {
          model: Seller,
          attributes: ["store_name", "adress", "id", "email", "adress"],
        },
        {
          model: Product,
          attributes: [
            "id",
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
    })
    res.send(products);
  } catch (err) {
    res.send({error: err.message})
  }
});

router.get('/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const product = await WareHouse.findByPk(id,{
    include: [
      {
        model: Seller,
        attributes: ["store_name", "adress", "id", "email", "adress"],
      },
      {
        model: Product,
        attributes: [
          "id",
          "categories",
          "name",
          "rating",
          "rating_count",
          "image",
          "id_table",
        ],
      },
    ],
    attributes: ["precio", "cantidad", "id"]
    });
   res.send(product);
  } catch (err) {
    res.status(500).send({error: err.message});
  };
}); 

router.get('/')


//------- POST A ALMACEN--------
router.post("/", async (req, res) => {
  const { precio, cantidad, id_vendedor, id_producto } = req.body;
  try {
    const [product, created] = await WareHouse.findOrCreate({
      where: {
        precio: precio,
        cantidad: cantidad,
        SellerId: id_vendedor,
        ProductId: id_producto,
      },
    });
    if (created) {
      console.log("Product created successfully");
      res.status(200).json(product);
    } else {
      res.status(200).json([{ error: "The product can't be created" }]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
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
      message: err.message,
    });
  }
});

module.exports = router;
