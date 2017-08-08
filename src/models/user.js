const {generateHash} = require('../core/authentication');
const UserSchema = require('./schemas/user');

exports.create = async function (data) {
  const existingUser = await this.getByUser(data.user);

  if(existingUser) {
    throw new Error('Existing user');
  }

  data.password = await generateHash(data.password);

  const user = new UserSchema(data);
  await user.save();

  return await this.getById(user._id);
}

exports.updateById = async function (userId, data) {
  if(data.password) {
    data.password = await generateHash(data.password);
  }

  await UserSchema
    .findByIdAndUpdate(userId, {
      $set: data
    }) ;

  return await this.getById(userId);
};

exports.getByUser = async function (user, withPassword = false) {
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
};

exports.getById = async function (userId) {
  return await UserSchema
    .findById(userId)
    .select('-password -__v')
    .exec();
};

exports.find = async function (filters = {}) {
  return await UserSchema
    .find(filters)
    .select('-password -__v')
    .exec();
};

exports.removeById = async function (userId) {
  return await UserSchema.findById(userId).remove();
};

exports.removeByUser = async function (user) {
  return await UserSchema.find({user}).remove();
};

exports.removeAll = async function () {
  return await UserSchema.find().remove();
};
