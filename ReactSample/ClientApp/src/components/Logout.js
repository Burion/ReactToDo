import React, { SyntheticEvent, Component } from 'react'
import { Redirect } from 'react-router-dom'
import App from '../App'
import AuthManager from '../handlers/AuthManager'

export class Logout extends Component {

    constructor(props) {
        super(props)
        this.parent = props.parent
    }

    componentDidMount = () => {
        this.performLogoutAndUpdate()
    }

    performLogout = async () => {
        var authManager = new AuthManager()
        await authManager.logout()
    }

    performLogoutAndUpdate = async () => {
        await this.performLogout()
        this.parent.forceUpdate()
    }

    render() {
        return (
            <Redirect to="/"></Redirect>
        )
    }
}