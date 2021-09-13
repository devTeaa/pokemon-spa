import {
  useQuery,
  gql
} from "@apollo/client";
import styled from "@emotion/styled"

const BoxPokemonDiv = styled.div`
  display: flex;
  align-items: center;
`

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
    <BoxPokemonDiv className="pokemon-box">
      <img alt="sprite" src={data.pokemon.sprites.front_default} />
      <span>{props.pokemon.pokemonName}</span>
    </BoxPokemonDiv>
  )
}

export default BoxPokemon
