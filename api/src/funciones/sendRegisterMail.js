const { sgMail } = require("../services/sendgrid");
const { client } = require("../services/sendgrid");

const sendRegisterMail = async (usuario) => {
  const msg = {
    to: usuario.email,
    from: "tupcideal.henry@gmail.com",
    subject: "",
    html: "",
  };

  const request = {};
  request.method = "GET";
  request.url = "/v3/templates/d-3d6d7c35349041ab91160f160e2624b4";
  await client.request(request).then(([response, body]) => {
    html = response.body.versions[0].html_content;
  });

  msg.subject = "Bienvenido a TuPcIdeal";

  msg.html = html
    .replace(
      `{{text}}`,
      `Es un gusto para nosotros que te hayas registrado
  ahora ya puedes disfrutar la experiencia completa de comprar con nosotros 
  y obtener los mejores precios en el mercado.`
    )
    .replace(`{{name}}`, usuario.name)
    .replace(`{{lastname}}`, usuario.last_name);

  try {
    await sgMail.send(msg);
  } catch (err) {
    return { err };
  }

  return;
};

module.exports = sendRegisterMail;
