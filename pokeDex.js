const urlBase = "https://pokeapi.co/api/v2/pokemon/"
const getPokemon = id => `${urlBase}${id}`
const requestPokemon = () => {
    const awaitPokemon = []
    for (let i = 1; i <= 153; i++) {
        awaitPokemon.push(fetch(getPokemon(i)).then(response => response.json()))
        
    }
    Promise.all(awaitPokemon)
        .then(response => {
            const list = response.reduce((finish, pokemon) => {
                const types = pokemon.types.map(infos => infos.type.name)
                finish += `
                <li class="card ${types[0]}">
                <img class="image" width="300" height="300" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg">
                <h2 class="title">${pokemon.id} - ${pokemon.name}</h2>
                <p class="content a-${types[0]}">${types.join(' | ')}</p>
                <p class="content exp">Exp : ${pokemon.base_experience}</p></br>
                </li>
                `
                return finish
            }, '')

            const ul = document.querySelector("[data-js=bagDex]")
            ul.innerHTML = list
        })
}
requestPokemon()