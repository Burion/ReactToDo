import React, { SyntheticEvent, Component } from 'react'

export class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            login: '',
            password: ''
        }

        this.submit = this.submit.bind(this)
    }

    async submit(e) {
        e.preventDefault()
        console.log(this.state.login)
        const respose = await fetch('https://localhost:5001/api/auth/register', {
            method: 'POST',
            headers: {
                'accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                login: this.state.login,
                password: this.state.password
            })
        })

        const content = await respose.json()
        console.log(content)
        
    }
    

    render() {
        return (
            <div>
                <form onSubmit={this.submit}>
                    <label>Login</label>
                    <input onChange={e => this.setState({ login: e.target.value })}></input>
                    <label>Password</label>
                    <input type="password" onChange={e => this.setState({ password: e.target.value })}></input>
                    <button>
                        Register
                    </button>
            </form>
            </div>
        )
    }
}