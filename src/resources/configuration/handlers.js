const {MASS_UNITS, VOLUME_UNITS, UNIT, ROLES, PRODUCT_TYPES} = require('../../core/enums');

exports.get = async function (request, reply) {
  return reply({
    units: {
      mass: MASS_UNITS,
      volume: VOLUME_UNITS,
      unit: UNIT
    },
    roles: ROLES,
    productTypes: PRODUCT_TYPES
  }).code(200);
};
