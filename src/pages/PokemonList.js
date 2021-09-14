import styled from '@emotion/styled';
import {
  useQuery,
  gql
} from "@apollo/client";
import { getMyPokemonList } from '../utils/LocalStorage'
import { useRef } from "react";
import BoxPokemon from "../components/BoxPokemon"

const PokemonListStyle = styled.section`
  > table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;

    tbody > tr {
      background: rgb(203,67,66);
      background: linear-gradient(0deg, rgba(203,67,66,1) 0%, rgba(168,47,47,1) 37%, rgba(168,47,47,1) 100%);
      color: white;
      border-spacing: 1rem;

      * {
        color: #FDFDFD;
      }

      td > img {
        max-height: 80px;
      }
    }
  }

  .button-group {
    display: flex;
    margin-top: 8px;

    > *:not(:first-of-type) {
      margin-left: 1rem;
    }

    > button {
      flex: 2;
    }

    > span {
      flex: 1;
      text-align: center;
    }
  }
`

const PagingButton = styled.button`
  padding: 8px 4px;
  border: none;
  background-color: #303030;
  color: #FDFDFD;
`

const PokemonList = () => {
  const myPokemonListStorage = useRef(getMyPokemonList())
  const checkOwned = (pokemon) => {
    return myPokemonListStorage.current.filter(item => item.id === pokemon.id).length
  }

  const POKEMON_LIST = gql`
    query GetPokemonList($limit: Int!, $offset: Int!) {
      pokemons(limit: $limit, offset: $offset) {
        prevOffset
        nextOffset,
        results {
          id,
          url,
          name,
          image,
        }
      }
    }
  `;

  const { loading, error, data, fetchMore } = useQuery(POKEMON_LIST, {
    variables: {
      limit: 10,
      offset: 0
    },
  });

  const handlePagination = (offset) => {
    fetchMore({
      variables: { offset, limit: 10 },
      updateQuery: (prevResults, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResults

        return fetchMoreResult
      }
    })
  }


  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <PokemonListStyle>
      <table>
        <thead>
          <tr>
            <th>Pokemon</th>
            <th>Count</th>
          </tr>
        </thead>

        <tbody>
          {data.pokemons.results.map(item => (
            <tr key={item.name}>
              <td>
                <BoxPokemon pokemon={item} />
              </td>
              <td>
                (owned: {checkOwned(item)})
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-group">
        <PagingButton type="button" disabled={data.pokemons.nextOffset === 10} onClick={() => handlePagination(data.pokemons.prevOffset)}>Previous</PagingButton>
        <PagingButton type="button" onClick={() => handlePagination(data.pokemons.nextOffset)}>Next</PagingButton>
      </div>
    </PokemonListStyle>
  )
}

export default PokemonList