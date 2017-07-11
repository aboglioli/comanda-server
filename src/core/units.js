const massUnits = [
  {unit: 'mg', multiplier: 0.001},
  {unit: 'cg', multiplier: 0.01},
  {unit: 'dg', multiplier: 0.1},
  {unit: 'g', multiplier: 1.0},
  {unit: 'dag', multiplier: 10.0},
  {unit: 'hg', multiplier: 100.0},
  {unit: 'kg', multiplier: 1000.0}
];

const volumeUnits = [
  {unit: 'ml', multiplier: 0.001},
  {unit: 'cl', multiplier: 0.01},
  {unit: 'dl', multiplier: 0.1},
  {unit: 'l', multiplier: 1},
  {unit: 'dal', multiplier: 10.0},
  {unit: 'hl', multiplier: 100.0},
  {unit: 'kl', multiplier: 1000.0}
];

// {value, unit}
function normalize(value) {
  let unit = massUnits.find(u => u.unit === value.unit);
  const res = {};

  if(!unit) {
    unit = volumeUnits.find(u => u.unit === value.unit);
    res.unit = 'l';
  } else {
    res.unit = 'g';
  }

  if(!unit) {
    throw new Error('Unit does not exist');
  }

  res.value = value.value * unit.multiplier;

  return res;
}

module.exports = {
  normalize
};
