const {mercadopago} = require("../mercadoPago.js");
const {User,Product } = require("../db");
//const { preferences } = require("mercadopago");


const payProducts = async (req, res) =>{
  
    const data = req.body;
    console.log(data)
    const user = await User.findOne({
        where:{ email : data.email
        },
})
    console.log(user);
    const phone = user.phone_number
    const adress = user.adress
    const productos = [];
    
     data.cart.map(p => { 
        productos.push({
            picture_url: p.image,
            title: p.name,
            unit_price: p.price_usd,
            quantity: 1,
        })
    })

    console.log(productos);
    
    let suma = 0;
    for(let i = 0; i< productos.length; i++){
        suma =  suma + productos[i].unit_price;
        console.log(suma);
    };
 
    let preference = {
        transaction_amount: parseInt(suma*1.15), 
        net_amount: parseInt(suma*1.15)*0.968-800,
        taxes:[{
            type:"IVA",
            value: parseInt(suma*1.15)-parseInt(suma*1.15)*0.968-800,
                        
        }],
        binary_mode: true,
         payer:{
            name: user.name,
            surname: user.last_name,
            email: user.email,
            adress: {adress},
            phone: {phone},
            },
        shipment:{
               receiver_adress:{ 
                zip_code: data.zip_code,
                street_number: data.street_number,
                street_name: data.street_name,
                floor: data.floor,
                apartment: data.apartment
               }},
        adittional_info: data.addInfo,
        items: productos,
        
      
        back_urls:{
          //definir las verdaderas aca
            success: "https://www.success.com",
            failure: "http://www.failure.com",
            pending: "http://www.pending.com"
            } , 
        auto_return: "approved",  
        };
    
    mercadopago.preferences.create(preference)
    //le pasamos las preference que definimos de linea 35 a 72
    .then(function(response){
        console.log(response);
        res.send( response.body.init_point
       
        //este id es el id de la compra, que mandamos al front para que reenvie a MercadoPago
     )
     })
     .catch(function(error){
        console.log(error)  
    })

    }

    module.exports = payProducts