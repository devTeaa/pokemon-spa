import './PokemonList.scss'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'

import TypeSpan from '../components/TypeSpan'

import {
  useQuery,
  gql
} from "@apollo/client";

import CatchPokemon from '../components/CatchPokemon';


const StyledList = styled.ul`
`;

const HorizontalList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  list-style-type: none;

  > li:not(:first-of-type) {
    margin-left: 0.5rem
  }
`;


const PokemonList = () => {
  const currentPokemonName = useParams().name

  const POKEMON_DETAIL = gql`
    query GetPokemonDetail($name: String!) {
      pokemon(name: $name) {
        id
        name
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

  const { loading, error, data } = useQuery(POKEMON_DETAIL, {
    variables: {
      name: currentPokemonName
    }
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  return (
    <section>
      <div>
        <img alt="sprite" src={data.pokemon.sprites.front_default} />

        <CatchPokemon pokemon={data.pokemon} />

        <HorizontalList>
          {data.pokemon.types.map(({ type }) => (
            <li key={type.name}>
              <TypeSpan type={type.name}>
                {type.name}
              </TypeSpan>
            </li>
          ))}
        </HorizontalList>

        <StyledList>
          {data.pokemon.abilities.map(({ ability }) => (
            <li key={ability.name}>{ability.name}</li>
          ))}
        </StyledList>

        <StyledList>
          {data.pokemon.moves.map(({ move }) => (
            <li key={move.name}>{move.name}</li>
          ))}
        </StyledList>
      </div>
    </section>
  )
}

export default PokemonList
