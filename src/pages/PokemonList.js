import styled from '@emotion/styled';
import {
  useQuery,
  gql,
} from "@apollo/client";
import { getMyPokemonList } from '../utils/LocalStorage'
import { useEffect, useRef, useState } from "react";
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
    margin: 1rem 0;

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

const ObserveableElement = (props) => {
  const elementRef = useRef(null)

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      props.handler(props.payload)
      self.unobserve(entry.target)
    })
  })

  useEffect(() => {
    if (!elementRef.current) return
    observer.observe(elementRef.current)
  }, [elementRef])

  return (
    <div ref={elementRef}>
      {props.children}
    </div>
  )
}

const PokemonList = () => {
  // const containerRef = useRef(null)
  // const [firstRequestFinished, setFirstRequestFinished] = useState(false)

  // const callbackFunction = (x, y) => {
  //   console.log(firstRequestFinished, x, y)
  //   if (!firstRequestFinished) return
  //   console.log('FIRED')
  //   // handlePagination(data.pokemons.nextOffset)
  // }

  // const options = {
  //   root: null,
  //   rootMargin: '0px',
  //   threshold: 1.0,
  // }

  // useEffect(() => {
  //   const observer = new IntersectionObserver(callbackFunction, options)
  //   if (containerRef.current) observer.observe(containerRef.current)

  //   // return (() => {
  //   //   if (containerRef.current) observer.unobserve(containerRef.current)
  //   // })

  // }, [containerRef, options])

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
      limit: 20,
      offset: 0
    },
  });

  const handlePagination = (paging) => {
    // console.log(data.pokemons.results.length, paging)
    const pagingIsLastIndex = paging.index === (data.pokemons.results.length - 1)
    if (!pagingIsLastIndex) return

    fetchMore({
      variables: { offset: paging.nextOffset, limit: 20 },
      updateQuery: (prevResults, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResults

        fetchMoreResult.pokemons.results = [
          ...fetchMoreResult.pokemons.results,
          ...prevResults.pokemons.results,
        ]

        console.log(fetchMoreResult.pokemons.results)

        // return fetchMoreResult
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
          {data.pokemons.results.map((item, index) => (
            <tr key={item.name}>
              <td>
                <ObserveableElement handler={handlePagination} payload={{
                  index,
                  nextOffset: data.pokemons.nextOffset,
                }}>
                  <BoxPokemon pokemon={item} />
                </ObserveableElement>
              </td>
              <td>
                (owned: {checkOwned(item)})
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {firstRequestFinished &&
        <div className="button-group" ref={containerRef}>
          <button type="button" disabled={data.pokemons.nextOffset === 10} onClick={() => handlePagination(data.pokemons.prevOffset)}>Previous</button>
          <button type="button" onClick={() => handlePagination(data.pokemons.nextOffset)}>Next</button>
        </div>
      } */}
    </PokemonListStyle>
  )
}

export default PokemonList