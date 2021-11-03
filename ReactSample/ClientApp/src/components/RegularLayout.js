import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { RegularNavMenu } from './RegularNavMenu'
import { Route, useParams } from "react-router-dom"
import { Home } from './Home'
import { FetchData } from './FetchData'
import { Counter } from './Counter'
import { Chat } from './Chat'
import { Register } from './register/Register'
import { Logout } from './Logout'
import { Boards } from './boards/Boards'
import { Board } from './board/Board'

export class RegularLayout extends Component {
  static displayName = RegularLayout.name;

  constructor(props) {
    super(props)  
  }

  componentDidMount = () => {
  }
  
  render () {
    return (
      <div>
        <RegularNavMenu />
          <Route exact path='/' component={Boards} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />
          <Route path='/chat' component={Chat} />
          <Route path='/register' component={Register} />
          <Route path='/boards' component={Boards} />
          <Route path='/logout' render={(props) => (<Logout parent={this.parent}/>)} />
          <Route name='board' path='/:boardId' component={Board}/>
      </div>
    );
  }
}
