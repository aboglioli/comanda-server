const {MASS_UNITS, CAPACITY_UNITS, VOLUME_UNITS, UNIT} = require('./enums');

// @return [value, unitName]
exports.normalize = function (value, unitName) {
  const unitArray = MASS_UNITS.some(u => u.unit === unitName)
      ? MASS_UNITS
      : CAPACITY_UNITS.some(u => u.unit === unitName)
      ? CAPACITY_UNITS
      : VOLUME_UNITS.some(u => u.unit === unitName)
      ? VOLUME_UNITS
      : null;

  if(!unitArray) {
    throw new Error('Unit does not exist');
  }

  return [
    value * unitArray.find(u => u.unit === unitName).multiplier,
    unitArray.find(u => u.multiplier === 1.0).unit
  ];
};
