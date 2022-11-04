const sgMail = require('@sendgrid/mail');
const client = require('@sendgrid/client');
require("dotenv").config();
//const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey('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');
client.setApiKey('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');

module.exports = {sgMail, client}