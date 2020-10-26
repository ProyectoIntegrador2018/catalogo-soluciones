import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Header from './components/header/header.component';

import SignInPage from './pages/sign-in/sign-in.component';
import SignUpPage from './pages/sign-up/sign-up.component';
import HomePage from './pages/homepage/home.component';
import Catalogo from './pages/catalogo/catalogo.component';
import Administrador from './pages/administrador/administrador.component';

import { auth } from './firebase/firebase';
import { getUserRef } from './firebase/sessions';
import { getCatalogData } from './firebase/catalog';
import { setCurrentUser } from './redux/user/user.actions';
import { setSolutions } from './redux/solutions/solutions.actions';
import { setOrganizations } from './redux/organizations/organizations.actions';

import CreateSolutionPage from './pages/crear-solucion/crear-solucion.component';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, setSolutions, setOrganizations } = this.props;

    getCatalogData('solutions').then((solutions) => {
      setSolutions(solutions);
    });

    getCatalogData('users').then((organizations) => {
      setOrganizations(organizations);
    });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth && userAuth.emailVerified) {
        const userRef = await getUserRef(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(null);
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
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? <Redirect to='/' /> : <SignInPage />
            }
          />
          <Route
            exact
            path='/signup'
            render={() =>
              this.props.currentUser ? <Redirect to='/' /> : <SignUpPage />
            }
          />
          <Route
            exact
            path='/admin'
            render={() =>
              this.props.currentUser && this.props.currentUser.adminAccount ? (
                <Administrador />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            exact
            path='/crear-solucion'
            render={() =>
              this.props.currentUser && !this.props.currentUser.adminAccount ? (
                <CreateSolutionPage />
              ) : (
                <Redirect to='/' />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user, organizations, solutions }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setOrganizations: (organizations) =>
    dispatch(setOrganizations(organizations)),
  setSolutions: (solutions) => dispatch(setSolutions(solutions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
