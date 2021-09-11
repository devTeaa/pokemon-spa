import { useState } from "react";

import './MyPokemonList.scss'
import BoxPokemon from "../components/BoxPokemon"

const MyPokemonList = () => {
  const [myPokemonListStorage, setMyPokemonListStorage] = useState(JSON.parse(window.localStorage.getItem('myPokemonList') || '[]'))

  const handleRelease = (pokemon) => {
    window.localStorage.removeItem('myPokemonList')

    const newMyPokemonListStorage = myPokemonListStorage.filter(item => item.pokemonName !== pokemon.pokemonName)

    window.localStorage.setItem('myPokemonList', JSON.stringify(newMyPokemonListStorage))
    setMyPokemonListStorage(newMyPokemonListStorage)
  }

  return (
    <section>
      <table className="my-pokemon-list">
        <thead>
          <tr>
            <th>Pokemon</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            myPokemonListStorage.map(item => (
              <tr key={item.pokemonName}>
                <td>
                  <BoxPokemon pokemon={item} handleRelease={handleRelease} />
                </td>
                <td>
                  <button type="button" onClick={() => handleRelease(item)}>Release</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  )
}

export default MyPokemonList