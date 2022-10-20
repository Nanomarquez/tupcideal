const { Router } = require('express');
const router = Router();
const { Op } = require("sequelize");
const { CPU, Memory, PowerSupply, Motherboard, Case, InternalHardDrive, VideoCard } = require('../db.js');

router.get('/cpu', async (req, res) => {
    const brand = req.query.brand;
  
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

router.get('/memory', async (req, res) => {
    const search = req.query.search;
    
    if(search) {
        const filteredMemory = await Memory.findAll({
            where: {
                [Op.or]:
                [   { name: {
                    [Op.iLike]: `%${search}%`
                }}, { speed: {
                    [Op.iLike]: `%${search}%`
                }}],
            }
        });
        res.send(filteredMemory);
    } else {
        res.send(await Memory.findAll())
    };
});

router.get('/powerSupply', async (req, res) => {
    const search = req.query.search;
    
    if(search) {
        const filteredPowerSupply = await PowerSupply.findAll({
            where: {
                [Op.or]:
                [   { name: {
                    [Op.iLike]: `%${search}%`
                }}, { form_factor: {
                    [Op.iLike]: `%${search}%`
                }}, { efficiency_rating: {
                    [Op.iLike]: `%${search}%`
                }}, { wattage: {
                    [Op.iLike]: `%${search}%`
                }}],
            }
        });
        res.send(filteredPowerSupply);
    } else {
        res.send(await PowerSupply.findAll())
    };
});

router.get('/motherboard', async (req, res) => {
    const search = req.query.search;
    
    if(search) {
        const filteredMotherboard = await Motherboard.findAll({
            where: {
                [Op.or]:
                [   { name: {
                    [Op.iLike]: `%${search}%`
                }}, { 'socket_/_cpu': {
                    [Op.iLike]: `%${search}%`
                }}, { form_factor: {
                    [Op.iLike]: `%${search}%`
                }}, { memory_max: {
                    [Op.iLike]: `%${search}%`
                }}, { memory_slots: {
                    [Op.iLike]: `%${search}%`
                }}],
            }
        });
        res.send(filteredMotherboard);
    } else {
        res.send(await Motherboard.findAll())
    };
});

router.get('/case', async (req, res) => {
    const search = req.query.search;
    
    if(search) {
        const filteredCase = await Case.findAll({
            where: {
                [Op.or]:
                [   { name: {
                    [Op.iLike]: `%${search}%`
                }}, { type: {
                    [Op.iLike]: `%${search}%`
                }}, { 'power_supply': {
                    [Op.iLike]: `%${search}%`
                }}],
            }
        });
        res.send(filteredCase);
    } else {
        res.send(await Case.findAll())
    };
});

router.get('/internalHardDrive', async (req, res) => {
    const search = req.query.search;
    
    if(search) {
        const filteredInternalHardDrive = await InternalHardDrive.findAll({
            where: {
                [Op.or]:
                [   { name: {
                    [Op.iLike]: `%${search}%`
                }}, { capacity: {
                    [Op.iLike]: `%${search}%`
                }}, { type: {
                    [Op.iLike]: `%${search}%`
                }}, { 'form_factor': {
                    [Op.iLike]: `%${search}%`
                }}, { interface: {
                    [Op.iLike]: `%${search}%`
                }}],
            }
        });
        res.send(filteredInternalHardDrive);
    } else {
        res.send(await InternalHardDrive.findAll())
    };
});

router.get('/gpu', async (req, res) => {
    const search = req.query.search;

    if(search) {
        const searchGPU = await VideoCard.findAll({
            where: {
                [Op.or]: [{ name: {
                    [Op.iLike]: `%${search}%`
                } }, { chipset: {
                    [Op.iLike]: `%${search}%`
                } }],
            }
        });
        res.send(searchGPU);
    } else {
        res.send(await VideoCard.findAll());
    };
})

module.exports = router;