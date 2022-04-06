const mongoose = require('mongoose');
const express = require('express');
const sgMail = require('@sendgrid/mail');
const app = express();
const routerApi = require('./src/routes');
const {
  logErrors,
  errHandler,
  boomErrorHandler,
} = require('./src/handlers/errors.handler');

require('dotenv').config();
const port = process.env.PORT;

app.listen(port, () => console.log('Active port', port));
app.use(logErrors);
app.use(errHandler);
app.use(boomErrorHandler);

mongoose
  .connect(process.env.MONGODB_STRING_CONNECTION)
  .then(() => console.log('Success Connection With Mongo'))
  .catch((error) => console.error(error));

/* #################### TWILIO #################### */
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Prueba de Twilio. Grupo ing Software miercoles en la mañana.',
    from: '+15706309821',
    to: '+573105958276',
  })
  .then((message) => console.log(message.sid));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'lccandamil@gmail.com', // Change to your recipient
  from: 'laurac.candamilc@autonoma.edu.co', // Change to your verified sender
  subject: 'Asusnto: Prueba twilio grupo miercoles',
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div class="row">
      <div class="col">
        <h3>Prueba sendgrid</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table>
          <thead>
            <tr>
                <th>Name</th>
                <th>Item Name</th>
                <th>Item Price</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Alvin</td>
              <td>Eclair</td>
              <td>$0.87</td>
            </tr>
            <tr>
              <td>Alan</td>
              <td>Jellybean</td>
              <td>$3.76</td>
            </tr>
            <tr>
              <td>Jonathan</td>
              <td>Lollipop</td>
              <td>$7.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </body>
  </html>`,
};
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
  });
/* Respuestas a solicitudes */
app.use(express.json());
/* Permitir hacer el llamado de los request */
routerApi(app);