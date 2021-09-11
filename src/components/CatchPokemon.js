import { useState } from "react"


const CatchPokemon = (props) => {
  const [isCaught, setIsCaught] = useState(false)
  const [myPokemonName, setMyPokemonName] = useState('')

  const catchPokemon = () => {
    if (Math.random() >= 0.5) {
      setIsCaught(true)
    }
  }

  const savePokemon = (pokemon) => {
    const myPokemonList = JSON.parse(window.localStorage.getItem('myPokemonList') || '[]')

    if (myPokemonList.map(item => item.pokemonName).indexOf(myPokemonName) !== -1) {
      window.alert('Please choose a different name')

      return
    }

    window.localStorage.removeItem('myPokemonList')
    window.localStorage.setItem('myPokemonList', JSON.stringify([
      ...myPokemonList,
      {
        pokemonName: myPokemonName,
        id: pokemon.id,
        name: pokemon.name,
      },
    ]))
  }

  return (
    <div>
      {
        !isCaught
          ? <button type="button" onClick={() => catchPokemon()}>Catch</button>
          : <div>
            <input type="text" onChange={e => setMyPokemonName(e.target.value)} />
            <button type="button" onClick={() => savePokemon(props.pokemon)}>Save</button>
          </div>
      }
    </div>
  )
}

export default CatchPokemon
