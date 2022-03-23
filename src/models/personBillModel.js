const mongoose = require('mongoose');
const personBillSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: Object,
    required: true,
    city: { type: String, required: true },
    code_zip: { type: Number, required: true },
    geo: { type: Array, required: true },
  },
});
module.exports = mongoose.model('PersonBillCollection', personBillSchema);