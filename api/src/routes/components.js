const { Router } = require('express');
const router = Router();
const { Op } = require("sequelize");
const { CPU, VideoCard } = require('../db.js');
const bulkCPU = require('../data/cpu.json');
const bulkGPU = require('../data/video-card.json')

router.get('/cpu', async (req, res) => {
    const brand = req.query.brand;

    const allCPU = await CPU.findAll();
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


router.get('/gpu', async (req, res) => {

    const search = req.query.search;
    
    const allGPU = await VideoCard.findAll();
    !allGPU.length ? await VideoCard.bulkCreate(bulkGPU) : null;

    if(search) {
        const searchGPU = await VideoCard.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${search}%`
                }
            }
        });
        res.send(searchGPU);
        return
    } 

    res.send(await VideoCard.findAll());
})
module.exports = router;