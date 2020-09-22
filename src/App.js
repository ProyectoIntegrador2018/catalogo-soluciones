import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/home.component';
import Catalogo from './pages/catalogo/catalogo.component';
import Registro from './pages/registro/registro.component';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/catalogo' component={Catalogo} />
          <Route exact path='/registro' component={Registro} />
        </Switch>
      </div>
    );
  }
}

export default App;
