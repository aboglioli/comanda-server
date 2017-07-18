const {generateHash} = require('../core/authentication');
const UserSchema = require('./schemas/user');

async function create(data) {
  const existingUser = await getByUser(data.user);

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

async function getByUser(user, withPassword = false) {
  if(withPassword) {
    return await UserSchema
      .findOne({user})
      .select('-__v')
      .exec();
  }

  return await UserSchema
    .findOne({user})
    .select('-password -__v')
    .exec();
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

async function removeByUser(user) {
  return await UserSchema.find({user}).remove();
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
  getByUser,
  getByEmail,
  getAll,
  removeById,
  removeByUser,
  removeByEmail,
  removeAll
};
