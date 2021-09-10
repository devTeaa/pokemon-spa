import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './components/Header'
import PokemonList from './pages/PokemonList'
import PokemonDetail from './pages/PokemonDetail'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" exact component={PokemonList} />
        <Route path="/detail/:id" component={PokemonDetail} />
      </div>
    </Router>
  );
}

export default App;
