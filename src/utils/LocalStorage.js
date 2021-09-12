const getMyPokemonList = () => {
  return JSON.parse(window.localStorage.getItem('myPokemonList') || '[]')
}

export {
  getMyPokemonList
}
