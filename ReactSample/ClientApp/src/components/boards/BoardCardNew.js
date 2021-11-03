import React, { Component } from 'react'
import '../css/style.css'


export class BoardCardNew extends Component {

    constructor(props) {
        super(props)
        this.addNewBoard = props.addNewBoard   
    }
    
    render() {
        return (
            <div onClick={() => {this.addNewBoard({ name: 'New board', id: `${Math.random(1,1000)}`})}} class="board-card pointable">
                <div class="board-card-body-new">
                    <label class="board-card-body-new-plus">+</label>
                </div>
            </div>
        )
    }
}