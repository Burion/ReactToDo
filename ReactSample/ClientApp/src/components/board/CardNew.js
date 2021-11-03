import React, { Component } from 'react'
import '../css/style.css'
import EditImage from '../img/edit.svg'
import { Route, Link } from "react-router-dom"
import { withRouter } from "react-router";

export class CardNew extends Component {

    constructor(props) {
        super(props)

        this.listId = props.listId

        this.addNewCard = props.addNewCard
    }


    render() {
        return (
            <div onClick={() => {this.addNewCard({ id: Math.random().toString(), name: 'New card', date: '12/04/21', listId: this.listId})}}  class="board-list-item-new">
                <div class="board-list-item-new-plus">
                    +
                </div>
            </div>
        )                                  
    }
}