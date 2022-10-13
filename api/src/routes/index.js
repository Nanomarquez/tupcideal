const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const componentsRouter = require('./components');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/components', componentsRouter)

router.use('/',(req,res)=>{
  res.send("TU PC IDEAL")
})

module.exports = router;
