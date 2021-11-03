import React, { SyntheticEvent, Component } from 'react'
import { Link } from 'react-router-dom'
import App from '../../App'
import AuthManager from '../../handlers/AuthManager'
import '../css/style.css'
import mainIcon from '../img/main-icon.svg'

export class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            login: '',
            password: ''
        }

        this.submit = this.submit.bind(this)
        this.parent = props.parent
    }

    async submit(e) {
        e.preventDefault()
        var authManager = new AuthManager()
        
        await authManager.login({
                login: this.state.login,
                password: this.state.password
            }
        )
        
        this.parent.forceUpdate()
    }
    
    render() {
        return (
            <div class="login-back">
                <div class="container">
                    <div class="login-container">
                        <form class="login-form" onSubmit={this.submit}>
                            <div class="img-goal-wrapper">
                                <img src={mainIcon} alt="" class="img-goal"/>
                            </div>
                            <div class="input-group">
                                <label for="" class="input-label">Login</label>
                                <input onChange={e => this.setState({login: e.target.value})} required type="text" class="input"/>
                            </div>
                            <div class="input-group">
                                <label for="" class="input-label">Password</label>
                                <input onChange={e => this.setState({ password: e.target.value })} required class="input" type="password"/>
                            </div>
                            <div class="input-button-wrapper">
                                <button type="submit" class="input-button">Login</button>
                            </div>
                            <div class="tip-label-container">
                                <div class="tip-label-wrapper">
                                    <label class='tip-label'>Don't have an account?</label>
                                </div>
                                <div class="tip-label-wrapper">
                                    <Link to='/register' className='tip-label tip-label-link'>Register</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}