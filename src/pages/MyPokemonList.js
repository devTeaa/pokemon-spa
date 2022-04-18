import { useState } from "react";

import BoxPokemon from "../components/BoxPokemon"

import { getMyPokemonList } from '../utils/LocalStorage'
import styled from "@emotion/styled";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { PokemonListContainer } from '../sharedStyled'

const ReleaseButton = styled.button`
  background-color: #303030;
  text-align: center;
  border: none;
  padding: 8px;
  display: block;
  width: 100%;
  color: #ffffff;
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
    <PokemonListContainer>
      {myPokemonListStorage.map(item => (
        <span>
          <BoxPokemon pokemon={item} hanndleRelease={handleRelease}/>
          <ReleaseButton type="button" onClick={() => handleRelease(item)}>Release</ReleaseButton>
        </span>
      ))}
    </PokemonListContainer>
    // <section>
    //   <MyPokemonListTable>
    //     <thead>
    //       <tr>
    //         <th>Pokemon</th>
    //         <th>Action</th>
    //       </tr>
    //     </thead>

    //     <tbody>
    //       {
    //         myPokemonListStorage.map(item => (
    //           <tr key={item.pokemonName}>
    //             <td>
    //               <BoxPokemon pokemon={item} handleRelease={handleRelease} />
    //             </td>
    //             <td>
    //               <button type="button" onClick={() => handleRelease(item)}>Release</button>
    //             </td>
    //           </tr>
    //         ))
    //       }
    //     </tbody>
    //   </MyPokemonListTable>
    // </section>
  )
}

export default MyPokemonList