const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require("axios");
const {Pokemon,Type} = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
    );
    const dataPokemons = apiUrl.data.results;
    const pokemons = await Promise.all(
      dataPokemons.map(async (elem) => {
        let details = await axios(elem.url);
        return {
          id: details.data.id,
          name: details.data.name,
          image: details.data.sprites.other.home.front_default,
          types: details.data.types.map((t) => t.type.name),
          hp: details.data.stats[0].base_stat,
          attack: details.data.stats[1].base_stat,
          defense: details.data.stats[2].base_stat,
          speed: details.data.stats[5].base_stat,
          height: details.data.height,
          weight: details.data.weight,
        };
      })
    );
    return pokemons;
  } catch (error) {
    throw error;
  }
};

const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["nombre"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}
router.get('/tipos', async (req, res, next) => { 
  try {
      const typeDB = await Type.findAll();
      if (typeDB.length !== 0) {
          console.log('Desde DB');
          res.status(200).send(typeDB);
      } else {
          const getAPI = await axios.get("https://pokeapi.co/api/v2/type");
          const typeAPIList = [];
          // console.log(getAPI.data.results);
          for (let i = 0; i < getAPI.data.results.length; i++) {
              typeAPIList.push({
                  nombre: getAPI.data.results[i].name
              });
          }
          const typeDB = await Type.bulkCreate(typeAPIList);
          // console.log('Desde API');
          res.status(200).send(typeDB);
      }
  } catch (error) {
      next(error);        
  }
})

router.get('/pokemons', async (req,res) => {
    const name = req.query.name
    let pokemonsTotal = await getAllPokemons();
    if (name){  //si llega query name
        let pokemonName = await pokemonsTotal.filter( el => el.name.toLowerCase()===(name.toLowerCase()))
        if (pokemonName.length){                                                //.includes
            res.status(200).send(pokemonName)
        } else {
            res.status(404).send(`No existe el pokemon: ${name}`);
        }
    } else {
        res.status(200).send(pokemonsTotal)
    }
})

router.get('/pokemons/:id', async (req, res) => {
  const id = req.params.id;
  const pokemonsTotal = await getAllPokemons();
  if (id) {
    let pokemonId = await pokemonsTotal.filter( el => el.id == id);
    if (pokemonId.length) {
      res.status(200).json(pokemonId);
    } else {
      res.status(404).send(`No existe el pokemon con id: ${id}`)
    }
  }
})
router.post("/pokemons", async (req, res) => {
  console.log(req.body)
  //agregamos parametro del req.body
    let {
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      createdInDb,
      types,
      likes
    } = req.body;
    
    let newPokemon = await Pokemon.create({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      createdInDb,
      likes
    })
/*
    let typesInDb = await Type.findAll({
      where: { nombre : types[0] }
    })
    newPokemon.addType(typesInDb)
*/
const typesOk = await Type.findAll()
await newPokemon.addType( // Asigna tipo al pokemon creado  
types.map(type => {
    const typeFound = typesOk.find(typeOk => typeOk.nombre === type)
    return typeFound.id
}))
console.log('no consologuee', newPokemon)
});
module.exports = router;
