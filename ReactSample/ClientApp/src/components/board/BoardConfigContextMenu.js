import React, { Component } from 'react'
import '../css/style.css'


export class BoardConfigContextMenu extends Component {

    constructor(props) {
        super(props)

        this.position = props.position
        this.hideContext = props.hideContext
        this.startEditingName = props.startEditingName
        this.showImagesModal = props.showImagesModal
    }

    componentDidMount = async () => {
        const format = 'px'
        let context = document.getElementById('board-context-menu')

        context.style.left = this.position.left + format
        context.style.top = this.position.top + format
        
        context.addEventListener('mouseleave', (event) =>  { this.hideContext() })
    }
    
    render() {
        return (
            <div id='board-context-menu' class="context-card">
                <div onClick={() => {this.startEditingName(); this.hideContext()}} class="context-card-item">
                    <div class="context-card-item-label">
                        Edit
                    </div>
                </div>
                <div onClick={() => this.showImagesModal()} class="context-card-item">
                    <div class="context-card-item-label">
                        Back
                    </div>
                </div>
                <div class="context-card-item">
                    <div class="context-card-item-label-delete">
                        Quit
                    </div>
                </div>
            </div>
    )
    }
}