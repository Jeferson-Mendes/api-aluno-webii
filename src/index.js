const express = require('express');
require('dotenv').config()
const routes = require('./routes');
const app = express();
app.use(express.json());

app.use(routes);

app.listen(3333, () => {
    console.log('Server on.')
})
