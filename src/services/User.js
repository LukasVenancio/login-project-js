const repository = require("../repositories/User");
const emailService = require("./Email");
const tokenService = require('./Token')

const getAccessCode = (user) => {
  const currentTime = new Date();
  const accessCodeValidity = new Date(
    currentTime.getTime() + 1 * 60 * 60 * 1000
  );
  const accessCode = Math.floor(100000 + Math.random() * 900000);

  user.accessCode = accessCode;
  user.accessCodeValidity = accessCodeValidity;
};

const getUserData = (user) => {
  user.createdAt = new Date();
  user.modifieldDate = new Date();
  user.isActive = false;
  user.passport = 1111;
  user.telephone = 1111;
  user.state = "São Paulo";
  user.city = "São Paulo";
  user.address = "Algum endereco, Jardim Algum Jardim";
  user.addressNumber = 11;
  user.postalCode = "11111-111";
  user.profilePhoto = "https://someurl.png";
  user.purchaseDate = new Date();
  user.lastAccess = new Date();
  user.password = "111111";
  user.accessLevel = 1;
  user.userPlan = 1;
  user.acceptedPrivacyPolicy = false;
  user.acceptedTermsUse = false;
};

const create = async (user, response) => {
  try {
    const foundUser = await repository.findUserByEmail(user.email);
    if (foundUser) {
      response.status(400);
      response.json({
        message: "User already exists",
      });
      return;
    }

    user.validatedEmail = false;
    getUserData(user);
    const savedUser = await repository.save(user);

    emailService.send({
        name: savedUser.firstName,
        email: savedUser.email,
      },
      "http://localhost:3333",
      "Valide seu E-mail"
    );

    response.status(201);
    response.json(savedUser);

  } catch (error) {
    response.status(500);
    response.json({
      message: error,
    });
  }
};

const validateEmail = async (email, response) => {
  try {
    const foundUser = await repository.findUserByEmail(email);
    if (!foundUser) {
      response.status(400);
      response.json({
        message: "User not found",
      });
      return;
    }

    foundUser.validatedEmail = true;
    await repository.update(foundUser);

    response.status(200);
    response.json({
      message: "Email validated",
    });
  } catch (error) {
    response.status(500);
    response.json({
      message: error,
    });
  }
};

const generateAccessCode = async (email, response) => {
  try {
    const foundUser = await repository.findUserByEmail(email);
    if (!foundUser || !foundUser.validatedEmail) {
      response.status(400);
      response.json({
        message: "User not found",
      });
      return;
    }

    getAccessCode(foundUser);
    await repository.update(foundUser);

    emailService.send(
      {
        name: foundUser.firstName,
        email: foundUser.email,
      },
      "http://localhost:3333",
      `Seu código de acesso é: ${foundUser.accessCode}`
    );

    response.status(201);
    response.json({
      message: "Code generated",
    });
  } catch (error) {
    response.status(500);
    response.json({
      message: error,
    });
  }
};

const login = async (data, response) => {
  try {
    const foundUser = await repository.findUserByEmail(data.email);
    if (!foundUser || !foundUser.validatedEmail) {
      response.status(400);
      response.json({
        message: "User not found",
      });
      return;
    }

    const currentTime = new Date();

    if (
      !foundUser.accessCode ||
      foundUser.accessCodeValidity < currentTime ||
      foundUser.accessCode !== data.code
    ) {
      response.status(400);
      response.json({
        message: "Invalid access code",
      });
      return;
    }

    foundUser.token = tokenService.sign({
        firstName: foundUser.firstName,
        secondName: foundUser.secondName,
        email: foundUser.email,
        id: foundUser.id
    })

    await repository.update(foundUser);

    response.status(200);
    response.json({
      token: foundUser.token,
    });
  } catch (error) {
    response.status(500);
    response.json({
      message: error,
    });
  }
};

module.exports = {
  getAccessCode,
  create,
  validateEmail,
  generateAccessCode,
  login,
};
