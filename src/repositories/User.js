const datasource = require('../datasource');

var ormRepository = datasource.getRepository('User');

const save = async (user) => {
    return await ormRepository.save(user);
  };
  
  const findUserByEmail = async (email) => {
    return await ormRepository.findOneBy({ email: email });
  };
  
  const update = async (user) => {
    return await ormRepository.update(user.id, user);
  };
  
  module.exports = {
    save,
    findUserByEmail,
    update
};