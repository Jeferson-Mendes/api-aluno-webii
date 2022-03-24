const express = require('express');
require('dotenv').config()
const routes = require('./routes');
const app = express();
app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
    console.log('Server on.')
})
