const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main");

const fetchTrainers = () => fetch(TRAINERS_URL).then(resp => resp.json());
const fetchPokemon = (trainer) => fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({trainer_id: trainer.id})
}).then(resp => resp.json());

const appendTrainer = (trainer) => {
    const div = makeTrainerCard(trainer);
    const addBtn = makeAddBtn(trainer);
    const ul = makeList(trainer);
    div.appendChild(addBtn);
    div.appendChild(ul);
    main.appendChild(div);
} 

const makeTrainerCard = (trainer) => {
    const div = document.createElement("div");
    div.className = "card";
    div.id = trainer.id;
    div.innerHTML = `<p>${trainer.name}</p>`
    return div;
}

const releasePokemon = (pokemon) => {
    return e => {
        deletePokemon(pokemon);
    }
}

const deletePokemon = (pokemon) => {
    fetch(`${POKEMONS_URL}/${pokemon.id}`,{
        method: "DELETE",
        headers: {"Content-type": "application/json"}
    }).then(showTrainers);
}

const makeAddBtn = (trainer) => {
    const btn = document.createElement("button");
    btn.id = trainer.id;
    btn.innerText = "Add Pokemon";
    btn.addEventListener("click", () =>{
        if(trainer.pokemons.length <= 6){
            fetchPokemon(trainer).then(pokemon => {
                trainer.pokemons.push(pokemon);
                showTrainers();
            });
        }
    })
    return btn;
}

const makeReleaseBtn = (trainer, pokemon) => {
    const btn = document.createElement("button");
    btn.className = "release";
    btn.id = pokemon.id;
    btn.innerText = "Release"
    btn.addEventListener("click", releasePokemon(pokemon));
    return btn; 
}

const makeList = (trainer) => {
    const list = document.createElement("ul");
    for(const pokemon of trainer.pokemons){
        const liEl = document.createElement("li");
        liEl.innerText = `${pokemon.nickname} (${pokemon.species})`
        liEl.appendChild(makeReleaseBtn(trainer, pokemon));
        list.appendChild(liEl); 
    }
    return list;
}

const appendTrainers = (trainers) => {
    main.innerHTML = "";
    trainers.forEach(appendTrainer);
}

const showTrainers = () => fetchTrainers().then(appendTrainers);

const showPokemon = () => fetchPokemon();


showTrainers();


