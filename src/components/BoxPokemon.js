
import './BoxPokemon.scss'

import {
  useQuery,
  gql
} from "@apollo/client";

const BoxPokemon = (props) => {
  const POKEMON_DETAIL = gql`
    query GetPokemonDetail($name: String!) {
      pokemon(name: $name) {
        id
        name
        sprites {
          front_default
        }
      }
    }
  `

  const { loading, error, data } = useQuery(POKEMON_DETAIL, {
    variables: {
      name: props.pokemon.name
    }
  })

  if (loading) return <></>
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  return (
    <div className="pokemon-box">
      <img alt="sprite" src={data.pokemon.sprites.front_default} />
      <span>{props.pokemon.pokemonName}</span>
    </div>
  )
}

export default BoxPokemon
