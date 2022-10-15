const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const componentsRouter = require('./components');
const productsRouter = require('./products')
const userRouter = require('./users')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/components', componentsRouter)
router.use('/products', productsRouter)
router.use('/users', userRouter)
router.use('/',(req,res)=>{
  res.send("TU PC IDEAL")
})

module.exports = router;
