import React, { Component } from 'react';
import UserHandler from '../handlers/UserHandler'

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
    }


    async sendRequest() {
        var jwt = 'Bearer ' + document.cookie.split('; ')
            .find(row => row.startsWith('jwt='))
            .split('=')[1];

        const response = await fetch('api/chats', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': jwt
            }
        })
        const data = await response.json()
        var userHandler = new UserHandler()

        console.log(userHandler.parseJwt(jwt))
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

            <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
            <button className="btn btn-primary" onClick={this.sendRequest}>Send</button>
      </div>
    );
  }
}
