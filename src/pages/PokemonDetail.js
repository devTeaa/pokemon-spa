import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'

import TypeSpan from '../components/TypeSpan'
import AbilityBox from '../components/AbilityBox'

import {
  useQuery,
  gql
} from "@apollo/client";

import CatchPokemon from '../components/CatchPokemon';
import { Fragment } from 'react';

const PokemonDetailSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  > *:not(:first-child) {
    margin-top: 1rem;
  }

  .pokemon-sprite {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;

    > img {
      height: 200px;
    }

    > ul {
      grid-column: 1/-1;
      justify-self: center;
    }
  }

  > table {
    grid-column: 1/-1;
  }
`

const AbilityList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;

  > li:not(:first-child) {
    margin-top: 1rem;
  }
`;

const TypeList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  list-style-type: none;

  > li:not(:first-of-type) {
    margin-left: 0.5rem
  }
`;

const MovesTable = styled.table`
  tr > td {
    border: 1px solid #303030;
    vertical-align: top;
    font-size: 0.75rem;
    padding: 2px 4px;

    &:first-child {
      white-space: nowrap;
    }

    .level-grid {
      display: grid;
      grid-template-columns: 2em auto;
      grid-gap: 0.5em 0;
    }
  }
`


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
          }
        }
        moves {
          move {
            name
          }
          version_group_details {
            level_learned_at
            move_learn_method {
              name
            }
            version_group {
              name
            }
          }
        }
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

  const moveList = data.pokemon.moves
    .filter(item =>
      item.version_group_details.find(version =>
        version.move_learn_method.name === 'egg' || version.move_learn_method.name === 'level-up'
      )
    )
    .map(item => ({
      ...item,
      level_learned_at: [...new Set(item.version_group_details.map(version => version.level_learned_at))],
    }))
    .map(item => ({
      name: item.move.name,
      level_learned_at: item.level_learned_at.map(level => ({
        level,
        version: item.version_group_details.filter(version => version.level_learned_at === level).map(version => (version.version_group.name)),
      })).sort((a, b) => a.level - b.level),
    }))

  return (
    <PokemonDetailSection>
      <span className="pokemon-sprite">
        <img alt="sprite" src={data.pokemon.sprites.front_default} />
        <CatchPokemon pokemon={data.pokemon} />

        <TypeList>
          {data.pokemon.types.map(({ type }) => (
            <li key={type.name}>
              <TypeSpan type={type.name}>
                {type.name}
              </TypeSpan>
            </li>
          ))}
        </TypeList>
      </span>


      <AbilityList>
        {data.pokemon.abilities.map(({ ability }) => (
          <li key={ability.name}>
            <AbilityBox ability={ability}></AbilityBox>
          </li>
        ))}
      </AbilityList>

      <MovesTable>
        <thead>
          <tr>
            <th>Move</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {
            moveList.map(item => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>
                  <div className="level-grid">
                    {
                      item.level_learned_at.map(level => (
                        <Fragment key={`${level.level}_${level.version.join('')}`}>
                          <b>{level.level}</b>
                          <span>({level.version.join(', ')})</span>
                        </Fragment>
                      ))
                    }
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </MovesTable>
    </PokemonDetailSection>
  )
}

export default PokemonList
