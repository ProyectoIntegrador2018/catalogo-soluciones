import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/home.component';
import Catalogo from './pages/catalogo/catalogo.component';
import Registro from './pages/registro/registro.component';

import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  unsubscribeFromAuth = null;

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        console.log('user is logged in');
      } else {
        console.log('user is not logged in');
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/catalogo' component={Catalogo} />
          <Route exact path='/registro' component={Registro} />
          <Route exact path='/signin' render={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
