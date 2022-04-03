const express = require('express');
const router_person = express.Router();
const personBillSchema = require('../models/personBillModel');
/* POST: hhtp://localhost:5000/api/v1/people/person */
router_person.post('/person', (req, res) => {
  const personBill = personBillSchema(req.body);
  personBill
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    
});
/* GET: hhtp://localhost:5000/api/v1/people/*/
router_person.get('/', (req, res) => {
  personBillSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
/* GET{:id}: hhtp://localhost:5000/api/v1/people/personId*/
router_person.get('/:personId', (req, res) => {
  const { personId } = req.params;
  personBillSchema
    .findById(personId)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
/* PUT{:id}: hhtp://localhost:5000/api/v1/people/personId*/
router_person.put('/:personId', (req, res) => {
  const { personId } = req.params;
  const { name, lastname, dni, address } = req.body;
  personBillSchema
    .updateOne({ _id: personId }, { $set: { name, lastname, dni, address } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
/* DELETE{:id}: hhtp://localhost:5000/api/v1/people/personId*/
router_person.delete('/:personId', (req, res) => {
  const { personId } = req.params;
  personBillSchema
    .remove({ _id: personId })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
module.exports = router_person;