import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import PokemonList from './pages/PokemonList'
import PokemonDetail from './pages/PokemonDetail'
import MyPokemonList from './pages/MyPokemonList'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.graphcdn.app/',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={PokemonList} />
          <Route path="/detail/:name" component={PokemonDetail} />
          <Route path="/my-pokemon" component={MyPokemonList} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
