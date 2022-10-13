const { Router } = require('express');
const router = Router();
const { Op } = require("sequelize");
const { CPU } = require('../db.js');
const bulkCPU = require('../data/cpu.json')

router.get('/cpu', async (req, res) => {
    const brand = req.query.brand;

    allCPU = await CPU.findAll();
    !allCPU.length ? CPU.bulkCreate(bulkCPU) : null;
    

    if(brand) {
        const filteredCPU = await CPU.findAll({
            where: {
                name: {
                    [Op.iLike]: `${brand}%`
                }
            }
        });

        res.send(filteredCPU);
    } else {
        res.send(await CPU.findAll())
    };
});

module.exports = router;