const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { CPU, Memory, PowerSupply, Motherboard, Case, InternalHardDrive, VideoCard } = require('./src/db');
const bulkCPU = require('./src/data/cpu.json');
const bulkGPU = require('./src/data/video-card.json');
const bulkMemory = require('./src/data/memory.json');
const bulkPowerSupply = require('./src/data/power-supply.json');
const bulkMotherboard = require('./src/data/motherboard.json');
const bulkCase = require('./src/data/case.json');
const bulkInternalHardDrive = require('./src/data/internal-hard-drive.json')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    await CPU.bulkCreate(bulkCPU);
    await Memory.bulkCreate(bulkMemory);
    await PowerSupply.bulkCreate(bulkPowerSupply);
    await Motherboard.bulkCreate(bulkMotherboard);
    await Case.bulkCreate(bulkCase);
    await InternalHardDrive.bulkCreate(bulkInternalHardDrive);
    await VideoCard.bulkCreate(bulkGPU);
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
