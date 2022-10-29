const {Case, CPU, InternalHardDrive, Memory, Motherboard, PowerSupply, VideoCard} = require('../db');

const getComponentData = async (tableName, idTable) => {
    switch(tableName) {
        case "Case": {
            return await Case.findByPk(idTable, {
                attributes: {
                    exclude: ['id', 'rating', 'rating_count', 'price_usd', 'image']
                }
            });
        }
        case "CPU": {
            return await CPU.findByPk(idTable, {
                attributes: {
                    exclude: ['id', 'rating', 'rating_count', 'price_usd', 'image']
                }
            });
        }
        case "InternalHardDrive": {
            return await InternalHardDrive.findByPk(idTable, {
                attributes: {
                    exclude: ['id', 'rating', 'rating_count', 'price_usd', 'image']
                }
            });
        }
        case "Memory": {
            return await Memory.findByPk(idTable, {
                attributes: {
                    exclude: ['id', 'rating', 'rating_count', 'price_usd', 'image']
                }
            });
        }
        case "Motherboard": {
            return await Motherboard.findByPk(idTable, {
                attributes: {
                    exclude: ['id', 'rating', 'rating_count', 'price_usd', 'image']
                }
            });
        }
        case "PowerSupply": {
            return await PowerSupply.findByPk(idTable, {
                attributes: {
                    exclude: ['id', 'rating', 'rating_count', 'price_usd', 'image']
                }
            });
        }
        case "VideoCard": {
            return await VideoCard.findByPk(idTable, {
                attributes: {
                    exclude: ['id', 'rating', 'rating_count', 'price_usd', 'image']
                }
            });
        }
    }
};

module.exports = getComponentData;