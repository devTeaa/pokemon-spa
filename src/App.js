import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import PokemonList from './pages/PokemonList'
import PokemonDetail from './pages/PokemonDetail'
import MyPokemonList from './pages/MyPokemonList'
import styled from "@emotion/styled"

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const AppContainer = styled.div`
  margin: 0 1rem 1rem 1rem;
`

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.graphcdn.app/',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <section className="App">
          <Header />

          <AppContainer>
            <Route path="/" exact component={PokemonList} />
            <Route path="/detail/:name" component={PokemonDetail} />
            <Route path="/my-pokemon" component={MyPokemonList} />
          </AppContainer>
        </section>
      </Router>
    </ApolloProvider>
  );
}

export default App;
