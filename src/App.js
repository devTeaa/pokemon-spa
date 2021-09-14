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

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: false,
          merge(existing, incoming, { args: { offset = 0 } }) {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
        }
      }
    }
  }
})

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.graphcdn.app/',
    cache,
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
