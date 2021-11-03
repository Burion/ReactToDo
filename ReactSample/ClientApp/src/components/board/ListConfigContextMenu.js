import React, { Component } from 'react'
import '../css/style.css'


export class ListConfigContextMenu extends Component {

    constructor(props) {
        super(props)

        this.state = {
            model: props.model
        }
        
        this.position = props.position
        this.hideContext = props.hideContext
        this.startEditing = props.startEditing
        this.deleteList = props.deleteList
    }

    componentDidMount = async () => {
        const format = 'px'
        let context = document.getElementById('list-context-menu')

        context.style.left = this.position.left + format
        context.style.top = this.position.top + format
        
        context.addEventListener('mouseleave', (event) =>  { this.hideContext() })
    }
    
    render() {
        return (
            <div id='list-context-menu' class="context-card">
                <div onClick={() => {this.startEditing(); this.hideContext()}} class="context-card-item">
                    <div class="context-card-item-label">
                        Edit
                    </div>
                </div>
                <div onClick={() => {this.deleteList(this.state.model.id)}} class="context-card-item">
                    <div class="context-card-item-label-delete">
                        Delete
                    </div>
                </div>
            </div>
    )
    }
}