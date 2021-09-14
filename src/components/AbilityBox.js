import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  useQuery,
  gql
} from '@apollo/client'

const AbilityDiv = styled.div`
  border: 1px solid #303030;
  background-color: #F0f0f0;
  border-radius: 4px;
  font-family: Consolas;
  text-transform: capitalize;
  display: flex;
  flex-direction: column;

  > span,
  > p {
    padding: 2px 4px;
  }

  > span {
    border-bottom: 1px solid #303030;
  }

  > p {
    margin: 0;
    font-size: 0.8em;
  }
`

const AbilityBox = (props) => {
  const ABILITY_DESC = gql`
    query GetAbility($ability: String!) {
      ability(ability: $ability) {
        response
      }
    }
  `

  const { loading, error, data } = useQuery(ABILITY_DESC, {
    variables: {
      ability: props.ability.name
    }
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  return (
    <AbilityDiv>
      <span>{props.ability.name}</span>
      <p>{data.ability.response.effect_entries.find(item => item.language.name === 'en').short_effect}</p>
    </AbilityDiv>
  )
}

AbilityBox.propTypes = {
  ability: PropTypes.shape({
    name: PropTypes.string.isRequired,
  })
}

export default AbilityBox
