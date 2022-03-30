const express = require('express');
const SuperheroService = require('../services/superhero.service');
const superhero_routes = express.Router();
const superheroSchema = require('../models/superheroModel');
const service = new SuperheroService();
/* POST: http://localhost:5000/api/v1/superheroes/superhero */
superhero_routes.post('/superhero', async (req, res) => {
  try {
    const superhero = superheroSchema(req.body);
    const data = await service.createSuperhero(superhero)
    res.status(201).json(data)
  } catch (error) {
    res.status(404).json({ message: error });
  }
});
/* GET http://localhost:5000/api/v1/superheroes/ */
superhero_routes.get('/', async (req, res) => {
  try {
    const data = await service.listSuperhero()
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ message: error });
  }
});
/* GET{:id}: hhtp://localhost:5000/api/v1/superheroes/superheroId*/
superhero_routes.get('/:superheroId', async (req, res) => {
  try {
    const { superheroId } = req.params;
    const data = await service.showSuperhero(superheroId)
    res.status(302).json(data)
  } catch (error) {
    res.status(404).json({ message: error });
  }
});
/* PUT{:id}: hhtp://localhost:5000/api/v1/superheroes/superheroId*/
superhero_routes.put('/:superheroId', async (req, res) => {
  try {
    const { superheroId } = req.params;
    const { superhero, real_name, features, superhero_sidekick } = req.body;
    const data = await service
      .editSuperhero(
        superheroId,
        superhero,
        real_name,
        features,
        superhero_sidekick
      )
    res.status(200).json(data)
  } catch (error) {
    res.status(304).json({ message: error });
  }
});
/* DELETE{:id}: hhtp://localhost:5000/api/v1/superheroes/superheroId*/
superhero_routes.delete('/:superheroId', async (req, res) => {
  try {
    const { superheroId } = req.params;
    const data = await service.removeSuperhero(superheroId)
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json({ message: error });
  }
});
module.exports = superhero_routes;