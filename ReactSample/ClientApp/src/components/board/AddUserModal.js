import React, { Component } from 'react'
import '../css/style.css'
import EditImage from '../img/edit.svg'
import { Route, Link } from "react-router-dom"
import { withRouter } from "react-router"
import BackImage from '../img/back.jpg'

export class AddUserModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            login: ''
        }
        this.position = props.position
        this.hideAddUserModal = props.hideAddUserModal
        this.addUser = props.addUser
    }

    componentDidMount = async () => {
        const format = 'px'

        let modal = document.getElementById('add-user-modal')

        modal.style.left = this.position.left + format
        modal.style.top = this.position.top + format
        
    }

    render() {
        return (
            <div id='add-user-modal' class="modal-add-user">
                <div class="modal-add-user-header">
                    <label class="modal-add-user-header-label" for="">Enter login</label>
                    <span onClick={() => this.hideAddUserModal()} class="close-add-user">&times;</span>
                </div>
                <input onChange={e => { this.setState({login: e.target.value}) }} class="modal-add-user-input"></input>
                <button onClick={() => {this.addUser(this.state.login); this.hideAddUserModal()}} class="modal-add-user-button">Add</button>
            </div>
        )                                  
    }
}