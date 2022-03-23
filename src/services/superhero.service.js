const SuperheroModel = require('../models/superheroModel');
class SuperheroService {
  /* Promesas y funciones asicronicas */
  /* Una función asincronica devuelve una promesa */
  /* JS es un lenguaje subproceso (un hilo) -> sólo hace uan cosa a la vez */
  async createSuperhero(superhero) {
    superhero.save();
    return superhero;
  }
  async listSuperhero() {
    return SuperheroModel.find();
  }
  async showSuperhero(superheroId) {
    return SuperheroModel.findById({ _id: superheroId });
  }
  async editSuperhero(
    superheroId,
    superhero,
    real_name,
    features,
    superhero_sidekick
  ) {
    return SuperheroModel.updateOne(
      { _id: superheroId },
      { superhero, real_name, features, superhero_sidekick }
    );
  }
  async removeSuperhero(superheroId) {
    const superhero_remove = SuperheroModel.findById({ _id: superheroId });
    return SuperheroModel.deleteOne(superhero_remove);
  }
}
module.exports = SuperheroService;