const mongoose = require('mongoose');
const express = require('express');
const app = express()
const routerApi = require("./src/routes");
const { logErrors, errHandler ,boomErrorHandler} = require('./src/handlers/errors.handler');


require('dotenv').config();
const port = process.env.PORT;

app.listen(port, ()=>console.log('Active port', port));
app.use(logErrors);
app.use(errHandler);
app.use(boomErrorHandler);

mongoose
    .connect(process.env.MONGODB_STRING_CONNECTION)
    .then(() => console.log("Success Connection With Mongo"))
    .catch((error) => console.error(error));

/* Respuestas a solicitudes */
app.use(express.json());
/* Permitir hacer el llamado de los request */
routerApi(app);