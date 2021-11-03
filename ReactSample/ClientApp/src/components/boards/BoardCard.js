import React, { Component } from 'react'
import '../css/style.css'
import { BoardContextMenu } from './BoardContextMenu'
import EditImage from '../img/edit.svg'
import { Board } from '../board/Board'
import { Route, Link } from "react-router-dom"


export class BoardCard extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            id: props.model.id,
            name: props.model.name,
            showContext: false,
            isEditing: false,
            position: {
                x: 0, 
                y: 0
            }
        }

        this.deleteBoard = props.deleteBoard
        this.updateBoard = props.updateBoard
    }

    hideContext = () => {
        this.setState({
            showContext: false
        })
    }

    showContext = () => {
        this.setState({
            showContext: true
        })
    }

    startEditing = async () => {
        await this.setState({
            isEditing: true
        })
        var input = document.getElementById(`card-name-input-${this.state.id}`)
        input.focus()
        input.addEventListener('focusout', (e) => { this.stopEditing() })
        
    }

    stopEditing = async () => {
        await this.setState({
            isEditing: false
        })

        this.updateBoard({
            id: this.state.id,
            name: this.state.name, 
            imageId: this.state.image
        })
    }

    componentDidMount = () => {
        var card = document.getElementById(`board-card-${this.state.id}`)
        this.state.position.x = card.style.left
        this.state.position.y = card.style.top
    }

    deleteBoard = (id) => {
        this.deleteBoard(id)
    }

    
    render() {
        return (
            <div id={`board-card-${this.state.id}`} class="board-card">
            {
                this.state.isEditing 
                ?
                <div class="board-card-header">
                        <input id={`card-name-input-${this.state.id}`} class="settings-item-input-outline" 
                        onChange={(e) => { this.setState({name: e.target.value}) }} 
                        value={this.state.name}
                        focusout={this.stopEditing}
                        type="text"></input>
                </div>
                    :
                <div class="board-card-header">
                    <label id='board-name' class="board-card-header-label">{this.state.name}</label>
                    <img id={`edit-click-${this.state.id}`} onClick={() => {this.showContext()}} class='edit-icon' src={EditImage}/>
                </div>
            }
            
            <Link to={
                {
                    pathname: '/board',
                    state: {
                        boardId: this.state.id
                    }
                }
            }>
                <div class="board-card-body back-image pointable"></div>
            </Link>
                {
                    this.state.showContext &&
                    !this.state.isEditing &&
                        <BoardContextMenu
                        deleteBoard={this.deleteBoard} 
                        startEditing={this.startEditing}
                        hideContext={this.hideContext} 
                        card={{id: this.state.id }} 
                        position={ 
                            {
                                x: this.state.position.x, 
                                y: this.state.position.y 
                            } }
                        />
                }
            </div>
        )
    }
}