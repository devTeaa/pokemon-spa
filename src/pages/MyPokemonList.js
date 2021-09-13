import { useState } from "react";

import BoxPokemon from "../components/BoxPokemon"

import { getMyPokemonList } from '../utils/LocalStorage'
import styled from "@emotion/styled";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MyPokemonListTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;

  tbody > tr {
    background: rgb(48,216,80);
    background: linear-gradient(0deg, rgba(48,216,80,1) 0%, rgba(16,168,64,1) 37%, rgba(16,168,64,1) 100%);
    border-spacing: 1rem;

    td {
      border: none;

      > button {
        font-family: Consolas;
        border: none;
        background-color: #303030;
        padding: 8px;
        color: #FDFDFD;
      }
    }
  }
`

const MyPokemonList = () => {
  const MySwal = withReactContent(Swal)
  const [myPokemonListStorage, setMyPokemonListStorage] = useState(getMyPokemonList())

  const handleRelease = (pokemon) => {
    MySwal.fire({
      icon: 'question',
      text: 'Are you sure you want to release this pokemon?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      preConfirm: () => {
        window.localStorage.removeItem('myPokemonList')

        const newMyPokemonListStorage = myPokemonListStorage.filter(item => item.pokemonName !== pokemon.pokemonName)

        window.localStorage.setItem('myPokemonList', JSON.stringify(newMyPokemonListStorage))
        setMyPokemonListStorage(newMyPokemonListStorage)

        MySwal.fire({
          icon: 'success',
          title: 'Pokemon has been released',
        })
      }
    })
  }

  return (
    <section>
      <MyPokemonListTable>
        <thead>
          <tr>
            <th>Pokemon</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            myPokemonListStorage.map(item => (
              <tr key={item.pokemonName}>
                <td>
                  <BoxPokemon pokemon={item} handleRelease={handleRelease} />
                </td>
                <td>
                  <button type="button" onClick={() => handleRelease(item)}>Release</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </MyPokemonListTable>
    </section>
  )
}

export default MyPokemonList