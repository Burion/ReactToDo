import React, { Component } from 'react'
import '../css/style.css'


export class BoardContextMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            position: props.position,
            card: props.card
        }

        this.startEditing = props.startEditing
        this.hideContext = props.hideContext

        this.deleteBoard = props.deleteBoard
    }

    componentDidMount = async () => {
        var card = document.getElementById(`edit-click-${this.state.card.id}`).getBoundingClientRect()
        await this.setState({
                position: {
                    x: card.left,
                    y: card.top + window.scrollY
                }
            }
        )
        
        var context = document.getElementById(`context-menu-${this.state.card.id}`)
        context.style.left = this.state.position.x + 'px'
        context.style.top = this.state.position.y + 'px'

        context.addEventListener('mouseleave', (event) =>  { this.hideContext() })
    }
    
    render() {
        return (
            <div id={`context-menu-${this.state.card.id}`} class="context-card">
                <div onClick={() => {this.startEditing(); this.hideContext()}} class="context-card-item">
                    <div class="context-card-item-label">
                        Edit
                    </div>
                </div>
                <div onClick={() => {this.deleteBoard(this.state.card.id)}} class="context-card-item">
                    <div class="context-card-item-label-delete">
                        Delete
                    </div>
                </div>
            </div>
    )
    }
}