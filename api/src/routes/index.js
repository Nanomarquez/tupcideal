const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const componentsRouter = require("./components");
const productsRouter = require("./products");
const usersRouter = require("./users.js");
const sellersRouter = require("./sellers.js");
const adminsRouter = require("./admins.js")
const reviewRouter = require('./review.js')
const casesRouter = require("./case.js");
const cpuRouter = require("./cpu.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/components", componentsRouter);
router.use("/products", productsRouter);
router.use("/users", usersRouter);
router.use("/sellers", sellersRouter);
router.use("/admins", adminsRouter);
router.use('/review', reviewRouter);
router.use("/cases", casesRouter);
router.use("/cpu", cpuRouter);

router.use("/", (req, res) => {
  res.send("TU PC IDEAL");
});

module.exports = router;
