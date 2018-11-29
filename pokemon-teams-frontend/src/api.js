const baseUrl = "http://localhost:3000"
const trainersUrl = `${baseUrl}/trainers`
const pokemonsUrl = `${baseUrl}/pokemons`

const getTrainers = () =>
  fetch(trainersUrl)
    .then(resp => resp.json())

const createPokemon = trainer =>
  fetch(pokemonsUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(trainer)
  })
    .then(resp => resp.json())

const deletePokemon = pokemonToDelete =>
  fetch(`${pokemonsUrl}/${pokemonToDelete.id}`, {
    method: 'DELETE'
  })