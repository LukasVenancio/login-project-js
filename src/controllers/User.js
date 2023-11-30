const service = require('../services/User');

const create = async (req, res) => {
    await service.create(req.body, res);
};

const validateEmail = async (req, res) => {
    await service.validateEmail(req.body.email, res);
};

const generateAccessCode = async (req, res) => {
    await service.generateAccessCode(req.body.email, res);
};

const login = async (req, res) => {
    await service.login(req.body, res);
};

module.exports = { create, validateEmail, generateAccessCode, login };
