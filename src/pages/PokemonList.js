import { Link } from "react-router-dom"
import styled from '@emotion/styled';
import {
  useQuery,
  gql
} from "@apollo/client";

const PokemonListStyle = styled.section`
  > table {
    width: 100%;

    td > img {
      max-height: 80px;
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

const PokemonList = () => {
  const POKEMON_LIST = gql`
    query GetPokemonList($limit: Int!, $offset: Int!) {
      pokemons(limit: $limit, offset: $offset) {
        prevOffset
        nextOffset,
        results {
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
            <th />
            <th>Pokemon Name</th>
            <th>Count</th>
          </tr>
        </thead>

        <tbody>
          {data.pokemons.results.map(item => (
            <tr key={item.name}>
              <td>
                <img alt="sprite" src={item.image} />
              </td>
              <td>
                <Link to={'/detail/' + item.name}>
                  {item.name}
                </Link>
              </td>
              <td>
                (owned: 0)
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-group">
        <button type="button" disabled={data.pokemons.nextOffset === 10} onClick={() => handlePagination(data.pokemons.prevOffset)}>Previous</button>
        <button type="button" onClick={() => handlePagination(data.pokemons.nextOffset)}>Next</button>
      </div>
    </PokemonListStyle>
  )
}

export default PokemonList