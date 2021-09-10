import './PokemonList.scss'
import { useRef, useEffect, useState } from "react"
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

const PokemonList = () => {
  const pokemonId = useRef(useParams().id)

  const [isLoading, setIsLoading] = useState(true)
  const [pokemonDetail, setPokemonDetail] = useState({})

  const fetchPokemonDetail = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await res.json()

    return data
  }

  useEffect(() => {
    const getPokemonDetail = async () => {
      const data = await fetchPokemonDetail(pokemonId.current)

      setPokemonDetail(data)
      setIsLoading(false)
    }

    getPokemonDetail()
  }, [pokemonId])

  return (
    <section>
      {!isLoading && <div>
        <img alt="sprite" src={pokemonDetail.sprites.front_default} />

        <ul>
          {pokemonDetail.types.map(({ type }) => (
            <li key={type.name}>{type.name}</li>
          ))}
        </ul>

        <ul>
          {pokemonDetail.abilities.map(({ ability }) => (
            <li key={ability.name}>{ability.name}</li>
          ))}
        </ul>

        <ul>
          {pokemonDetail.moves.map(({ move }) => (
            <li key={move.name}>{move.name}</li>
          ))}
        </ul>
      </div>}
    </section>
  )
}

export default PokemonList
