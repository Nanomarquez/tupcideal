const mercadopago = require("mercadopago");
require("dotenv").config();

mercadopago.configure({
    access_token : process.env.ACCES_TOKEN,
    })

  
    module.exports = {mercadopago};