import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { ShowForAuthorized } from '../handlers/ShowForAuthorized'
import { RegularNavMenu } from './RegularNavMenu'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Home } from './Home'
import { FetchData } from './FetchData'
import { Counter } from './Counter'
import { Chat } from './Chat'
import { Register } from './register/Register'
import { Login } from './login/Login'
import { ShowForUnAuthorized } from '../handlers/ShowForUnAuthorized'
import { GuestLayout } from './GuestLayout'
import { RegularLayout } from './RegularLayout'

export class MainLayout extends Component {
  static displayName = RegularLayout.name;

  render () {
    return (
      <div>
        <ShowForAuthorized>
          <RegularLayout parent={this}/>
        </ShowForAuthorized>
        <ShowForUnAuthorized>
          <GuestLayout parent={this}/>
        </ShowForUnAuthorized>
      </div>
    );
  }
}
