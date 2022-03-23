const express = require('express');
const SuperheroService = require('../services/superhero.service');
const superhero_routes = express.Router();
const superheroSchema = require('../models/superheroModel');
const service = new SuperheroService();
/* POST: http://localhost:5000/api/v1/superheroes/superhero */
superhero_routes.post('/superhero', async (req, res) => {
  const superhero = superheroSchema(req.body);
  await service
    .createSuperhero(superhero)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});
/* GET http://localhost:5000/api/v1/superheroes/ */
superhero_routes.get('/', async (req, res) => {
  await service
    .listSuperhero()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});
/* GET{:id}: hhtp://localhost:5000/api/v1/superheroes/superheroId*/
superhero_routes.get('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  await service
    .showSuperhero(superheroId)
    .then((data) => res.status(302).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});
/* PUT{:id}: hhtp://localhost:5000/api/v1/superheroes/superheroId*/
superhero_routes.put('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  const { superhero, real_name, features, superhero_sidekick } = req.body;
  await service
    .editSuperhero(
      superheroId,
      superhero,
      real_name,
      features,
      superhero_sidekick
    )
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(304).json({ message: err }));
});
/* DELETE{:id}: hhtp://localhost:5000/api/v1/superheroes/superheroId*/
superhero_routes.delete('/:superheroId', async (req, res) => {
  const { superheroId } = req.params;
  await service
    .removeSuperhero(superheroId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});
module.exports = superhero_routes;