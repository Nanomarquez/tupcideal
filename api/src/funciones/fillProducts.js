const { Router } = require("express");
const { Case, Product } = require("../db");
const caseData = require("../data/case.json");
const cpuData = require("../data/cpu.json");
const internalData = require("../data/internal-hard-drive.json");
const memoryData = require("../data/memory.json");
const motherData = require("../data/motherboard.json");
const powerData = require("../data/power-supply.json");
const videoData = require("../data/video-card.json");

async function fillProduct() {
  // ------------ MAPEO CASES -------------
  const cases = caseData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
    };
  });
  //--------Llenado de la tabla--------
  cases.forEach(async (e) => {
    await Product.findOrCreate({
      where: { name: e.name, image: e.image, type: "cases", id_table: e.id },
    });
  });

  // ------------ MAPEO CPU -------------
  const cpus = cpuData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
    };
  });
  //--------Llenado de la tabla--------
  cpus.forEach(async (e) => {
    await Product.findOrCreate({
      where: { name: e.name, image: e.image, type: "cpu", id_table: e.id },
    });
  });

  // ------------ MAPEO INTERNAL-HARD-DRIVE -------------
  const internal = internalData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
    };
  });
  //--------Llenado de la tabla--------
  internal.forEach(async (e) => {
    await Product.findOrCreate({
      where: { name: e.name, image: e.image, type: "internal", id_table: e.id },
    });
  });

  // ------------ MAPEO MEMORY -------------
  const memory = memoryData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
    };
  });
  //--------Llenado de la tabla--------
  memory.forEach(async (e) => {
    await Product.findOrCreate({
      where: { name: e.name, image: e.image, type: "memory", id_table: e.id },
    });
  });

  // ------------ MAPEO MOTHER BOARD -------------
  const mother = motherData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
    };
  });
  //--------Llenado de la tabla--------
  mother.forEach(async (e) => {
    await Product.findOrCreate({
      where: { name: e.name, image: e.image, type: "mother", id_table: e.id },
    });
  });

  // ------------ MAPEO POER SUPPLY -------------
  const power = powerData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
    };
  });
  //--------Llenado de la tabla--------
  power.forEach(async (e) => {
    await Product.findOrCreate({
      where: { name: e.name, image: e.image, type: "power", id_table: e.id },
    });
  });

  // ------------ MAPEO VIDEO CARD -------------
  const video = videoData.map((e) => {
    return {
      id: e.id,
      name: e.name,
      image: e.image,
    };
  });
  //--------Llenado de la tabla--------
  video.forEach(async (e) => {
    await Product.findOrCreate({
      where: { name: e.name, image: e.image, type: "video", id_table: e.id },
    });
  });
}

module.exports = fillProduct;
