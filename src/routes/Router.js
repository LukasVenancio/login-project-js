const express = require('express');
const router = express.Router();
const userRouter = require('./User')

router.get('/', (req, res, next) =>{
    res.status(200).send({
       title: "Teste Node",
       version: "0.1"
    });
});

router.use('/users', userRouter)

module.exports = router;