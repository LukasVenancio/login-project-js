const { EntitySchema } = require('typeorm');

const user = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    firstName: {
      type: 'varchar',
      nullable: false,
    },
    secondName: {
      type: 'varchar',
      nullable: false,
    },
    email: {
      type: 'varchar',
      nullable: false,
    },
    validatedEmail: {
      type: 'boolean',
      nullable: false,
    },
    cpf: {
      type: 'int',
      nullable: false,
    },
    accessCode: {
      type: 'int',
      nullable: true,
    },
    accessCodeValidity: {
      type: 'datetime',
      nullable: true,
    },
    createdAt: {
      type: 'datetime',
    },
    modifieldDate: {
      type: 'datetime',
    },
    isActive: {
      type: 'boolean',
      nullable: false,
    },
    passport: {
      type: 'int',
    },
    telephone: {
      type: 'int',
    },
    state: {
      type: 'varchar',
    },
    city: {
      type: 'varchar',
    },
    address: {
      type: 'varchar',
    },
    addressNumber: {
      type: 'int',
    },
    postalCode: {
      type: 'varchar',
    },
    profilePhoto: {
      type: 'varchar',
    },
    purchaseDate: {
      type: 'datetime',
    },
    lastAccess: {
      type: 'datetime',
    },
    password: {
      type: 'varchar',
    },
    accessLevel: {
      type: 'int',
    },
    userPlan: {
      type: 'int',
    },
    acceptedPrivacyPolicy: {
      type: 'boolean',
    },
    acceptedTermsUse: {
      type: 'boolean',
    },
    token: {
      type: 'varchar',
      nullable: true
    }
  },
});

module.exports = user;