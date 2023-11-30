const express = require('express');
const cors = require('cors');
const dataSource = require("./datasource");
const router = require('./routes/Router')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

dataSource.initialize().then(async () => {
    console.log('Database OK');
    app.listen(3333, () => {
        console.log('Server started on port 3333');
    })
})

