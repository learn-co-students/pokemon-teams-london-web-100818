const charizard = {
  name: "Charizard",
  hp: 50,
  strength: 8,
  height: 250,
}

const upgradePokemon = (pokemon, stat) => event => {
  pokemon[stat] += 10
}

const renderPokemon = pokemon => {
  const mainEl = document.querySelector('main')
  const pokemonDiv = document.createElement('div')
  pokemonDiv.innerHTML = `
    <p>
    ${pokemon.name}
    <br />
    HP: ${pokemon.hp}
    <br />
    Strength: ${pokemon.strength}
    <br />
    Height: ${pokemon.height}
    </p>
  `
  mainEl.appendChild(pokemonDiv)

  const stats = Object.keys(pokemon)
  
  stats.forEach(stat => {
    const statBtn = document.createElement('button')
    statBtn.innerText = stat
    pokemonDiv.appendChild(statBtn)
    statBtn.addEventListener('click', upgradePokemon(pokemon, stat))
    statBtn.addEventListener('click', event => {
      pokemon[stat] += 10
    })
  })
}

renderPokemon(charizard)