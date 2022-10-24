require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const fillProduct = require("../api/src/funciones/fillProducts");
const {
  CPU,
  Memory,
  PowerSupply,
  Motherboard,
  Case,
  InternalHardDrive,
  VideoCard,
  Seller,
  WareHouse,
  Product,
} = require("./src/db");
const bulkCPU = require("./src/data/cpu.json");
const bulkGPU = require("./src/data/video-card.json");
const bulkMemory = require("./src/data/memory.json");
const bulkPowerSupply = require("./src/data/power-supply.json");
const bulkMotherboard = require("./src/data/motherboard.json");
const bulkCase = require("./src/data/case.json");
const bulkInternalHardDrive = require("./src/data/internal-hard-drive.json");
const bulkSellers = require("./src/data/sellers.json");
const bulkWareHouse = require("./src/data/WareHouses.json");
//const bulkWareHouse = require("./src/data/warehouse.json");
const bulkProducts = require("./src/data/products.json");

const user = CPU.findAll();
var setter;
if (user === []) {
  setter = true;
} else {
  setter = false;
}

// Syncing all the models at once.

conn.sync({ force: setter }).then(() => {
  server.listen(3001, async () => {
    if (setter === true) {
      await CPU.bulkCreate(bulkCPU);
      console.log("✓ Se llenó la tabla CPU con la data del json");
      await Memory.bulkCreate(bulkMemory);
      console.log("✓ Se llenó la tabla Memory con la data del json");
      await PowerSupply.bulkCreate(bulkPowerSupply);
      console.log("✓ Se llenó la tabla PowerSupply con la data del json");
      await Motherboard.bulkCreate(bulkMotherboard);
      console.log("✓ Se llenó la tabla Motherboard con la data del json");
      await Case.bulkCreate(bulkCase);
      console.log("✓ Se llenó la tabla Case con la data del json");
      await InternalHardDrive.bulkCreate(bulkInternalHardDrive);
      console.log("✓ Se llenó la tabla InternalHardDrive con la data del json");
      await VideoCard.bulkCreate(bulkGPU);
      console.log("✓ Se llenó la tabla VideoCard con la data del json");

      await Product.bulkCreate(bulkProducts);
      console.log("✓ Se llenó la tabla Products");

      await Seller.bulkCreate(bulkSellers);
      console.log("✓ Se llenó la tabla Seller con la data del json");
      await WareHouse.bulkCreate(bulkWareHouse);
      console.log("✓ Se llenó la tabla WareHouse con la data del json");
      console.log(`⇒ listening at port ${process.env.PORT}`); // eslint-disable-line no-console
    } else {
      console.log(`⇒ listening at port ${process.env.PORT}`); // eslint-disable-line no-console
    }
  });
});
