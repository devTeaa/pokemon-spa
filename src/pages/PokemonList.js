import styled from '@emotion/styled';
import {
  useQuery,
  gql
} from "@apollo/client";
import { getMyPokemonList } from '../utils/LocalStorage'
import React, { useRef } from "react";
import BoxPokemon from "../components/BoxPokemon"
import { PokemonListContainer } from '../sharedStyled'

const PagingContainer = styled.div`
  display: flex;
  margin-top: 8px;
  grid-column: 1/-1;

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
      limit: 30,
      offset: 0
    },
  });

  const handlePagination = (offset) => {
    fetchMore({
      variables: { offset, limit: 30 },
      updateQuery: (prevResults, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResults

        return fetchMoreResult
      }
    })
  }


  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <PokemonListContainer>
      {data.pokemons.results.map(item => (
        <span>
          <BoxPokemon pokemon={item}/>
          (owned: {checkOwned(item)})
        </span>
      ))}

      <PagingContainer>
        <PagingButton type="button" disabled={data.pokemons.nextOffset === 10} onClick={() => handlePagination(data.pokemons.prevOffset)}>Previous</PagingButton>
        <PagingButton type="button" onClick={() => handlePagination(data.pokemons.nextOffset)}>Next</PagingButton>
      </PagingContainer>
    </PokemonListContainer>
  )
}

export default PokemonList