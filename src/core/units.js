const {MASS_UNITS, VOLUME_UNITS, UNIT} = require('./enums');

// @return [value, unitName]
exports.normalize = function (value, unitName) {
  let unit = MASS_UNITS.find(u => u.unit === unitName);
  const res = [];

  if(!unit) {
    unit = VOLUME_UNITS.find(u => u.unit === unitName);
    res[1] = 'l';
  } else {
    res[1] = 'g';
  }

  if(!unit) {
    throw new Error('Unit does not exist');
  }

  res[0] = value * unit.multiplier;

  return res;
};
