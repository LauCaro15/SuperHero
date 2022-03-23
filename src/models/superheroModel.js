const mongoose = require('mongoose');
const superheroSchema = mongoose.Schema({
  superhero: { type: String, required: true },
  real_name: { type: String, required: true },
  feature: {
    type: Object,
    required: true,
    universe: { type: String, required: true },
    super_powers: { type: Array, required: true },
  },
  superhero_sidekick: {
    type: Object,
    required: true,
    sidekick: { type: String, required: true },
    super_powers_sidekick: { type: Array, required: true },
  },
});
module.exports = mongoose.model('SuperheroCollection', superheroSchema);