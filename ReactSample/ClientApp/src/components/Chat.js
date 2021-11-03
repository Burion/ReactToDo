import React, { Component } from 'react'
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr'

export class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nick: '',
            message: '',
            messages: [],
            hubConnection: null,

        }
        
    }

    componentDidMount = () => {
        const nick = window.prompt('Your name:', 'John');

        const hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/chat')
            .withAutomaticReconnect()
            .build()


        this.setState({ hubConnection, nick },
            () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                    .catch(err => console.log('Error while establishing connection'))   

                this.state.hubConnection.on('ReceiveMessage', message => {
                const text = `${message.user} : ${message.message}`;
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });
            });
            }
        )


       
    }

    render() {
        return (
            <div>
                <br />
                <input
                    type="text"
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                />

                <button onClick={ async () => {
                    const chatMessage = {
                        user: this.state.nick,
                        message: this.state.message
                    }
                    //this.state.hubConnection
                    //    .invoke('ReceiveMessage', this.state.nick, this.state.message)
                    //    .catch(err => console.error(err));

                    if (this.state.hubConnection.connectionStarted) {
                        try {
                            await this.state.hubConnection.send('SendMessage', chatMessage)
                        }
                        catch (e) {
                            console.log(e);
                        }
                    }
                    this.setState({ message: '' })
                }}
                    >Send</button>

                <div>
                    {this.state.messages.map((message, index) => (
                        <span style={{ display: 'block' }} key={index}> {message} </span>
                    ))}
                </div>
                <div>
                    <label>Hello there</label>
                </div>
            </div>
        );
    }
}