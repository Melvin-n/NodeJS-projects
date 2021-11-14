const submitButton = document.getElementById('submitButton')
const genInput = document.getElementById('genInput')
const gamesList = document.getElementById('gamesList')


const searchByGen = (e) => {

    e.preventDefault()
    gamesList.innerHTML = ''
    fetch(`http://localhost:4500/search/${genInput.value}`)
    .then(res => res.json())
    .then(res => res.forEach(game => {
        console.log(game)
        
        gamesList.innerHTML += `
        <ul id='gameItem'> 
        <h3> ${game.name}</h3>
            <li> Released in: ${game.releaseyear} </li>
            <li> Cover pokemon: ${game.coverpokemon} </li>
        </ul>
        `
    }))
    
}