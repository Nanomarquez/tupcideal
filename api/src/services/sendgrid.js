const sgMail = require('@sendgrid/mail');
const client = require('@sendgrid/client');
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
client.setApiKey(SENDGRID_API_KEY);

module.exports = {sgMail, client}