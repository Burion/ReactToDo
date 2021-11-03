import React, { Component } from 'react'
//import { Route } from 'react-router'
import { GuestLayout } from './components/GuestLayout'
import { RegularLayout } from './components/RegularLayout'
import { Home } from './components/Home'
import { FetchData } from './components/FetchData'
import { Counter } from './components/Counter'
import { Chat } from './components/Chat'
import { Register } from './components/register/Register'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import PublicRoutes from './routes/PublicRoutes';


import './custom.css'
import { Login } from './components/login/Login'
import { ShowForAuthorized, ShowForPermission } from './handlers/ShowForAuthorized'
import { ShowForUnAuthorized } from './handlers/ShowForUnAuthorized'
import { MainLayout } from './components/MainLayout'

export default class App extends Component {
  static displayName = App.name

  componentDidMount = () => { 

  }

  upadteLayout = () => {
    this.forceUpdate()
  }

  render () {
      return (
        <div>
            <Route path='/' component={MainLayout} />
        </div>
        // <div>
        //   <ShowForAuthorized>
        //     <RegularLayout>
        //       <Route exact path='/' component={Home} />
        //       <Route path='/counter' component={Counter} />
        //       <Route path='/fetch-data' component={FetchData} />
        //       <Route path='/chat' component={Chat} />
        //       <Route path='/register' component={Register} />
        //       <Route path='/login' component={Login} />
        //     </RegularLayout>
        //   </ShowForAuthorized>
        //   <ShowForUnAuthorized>
        //     <GuestLayout>
        //       <Route exact path='/' component={Home} />
        //       <Route path='/counter' component={Counter} />
        //       <Route path='/fetch-data' component={FetchData} />
        //       <Route path='/chat' component={Chat} />
        //       <Route path='/register' component={Register} />
        //       <Route path='/login' component={Login} />
        //     </GuestLayout>
        //   </ShowForUnAuthorized>
        // </div>
    );
  }
}
