import React, { Component } from 'react';
import asyncComponent from './HOC/asyncComponent/asyncComponent';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Redirect, Route, Switch, withRouter } from 'react-router';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as action from './Store/actions/index';

const asyncCheckout = asyncComponent(()=> {
  return import('./containers/Checkout/Checkout');
})

const asyncOrder = asyncComponent(()=> {
  return import('./containers/Orders/Orders');
})

const asyncAuth = asyncComponent(()=> {
  return import('./containers/Auth/Auth');
})


class App extends Component {

  componentDidMount = () => {
    this.props.onTryAutoSingup();
  }

  render() {

    let route = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} exact />
        <Redirect to="/" />
      </Switch> 
    )
    
    if(this.props.isAuthenticated) {
      route = (<Switch>
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrder} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} exact />
        <Redirect to="/" />
      </Switch>)
    }

    return (
      <div>
        <Layout>
          {route}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return  {
    onTryAutoSingup : () => dispatch(action.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
