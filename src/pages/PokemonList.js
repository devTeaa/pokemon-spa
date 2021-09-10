import './PokemonList.scss'
import { useEffect, useState } from "react"

const PokemonList = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [paginationCount, setPaginationCount] = useState(0)
  const [pokemonList, setPokemonList] = useState([])

  const fetchPokemon = async (paging) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${paging * 10}`)
    const data = await res.json()

    return data
  }

  const handlePagination = async (value) => {
    setIsLoading(true)
    const data = await fetchPokemon(paginationCount + value)

    setPokemonList(data.results)
    setPaginationCount(paginationCount + value)
    setIsLoading(false)
  }

  useEffect(() => {
    const getPokemon = async () => {
      setIsLoading(true)
      const data = await fetchPokemon(0)

      setPokemonList(data.results)
      setIsLoading(false)
    }

    getPokemon()
  }, [])

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Pokemon Name</th>
            <th>Count</th>
          </tr>
        </thead>

        <tbody>
          {pokemonList.map(item => (
            <tr key={item.name}>
              <td>
                {item.name}
              </td>
              <td>
                (owned: 0)
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-group">

        <button disabled={paginationCount === 0 || isLoading} onClick={() => handlePagination(-1)}>Previous</button>

        <span>{paginationCount + 1}</span>

        <button disabled={isLoading} onClick={() => handlePagination(1)}>Next</button>
      </div>
    </section>
  )
}

export default PokemonList