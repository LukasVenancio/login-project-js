const express = require('express');
const userRouter = express.Router();

const controller = require('../controllers/User');

userRouter.post('/', controller.create);
userRouter.patch('/validate-email', controller.validateEmail);
userRouter.post('/generate-access-code', controller.generateAccessCode);
userRouter.post('/login', controller.login);

module.exports = userRouter;