exports.MASS_UNITS = [
  {unit: 'mg', multiplier: 0.001},
  {unit: 'cg', multiplier: 0.01},
  {unit: 'dg', multiplier: 0.1},
  {unit: 'g', multiplier: 1.0},
  {unit: 'dag', multiplier: 10.0},
  {unit: 'hg', multiplier: 100.0},
  {unit: 'kg', multiplier: 1000.0}
];

exports.VOLUME_UNITS = [
  // capacity
  {unit: 'ml', multiplier: 0.001},
  {unit: 'cl', multiplier: 0.01},
  {unit: 'dl', multiplier: 0.1},
  {unit: 'l', multiplier: 1.0},
  {unit: 'dal', multiplier: 10.0},
  {unit: 'hl', multiplier: 100.0},
  {unit: 'kl', multiplier: 1000.0},

  // volume
  {unit: 'cm3', multiplier: 0.001},
  {unit: 'dm3', multiplier: 1},
  {unit: 'm3', multiplier: 1000.0},
];


exports.UNIT = 'u';

exports.ROLES = ['admin'];

exports.PRODUCT_TYPES = [
  'raw', 'disposable', 'paper',
  'intermediate', 'sauce',
  'simple', 'combination', 'sauce-cup'
];
