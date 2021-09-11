import './PokemonList.scss'
import { useParams } from 'react-router-dom'

import {
  useQuery,
  gql
} from "@apollo/client";


const PokemonList = () => {
  const POKEMON_DETAIL = gql`
    query GetPokemonDetail($name: String!) {
      pokemon(name: $name) {
        sprites {
          front_default
        }
        abilities {
         ability {
           name
         } 
        }
        types {
          type {
            name
          },
        },
        moves {
          move {
            name
          },
        },
      }
    }
  `

  console.log(useParams())

  const { loading, error, data } = useQuery(POKEMON_DETAIL, {
    variables: {
      name: useParams().name
    }
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  return (
    <section>
      <div>
        <img alt="sprite" src={data.pokemon.sprites.front_default} />

        <ul>
          {data.pokemon.types.map(({ type }) => (
            <li key={type.name}>{type.name}</li>
          ))}
        </ul>

        <ul>
          {data.pokemon.abilities.map(({ ability }) => (
            <li key={ability.name}>{ability.name}</li>
          ))}
        </ul>

        <ul>
          {data.pokemon.moves.map(({ move }) => (
            <li key={move.name}>{move.name}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default PokemonList
