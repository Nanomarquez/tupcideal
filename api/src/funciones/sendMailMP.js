const {sgMail} = require('../services/sendgrid');
const {client} = require('../services/sendgrid');
const { User } = require("../db");

const sendMailMP = async (merchant_order, status) => {

  const request = {};
  let html = '';

  const msg = {
    to: merchant_order.body.additional_info,
    from: 'federicohuertas@outlook.com',
    subject: '',
    html: ''
  };

  
  const itemsHTML = merchant_order.body.items.map(i => {
    return(`
      <div>
        <hr/>
        <h5>${i.title}</h5>
        <h6>Precio unitario: $${i.unit_price}<h6>
        <img style='max-width:150px' src=${i.picture_url} />
      </div>
    `);
  })

  switch(status) {
    case 'success': {
      request.method = 'GET';
      request.url = '/v3/templates/d-a85b722a72a54560a894b596a96bfb02';
      await client.request(request)
      .then(([response, body]) => {
        html = response.body.versions[0].html_content;
      });

      msg.subject = 'Compra Exitosa';

      msg.html = html.replace('{{items}}', itemsHTML.join(' ')).replace('{{total_price}}', `$ ${merchant_order.body.total_amount}`).replace('{{id}}', merchant_order.body.id.toString()).replace('{{text}}', 'Su compra se realizó correctamente!')
      break;
    }

    case 'cancelled': {
      request.method = 'GET';
      request.url = '/v3/templates/d-a85b722a72a54560a894b596a96bfb02';
      await client.request(request)
      .then(([response, body]) => {
        html = response.body.versions[1].html_content;
      });

      msg.subject = 'Su compra ha sido cancelada';

      msg.html = html.replace('{{items}}', itemsHTML.join(' ')).replace('{{total_price}}', `$ ${merchant_order.body.total_amount}`).replace('{{id}}', merchant_order.body.id.toString()).replace('{{text}}', 'Su compra ha sido cancelada..').replace('{{description}}', 'Le informamos que mercadopago ha rechazado su orden, te esperamos nuevamente en la tienda para retomar tu compra')
      break;
    }

    case 'pending': {
      request.method = 'GET';
      request.url = '/v3/templates/d-a85b722a72a54560a894b596a96bfb02';
      await client.request(request)
      .then(([response, body]) => {
        html = response.body.versions[1].html_content;
      });
      
      msg.subject = 'Finalizá tu compra!'
  
      msg.html = html.replace('{{items}}', itemsHTML.join(' ')).replace('{{total_price}}', `$ ${merchant_order.body.total_amount}`).replace('{{id}}', merchant_order.body.id.toString()).replace('{{description}}', 'Dirigite a la casa de pago seleccionada para finalizar tu compra').replace('{{text}}', 'ESTOS PRODUCTOS ESPERAN POR VOS!')
      break;
    }

  }


  try {
    await sgMail.send(msg);
  } catch (err) {
    return {err};
  } 
  
  return;
};

module.exports = sendMailMP;