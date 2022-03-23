const SuperheroModel = require('../models/superhero_v2.model');
class SuperheroService {
  /* Promesas y funciones asicronicas */
  /* Una función asincronica devuelve una promesa */
  /* JS es un lenguaje subproceso (un hilo) -> sólo hace uan cosa a la vez */
  async createSuperhero(superheroV2) {
    superheroV2.save();
    return superheroV2;
  }
  async listSuperhero() {
    return SuperheroModel.find();
  }
  async showSuperhero(superheroId) {
    return SuperheroModel.findById({ _id: superheroId });
  }
  async editSuperhero(superheroId, superhero, realname, superpower) {
    return SuperheroModel.updateOne(
      { _id: superheroId  },
      { superhero, realname, superpower }
    );
  }
  async removeSuperhero(superheroId) {
    const superhero_remove = SuperheroModel.findById({ _id: superheroId });
    return SuperheroModel.deleteOne(superhero_remove);
  }
}
module.exports = SuperheroService;