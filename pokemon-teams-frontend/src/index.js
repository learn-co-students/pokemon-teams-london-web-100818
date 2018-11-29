const mainEl = document.querySelector('main')

const renderTrainerCards = trainers => {
  trainers.forEach(renderTrainerCard)
}

const makeDeleteCallback = (trainer, pokemonList) => (listEl, pokemonToDelete) => {
  // update it in the backend
  deletePokemon(pokemonToDelete)
  // remove pokemon from trainer.pokemons    
  trainer.pokemons = trainer.pokemons.filter(pokemon => pokemon.id !== pokemonToDelete.id)
  console.log(trainer.pokemons)
  // remove listEl
  pokemonList.removeChild(listEl)
}

const renderTrainerCard = trainer => {
  const cardDiv = document.createElement('div')
  cardDiv.className = "card"
  cardDiv.id = `trainer-${trainer.id}`
  mainEl.appendChild(cardDiv)

  const addPokemonBtn = document.createElement('button')
  addPokemonBtn.innerText = "Add Pokemon"
  cardDiv.appendChild(addPokemonBtn)

  
  const pokemonList = document.createElement('ul')
  cardDiv.appendChild(pokemonList)
  
  const deletePokemonCallback = makeDeleteCallback(trainer, pokemonList)
  
  const createPokemonCallback = pokemon => {
    trainer.pokemons.push(pokemon)
    console.log(trainer.pokemons)
    renderPokemon(pokemonList, pokemon, deletePokemonCallback)
  }

  trainer.pokemons.forEach(pokemon => renderPokemon(pokemonList, pokemon, deletePokemonCallback))

  clickAndAddPokemonToList(addPokemonBtn, trainer, createPokemonCallback)
}

const renderPokemon = (listEl, pokemon, deletePokemonCallback) => {
  const pokemonListEl = document.createElement('li')
  pokemonListEl.innerHTML = `
    ${pokemon.nickname} (${pokemon.species}) 
    <button class="release" id="pokemon-${pokemon.id}">RELEASE</button>
  `
  listEl.appendChild(pokemonListEl)
  
  const releaseBtn = pokemonListEl.querySelector('button')
  releaseBtn.addEventListener('click', () => deletePokemonCallback(pokemonListEl, pokemon))
}

const clickAndAddPokemonToList = (addPokemonBtn, trainer, createPokemonCallback) => {
  addPokemonBtn.addEventListener('click', () => {
    if(trainer.pokemons.length < 6) {
      let trainerToUpdate = {
        "trainer_id": trainer.id
      }
      createPokemon(trainerToUpdate)
        .then(createPokemonCallback)
    }
  })
}

getTrainers()
  .then(renderTrainerCards)