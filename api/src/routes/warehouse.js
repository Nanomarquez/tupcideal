const { Router } = require("express");
const router = Router();
const { Seller, Product, WareHouse, Review, User, Case, CPU, InternalHardDrive, Memory, Motherboard, PowerSupply, VideoCard, Op } = require("../db.js");
const getComponentData = require('../funciones/getComponentData.js')
const ratingProm = require("../funciones/ratingProm.js");

//Create User
//------- PEDIR TODOS LOS PRODUCTOS Y VENDEDORES A LA BD--------
router.get("/", async (req, res) => {
  const { brand, category, priceMin, priceMax } = req.query;
  let response = [];
  try {
    let ware;
    ware = await WareHouse.findAll({
      include: [
        { model: Seller,
          attributes: ["store_name", "adress", "id", "email", "adress"],
        },
        { model: Product,
          include:[
            {model: Case,
              attributes: ['name', 'type', 'color', 'power_supply', 'side_panel_window']},
            {model: CPU,
              attributes: ['name', 'core_count', 'core_clock', 'boost_clock', 'tdp', 'integrated_graphics', 'smt', 'socket']},
            {model: InternalHardDrive,
              attributes: ['name', 'capacity', 'type', 'cache', 'form_factor', 'interface']},
            {model: Memory,
              attributes: ['name', 'speed', 'modules', 'color', 'first_word_latency', 'cas_latency']},
            {model: Motherboard,
              attributes: ['name', 'socket_/_cpu', 'form_factor', 'memory_max', 'memory_slots', 'color']},
            {model: PowerSupply,
              attributes: ['name', 'form_factor', 'efficiency_rating', 'wattage', 'modular', 'color']},
            {model: VideoCard,
              attributes: ['name', 'chipset', 'memory', 'core_clock', 'boost_clock', 'color', 'length']}
          ],
          attributes: [ "id", "categories", "name", "image", "id_table"],
        },
        { model: Review,
          include: {
            model: User,
            attributes: ["email"]
          },
          attributes: ["id", "comment", "rating", "UserId"],
        },
      ],
      attributes: ["precio", "cantidad", "id", "ratingProm", "quantity"],
    });
  
    ware.forEach(async w => {
      w.ratingProm = ratingProm(w.Reviews);
      await w.save()
    });

    response = ware;
    
    brand
      ? (response = response.filter((p) => p.Product.name.includes(brand)))
      : null;
    category
      ? (response = response.filter((p) => p.Product.categories === category))
      : null;
    priceMin
      ? (response = response.filter((p) => p.precio >= priceMin))
      : null;
    priceMax
      ? (response = response.filter((p) => p.precio <= priceMax))
      : null;
    res.send(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/product/:Product_id", async (req, res) => {
  const { Product_id } = req.params;

  try {
    const products = await WareHouse.findAll({
      where: { ProductId: [Product_id] },
      include: [
        { model: Seller,
          attributes: ["store_name", "adress", "id", "email", "adress"],
        },
        { model: Product,
          attributes: [ "id", "categories", "name", "image", "id_table"],
        },
        { model: Review,
          attributes: ["id", "comment", "rating", "UserId"],
        },
      ],
      attributes: ["precio", "cantidad", "id", "ratingProm", "quantity"],
    });
    
    products.forEach(async p => {
      p.ratingProm = ratingProm(p.Reviews);
      await p.save()
    });

    res.send(products);
  } catch (err) {
    res.send({ error: err.message });
  }
});
//---PEDIR TODOS LOS PRODUCTOS DE UN SELLER---
router.get("/seller/:SellerId", async (req, res) => {
  const { SellerId } = req.params;

  try {
    const products = await WareHouse.findAll({
      where: { SellerId: [SellerId] },
      include: [
        { model: Seller,
          attributes: ["store_name", "adress", "id", "email", "adress"],
        },
        { model: Product,
          attributes: [ "id", "categories", "name", "image", "id_table"],
        },
        { model: Review,
          attributes: ["id", "comment", "rating", "UserId"],
        },
      ],
      attributes: ["precio", "cantidad", "id", "ratingProm", "quantity"],
    });
    
    products.forEach(async p => {
      p.ratingProm = ratingProm(p.Reviews);
      await p.save()
    });

    res.send(products);
  } catch (err) {
    res.send({ error: err.message });
  }
});


router.get("/seller/:SellerId", async (req, res) => {
  const { SellerId } = req.params;

  try {
    const products = await WareHouse.findAll({
      where: { SellerId: [SellerId] },
      include: [
        { model: Seller,
          attributes: ["store_name", "adress", "id", "email", "adress"],
        },
        { model: Product,
          attributes: [ "id", "categories", "name", "image", "id_table"],
        },
        { model: Review,
          attributes: ["id", "comment", "rating", "UserId"],
        },
      ],
      attributes: ["precio", "cantidad", "id", "ratingProm", "quantity"],
    });
    
    products.forEach(async p => {
      p.ratingProm = ratingProm(p.Reviews);
      await p.save()
    });

    res.send(products);
  } catch (err) {
    res.send({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await WareHouse.findByPk(id, {
      include: [
        { model: Seller,
          attributes: ["store_name", "adress", "id", "email", "adress"],
        },
        { model: Product,
          attributes: [ "id", "categories", "name", "image", "id_table"],
        },
        { model: Review,
          include: {
            model: User,
            attributes: ["email"]
          },
          attributes: ["id", "comment", "rating", "UserId"],
        },
      ],
      attributes: ["precio", "cantidad", "id", "ratingProm", "quantity"],
    });

    product.ratingProm = ratingProm(product.Reviews);
    product.save();

    const componentData = await getComponentData(product.Product.categories, product.Product.id_table);
    
    res.send({...product.dataValues, componentData});
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/");

//------- POST A ALMACEN--------
router.post("/", async (req, res) => {
  const { precio, cantidad, id_vendedor, id_producto } = req.body;
  try {
    const [product, created] = await WareHouse.findOrCreate({
      where: {
        SellerId: id_vendedor,
        ProductId: id_producto,
      },
    });
    if (created) {
      console.log("Product created successfully");
      product.cantidad = cantidad;
      product.precio = precio;
      product.save()
      res.status(200).json(product);
    } else {
      res.status(500).json([{ error: "Producto existente" }]);
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

router.get('/Motherboard/:socket', async (req, res) => {
  const { socket } = req.params;
  
  const products = await WareHouse.findAll({
    include: [{
      model: Product,
      where: {
        categories: "Motherboard",
      },
      attributes: ["id", "categories", "name", "image", "id_table"],
      include: {
        model: Motherboard,
        where: {"socket_/_cpu" : socket},
        attributes: ['name', 'socket_/_cpu', 'form_factor', 'memory_max', 'memory_slots', 'color'],
      }
    },
    {
      model: Seller,
    }]
  });

  res.send(products)
});

router.get('/Memory/:socket', async (req, res) => {
  const { socket } = req.params;
  const memoryType = (socket == "AM3+" || socket == "LGA1150" || socket == "LGA1155") ? 'DDR3': 'DDR4';
  const response = await WareHouse.findAll({
    include: [{
      model: Product,
      where: {
        categories: "Memory",
      },
      attributes: ["id", "categories", "name", "image", "id_table"],
      include: {
        model: Memory,
        where: {speed: {
          [Op.iLike]: `${memoryType}%`
        }},
        attributes: ['name', 'speed', 'modules', 'color', 'first_word_latency', 'cas_latency'],
      }
    },
    {
      model: Seller,
    }]
  })

  res.send(response);
});

module.exports = router;
