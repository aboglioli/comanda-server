const {MASS_UNITS, VOLUME_UNITS, LENGTH_UNITS, UNIT} = require('./enums');

// @return value
exports.normalize = function (value, unitName) {
  const unitArray = isUnitOfType(MASS_UNITS, unitName)
    ? MASS_UNITS
    : isUnitOfType(VOLUME_UNITS, unitName)
    ? VOLUME_UNITS
    : isUnitOfType(LENGTH_UNITS, unitName)
    ? LENGTH_UNITS
    : null;

  if(!unitArray) {
    throw new Error('Unit does not exist');
  }

  return value * unitArray.find(u => u.unit === unitName).multiplier;
;
};

function isUnitOfType (unitType, ...unitNames) {
  return unitNames.every(unitName => unitType.some(unit => unit.unit === unitName));
}

exports.isUnitOfType = isUnitOfType;
