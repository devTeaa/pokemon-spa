import styled from "@emotion/styled"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const PokeballButton = styled.button`
  display: inline-flex;
  align-items: center;

  > img {
    width: 40px;
  }
`

const CatchPokemon = (props) => {
  const MySwal = withReactContent(Swal)

  const catchPokemon = () => {
    if (Math.random() >= 0.5) {
      MySwal.fire({
        icon: 'error',
        title: 'Failed to catch',
        timer: 1500,
        showConfirmButton: false,
      })

      return
    }

    MySwal.fire({
      icon: 'success',
      title: 'Pokemon has been caught',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      MySwal.fire({
        title: 'Input pokemon name',
        text: '(must be unique)',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: (myPokemonName) => {
          try {
            const myPokemonList = JSON.parse(window.localStorage.getItem('myPokemonList') || '[]')

            if (myPokemonList.map(item => item.pokemonName).indexOf(myPokemonName) !== -1) {
              throw new Error('Please choose a different name')
            }

            window.localStorage.removeItem('myPokemonList')
            window.localStorage.setItem('myPokemonList', JSON.stringify([
              ...myPokemonList,
              {
                pokemonName: myPokemonName,
                id: props.pokemon.id,
                name: props.pokemon.name,
              },
            ]))
          } catch {
            MySwal.showValidationMessage(
              'Pokemon name already exist'
            )
          }

        },
        allowOutsideClick: () => !MySwal.isLoading()
      }).then(result => {
        if (result.isConfirmed) {
          MySwal.fire({
            icon: 'success',
            title: 'Pokemon has been saved',
          })
        }
      })
    })
  }

  return (
    <div>
      <PokeballButton onClick={() => catchPokemon()}>
        <img alt="pokeball" src='/pokeball-logo.svg' />
      </PokeballButton>
    </div>
  )
}

export default CatchPokemon
