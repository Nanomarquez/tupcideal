const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const warehouseRouter = require("./warehouse.js");
const videocardRouter = require("./videocard.js");
const componentsRouter = require("./components");
const internalRouter = require("./internal.js");
const sellersRouter = require("./sellers.js");
const productsRouter = require("./products");
const adminsRouter = require("./admins.js");
const reviewRouter = require("./review.js");
const memoryRouter = require("./memory.js");
const motherRouter = require("./mother.js");
const powerRouter = require("./power.js");
const usersRouter = require("./users.js");
const casesRouter = require("./case.js");
const cpuRouter = require("./cpu.js");
const purchaseRouter = require("./purchase.js");
const paymentRouter = require("./payment.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/components", componentsRouter);
router.use("/videocard", videocardRouter);
router.use("/warehouse", warehouseRouter);
// router.use("/purchase", purchaseRouter);
router.use("/internal", internalRouter);
router.use("/products", productsRouter);
router.use("/sellers", sellersRouter);
router.use("/payment", paymentRouter);
router.use("/admins", adminsRouter);
router.use("/review", reviewRouter);
router.use("/memory", memoryRouter);
router.use("/mother", motherRouter);
router.use("/users", usersRouter);
router.use("/power", powerRouter);
router.use("/cases", casesRouter);
router.use("/cpu", cpuRouter);


router.use("/", (req, res) => {
  res.send("TU PC IDEAL");
});

module.exports = router;
