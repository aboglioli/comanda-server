const {generateHash} = require('../core/authentication');
const UserSchema = require('./schemas/user');

async function create(data) {
  const existingUser = await getByEmail(data.email);

  if(existingUser) {
    throw new Error('Existing user');
  }

  data.password = await generateHash(data.password);

  const user = new UserSchema(data);
  await user.save();

  return await getById(user._id);
}

async function updateById(userId, data) {
  if(data.password) {
    data.password = await generateHash(data.password);
  }

  await UserSchema
    .findByIdAndUpdate(userId, {
      $set: data
    }) ;

  return await getById(userId);
}

async function getById(userId) {
  return await UserSchema
    .findById(userId)
    .select('-password -__v')
    .exec();
}

async function getByEmail(email) {
  return await UserSchema
    .findOne({email})
    .exec();
}

async function getAll() {
  return await UserSchema
    .find({})
    .select('-password -__v')
    .exec();
}

async function removeById(userId) {
  return await UserSchema.findById(userId).remove();
}

async function removeByEmail(email) {
  return await UserSchema.find({email}).remove();
}

async function removeAll() {
  return await UserSchema.remove({});
}

module.exports = {
  create,
  updateById,
  getById,
  getByEmail,
  getAll,
  removeByEmail,
  removeById,
  removeByEmail,
  removeAll
};
