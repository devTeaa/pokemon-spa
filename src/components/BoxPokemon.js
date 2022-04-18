import PropTypes from 'prop-types'
import {
  useQuery,
  gql
} from "@apollo/client";
import styled from "@emotion/styled"
import { Link } from "react-router-dom"

const BoxPokemonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 80px;
  background-color: #A82F2F;
  padding: 20px;
  color: #fff;

  &.tamed:before {
    content: '';
    display: block;
    position: absolute;
    background-image: url('/pokemon-spa/pokeball-logo.svg');
    top: 0;
    left: 0;
    opacity: 0.4;
    width: 120px;
    height: 120px;
  }

  > img {
    position: relative;
    max-width: 96px;
  }

  > div {
    padding-left: 4px;

    > *:not(:first-child) {
      margin-left: 8px;
    }

    .box-label {
      font-family: Consolas;
    }

    a {
      font-size: 0.7rem;
      background-color: #38B0B8;
      text-decoration: none;
      padding: 2px 4px 4px 4px;
      color: #fff;
    }
  }

  &:not(.tamed) {
    .box-label {
      text-transform: capitalize;
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

  const pokemonIsTame = !!props.pokemon.pokemonName

  const { loading, error, data } = useQuery(POKEMON_DETAIL, {
    variables: {
      name: props.pokemon.name
    }
  })

  if (loading) return <></>
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  return (
    <BoxPokemonDiv className={
      `pokemon-box ${pokemonIsTame && 'tamed'}`
    }>
      <img alt="sprite" src={data.pokemon.sprites.front_default} />
      <div>
        <span className="box-label">{props.pokemon.pokemonName || props.pokemon.name}</span>
        <Link to={'/pokemon-spa/detail/' + props.pokemon.name}>Detail</Link>
      </div>
    </BoxPokemonDiv>
  )
}

BoxPokemon.propTypes = {
  pokemon: PropTypes.shape({
    pokemonName: PropTypes.string,
    name: PropTypes.string.isRequired,
  })
}

export default BoxPokemon
