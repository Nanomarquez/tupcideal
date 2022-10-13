const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('components route')
})

module.exports = router;