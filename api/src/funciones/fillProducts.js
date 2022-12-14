const { Seller, Product, WareHouse } = require("../db");
const caseData = require("../data/case.json");
const cpuData = require("../data/cpu.json");
const internalData = require("../data/internal-hard-drive.json");
const memoryData = require("../data/memory.json");
const motherData = require("../data/motherboard.json");
const powerData = require("../data/power-supply.json");
const videoData = require("../data/video-card.json");
const sellers = require("../data/sellers.json");
const ware = require("../data/warehouse.json");

async function fillProduct() {
  // ------------ MAPEO CASES -------------
  const cases = caseData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      rating: e.rating,
      rating_count: e.rating_count,
      price_usd: e.price_usd,
    };
  });
  //--------Llenado de la tabla--------
  cases.forEach(async (e) => {
    await Product.findOrCreate({
      where: {
        name: e.name,
        image: e.image,
        categories: "cases",
        price_usd: e.price_usd,
        rating: e.rating,
        rating_count: e.rating_count,
        id_table: e.id,
      },
    });
  });

  // ------------ MAPEO CPU -------------
  const cpus = cpuData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      rating: e.rating,
      rating_count: e.rating_count,
      price_usd: e.price_usd,
    };
  });
  //   //--------Llenado de la tabla--------
  cpus.forEach(async (e) => {
    await Product.findOrCreate({
      where: {
        name: e.name,
        image: e.image,
        categories: "cpu",
        rating: e.rating,
        rating_count: e.rating_count,
        price_usd: e.price_usd,
        id_table: e.id,
      },
    });
  });

  // ------------ MAPEO INTERNAL-HARD-DRIVE -------------
  const internal = internalData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      rating: e.rating,
      rating_count: e.rating_count,
      price_usd: e.price_usd,
    };
  });
  //--------Llenado de la tabla--------
  internal.forEach(async (e) => {
    await Product.findOrCreate({
      where: {
        name: e.name,
        image: e.image,
        categories: "internal",
        rating: e.rating,
        rating_count: e.rating_count,
        price_usd: e.price_usd,
        id_table: e.id,
      },
    });
  });

  // ------------ MAPEO MEMORY -------------
  const memory = memoryData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      rating: e.rating,
      rating_count: e.rating_count,
      price_usd: e.price_usd,
    };
  });
  //--------Llenado de la tabla--------
  memory.forEach(async (e) => {
    await Product.findOrCreate({
      where: {
        name: e.name,
        image: e.image,
        categories: "memory",
        rating: e.rating,
        rating_count: e.rating_count,
        price_usd: e.price_usd,
        id_table: e.id,
      },
    });
  });

  // ------------ MAPEO MOTHER BOARD -------------
  const mother = motherData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      rating: e.rating,
      rating_count: e.rating_count,
      price_usd: e.price_usd,
    };
  });
  //--------Llenado de la tabla--------
  mother.forEach(async (e) => {
    await Product.findOrCreate({
      where: {
        name: e.name,
        image: e.image,
        categories: "mother",
        rating: e.rating,
        rating_count: e.rating_count,
        price_usd: e.price_usd,
        id_table: e.id,
      },
    });
  });

  // ------------ MAPEO POER SUPPLY -------------
  const power = powerData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      rating: e.rating,
      rating_count: e.rating_count,
      price_usd: e.price_usd,
    };
  });
  //--------Llenado de la tabla--------
  power.forEach(async (e) => {
    await Product.findOrCreate({
      where: {
        name: e.name,
        image: e.image,
        categories: "power",
        rating: e.rating,
        rating_count: e.rating_count,
        price_usd: e.price_usd,
        id_table: e.id,
      },
    });
  });

  // ------------ MAPEO VIDEO CARD -------------
  const video = videoData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      rating: e.rating,
      rating_count: e.rating_count,
      price_usd: e.price_usd,
    };
  });
  //--------Llenado de la tabla--------
  video.forEach(async (e) => {
    await Product.findOrCreate({
      where: {
        name: e.name,
        image: e.image,
        categories: "videocard",
        rating: e.rating,
        rating_count: e.rating_count,
        price_usd: e.price_usd,
        id_table: e.id,
      },
    });
  });

  // ------------ MAPEO Seller -------------
  const seller = sellers.map((e) => {
    return {
      store_name: e.store_name,
      address: e.address,
      email: e.email,
      phone_number: e.phone_number,
    };
  });
  //--------Llenado de la tabla--------
  seller.forEach(async (e) => {
    await Seller.findOrCreate({
      where: {
        store_name: e.store_name,
        adress: e.address,
        email: e.email,
        phone_number: e.phone_number,
      },
    });
  });

  // ------------ MAPEO Warehouse -------------
  const Warehouses = ware.map((e) => {
    return {
      precio: e.precio,
      cantidad: e.cantidad,
    };
  });
  //--------Llenado de la tabla--------
  Warehouses.forEach(async (e) => {
    await WareHouse.findOrCreate({
      where: {
        precio: e.precio,
        cantidad: e.cantidad,
      },
    });
  });
}

module.exports = fillProduct;
