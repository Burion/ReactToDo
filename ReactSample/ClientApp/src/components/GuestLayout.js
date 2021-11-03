import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { GuestNavMenu } from './GuestNavMenu';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Home } from './Home'
import { FetchData } from './FetchData'
import { Counter } from './Counter'
import { Register } from './register/Register'
import { Login } from './login/Login'

export class GuestLayout extends Component {
  
  constructor(props) {
    super(props)
    this.parent = props.parent
  }


  static displayName = GuestLayout.name;

  render () {
    return (
      <div>
        <GuestNavMenu />
        <div>
          <Route exact path='/' render={(props) => (<Login parent={this.parent}/>)} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />
          <Route path='/register' component={Register} />
          <Route path='/login' render={(props) => (<Login parent={this.parent}/>)} />
        </div>
      </div>
    );
  }
}
