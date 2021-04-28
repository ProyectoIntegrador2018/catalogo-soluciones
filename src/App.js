import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import ScrollToTop from './components/scroller/scroller.component';
import BackToTop from './components/scroller/scroll-to-top.component';
import Notification from './components/notifications/notification.component';

import SignInPage from './pages/sign-in/sign-in.component';
import SignUpPage from './pages/sign-up/sign-up.component';
import SignUpOrgPage from './pages/sign-up-org/sign-up-org.component';
import HomePage from './pages/homepage/home.component';
import Catalogo from './pages/catalogo/catalogo.component';
import Dashboard from './pages/dashboard/dashboard.component';
import PanelAdmin from './pages/panel-admin/panel-admin.component';
import PanelOrg from './pages/panel-org/panel-org.component';
import SolutionInquiry from './components/solution-inquiry/solution-inquiry.component';
import CustomInquiry from './components/custom-inquiry/custom-inquiry.component';

import { auth } from './firebase/firebase';
import { getUserRef } from './firebase/sessions';
import { getCatalogData } from './firebase/catalog';
import { setCurrentUser } from './redux/user/user.actions';
import {
  setSolutions,
  pairOrganizationsWithSolutions,
} from './redux/solutions/solutions.actions';
import { setOrganizations } from './redux/organizations/organizations.actions';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Pending from './pages/account-status/pending.component';
import Rejected from './pages/account-status/rejected.component';
import ACCOUNT_STATUS from './constants/account-status';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {
      setCurrentUser,
      setSolutions,
      setOrganizations,
      pairOrganizationsWithSolutions,
    } = this.props;

    // Fetch catalog data and fill state with it. It's necessary to first fetch the solutions
    // and then the organizations. When retrieving organizations, we look up all the solutions
    // that have that organization id to populate those missing fields in solution.
    getCatalogData('solutions').then((solutions) => {
      setSolutions(solutions);

      getCatalogData('users').then((organizations) => {
        pairOrganizationsWithSolutions(organizations);
        setOrganizations(organizations.filter((org) => org.orgAccount));
      });
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

  theme = createMuiTheme({
    palette: {
      primary: {
        main: '#E0663B',
      },
      secondary: {
        main: '#5D5B5B',
      },
    },
  });

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  pageAuthorizer(render) {
    const callback = () => {
      const { currentUser } = this.props;
      if (!currentUser) return <Redirect to='/' />;
      if (!currentUser.orgAccount) return render();
      switch (currentUser.status) {
        case ACCOUNT_STATUS.Approved:
          return render();
        case ACCOUNT_STATUS.Rejected:
          return <Redirect to='/rejected' />;
        case ACCOUNT_STATUS.Pending:
          return <Redirect to='/pending' />;
        default:
          throw Error('Unknown status');
      }
    };
    return callback;
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <Header id='back-to-top-anchor' />
        <div className='switch'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route
              exact
              path='/catalogo/:selectedCategory/:selectedSubcategory?'
              render={this.pageAuthorizer(() => (
                <Catalogo />
              ))}
            />
            <Route
              exact
              path='/solution-inquiry'
              render={this.pageAuthorizer(() => (
                <SolutionInquiry />
              ))}
            />
            <Route
              exact
              path='/custom-inquiry'
              render={this.pageAuthorizer(() => (
                <CustomInquiry />
              ))}
            />
            <Route
              exact
              path='/dashboard/:categoryIndex?'
              component={Dashboard}
            />
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
              path='/signup-org'
              render={() =>
                this.props.currentUser ? <Redirect to='/' /> : <SignUpOrgPage />
              }
            />
            <Route exact path='/pending' render={() => <Pending />} />
            <Route
              exact
              path='/rejected'
              render={() => <Rejected currentUser={this.props.currentUser} />}
            />
            <Route
              exact
              path='/panel-admin'
              render={() =>
                this.props.currentUser &&
                this.props.currentUser.adminAccount ? (
                  <PanelAdmin />
                ) : (
                  <Redirect to='/' />
                )
              }
            />
            <Redirect from='/panel-org-x' to='/panel-org' />
            <Route
              exact
              path='/panel-org'
              render={() =>
                this.props.currentUser && this.props.currentUser.orgAccount ? (
                  <PanelOrg />
                ) : (
                  <Redirect to='/' />
                )
              }
            />
          </Switch>
        </div>
        <Footer />
        <ScrollToTop />
        <BackToTop />
        <Notification />
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  setOrganizations: (organizations) =>
    dispatch(setOrganizations(organizations)),
  setSolutions: (solutions) => dispatch(setSolutions(solutions)),
  pairOrganizationsWithSolutions: (organizations) =>
    dispatch(pairOrganizationsWithSolutions(organizations)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
