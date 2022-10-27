require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        {
          logging: false, // set to console.log to see the raw SQL queries
          native: false, // lets Sequelize know we can use pg-native for ~30% more speed
        }
      );

//postgres://tupcideal_api_user:KFHE3ZJeeTdvfEcBS14GUrEwYtAzsv3E@dpg-cd8u5lqrrk0a86rqejpg-a/tupcideal_api

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  Review,
  Admin,
  Seller,
  Product,
  Case,
  CPU,
  InternalHardDrive,
  Memory,
  Motherboard,
  Payment,
  Purchase,
  PowerSupply,
  VideoCard,
  WareHouse,
} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
User.hasMany(Review);
Review.belongsTo(User);

// Product.hasMany(Review);
// Review.belongsTo(Product);

User.hasMany(Purchase);
Purchase.belongsTo(User);

Purchase.belongsToMany(WareHouse, { through: "Purchase_WareHouse" });
WareHouse.belongsToMany(Purchase, { through: "Purchase_WareHouse" });

Seller.hasMany(WareHouse);
WareHouse.belongsTo(Seller);

Product.hasMany(WareHouse);
WareHouse.belongsTo(Product);

WareHouse.hasMany(Review);
Review.belongsTo(WareHouse);

// Seller.belongsToMany(Product, { through: "Seller_Product" });
// Product.belongsToMany(Seller, { through: "Seller_Product" });

// Product.hasMany(Case, { as: "case", foreignKey: "produId" });
// Case.belongsTo(Product, { as: "produ" });

// Product.hasMany(CPU, { as: "cpu", foreignKey: "produId" });
// CPU.belongsTo(Product, { as: "produ" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
