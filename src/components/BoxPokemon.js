import {
  useQuery,
  gql
} from "@apollo/client";
import styled from "@emotion/styled"
import { Link } from "react-router-dom"

const BoxPokemonDiv = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  &:before {
    content: '';
    display: block;
    position: absolute;
    background-image: url('/pokeball-logo.svg');
    top: 0;
    left: 0;
    opacity: 0.6;
    width: 60px;
    height: 60px;
  }

  > img {
    position: relative;
    max-width: 80px;
  }

  > div {
    padding-left: 4px;

    span {
      font-family: Consolas;
      color: #FDFDFD;
    }

    a {
      font-size: 0.7rem;
      background-color: #38B0B8;
      text-decoration: none;
      padding: 2px 4px 4px 4px;
      color: #FDFDFD;
    }
  }
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
      <div>
        <span>{props.pokemon.pokemonName}</span>
        <br />
        <Link to={'/detail/' + props.pokemon.name}>Detail</Link>
      </div>
    </BoxPokemonDiv>
  )
}

export default BoxPokemon
