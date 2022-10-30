const {Case, CPU, InternalHardDrive, Memory, Motherboard, PowerSupply, VideoCard} = require('../db');

const excludeAttributes = ['id', 'rating', 'rating_count', 'price_usd', 'image', 'price_/_gb'];

const getComponentData = async (tableName, idTable) => {
    switch(tableName) {
        case "Case": {
            return await Case.findByPk(idTable, {
                attributes: {
                    exclude: excludeAttributes
                }
            });
        }
        case "CPU": {
            return await CPU.findByPk(idTable, {
                attributes: {
                    exclude: excludeAttributes
                }
            });
        }
        case "InternalHardDrive": {
            return await InternalHardDrive.findByPk(idTable, {
                attributes: {
                    exclude: excludeAttributes
                }
            });
        }
        case "Memory": {
            return await Memory.findByPk(idTable, {
                attributes: {
                    exclude: excludeAttributes
                }
            });
        }
        case "Motherboard": {
            return await Motherboard.findByPk(idTable, {
                attributes: {
                    exclude: excludeAttributes
                }
            });
        }
        case "PowerSupply": {
            return await PowerSupply.findByPk(idTable, {
                attributes: {
                    exclude: excludeAttributes
                }
            });
        }
        case "VideoCard": {
            return await VideoCard.findByPk(idTable, {
                attributes: {
                    exclude: excludeAttributes
                }
            });
        }
    }
};

module.exports = getComponentData;