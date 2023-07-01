const obtenerPokemons = async () => {
  return await obtenerListaObjetosPokemons(obtenerNumerosAleatorios());
};

const numerosAleatorios = (min, max) => {
    return Math.floor(Math.random() * (max-min)+min);
}

const obtenerNumerosAleatorios = () => {
  const pokemons = [];

  for (let i = 0; i < 3; i++) {
    pokemons.push(numerosAleatorios(20, 26));
  }

  return pokemons;
};

const obtenerListaObjetosPokemons = async ([id1, id2, id3] = []) => {
  const objeto1 = await consumirAPI(id1);

  const objeto2 = await consumirAPI(id2);

  const objeto3 = await consumirAPI(id3);

  const pokemons = [
    { name: objeto1.name, id: id1 },

    { name: objeto2.name, id: id2 },

    { name: objeto3.name, id: id3 },
  ];

  return pokemons;
};

const consumirAPI = async (id) => {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
    (r) => r.json()
  );

  return respuesta;
};

const fachadaObtenerPokemon = async () => {
  return await obtenerPokemons();
};

export default fachadaObtenerPokemon;
