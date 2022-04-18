import styled from '@emotion/styled';

const PokemonListContainer = styled.section`
  padding-top: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;

  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`

export {
  PokemonListContainer
}