import React, { Component } from 'react'
import '../css/style.css'
import EditImage from '../img/edit.svg'
import { Route, Link } from "react-router-dom"
import { withRouter } from "react-router";

export class Card extends Component {

    constructor(props) {
        super(props)

        this.state = {
            model: props.model
        }

        this.showModal = props.showModal
    }

    componentDidUpdate(prevprops, prevstate) {
        if(prevprops.model != this.props.model) {
            this.setState({
                model: this.props.model
            })
        }
    }

    addNewCard = (card) => {
        this.setState(prev => {
            let prevLists = prev.lists
            prevLists.forEach(list => {
                if(list.id == card.listId) {
                    list.cards.push(card)
                }
            });

            return {
                lists: prevLists
            }
        })
    }    

    startDragging = (event) => {
        event.dataTransfer.setData('id', this.state.model.id)
    }
    

    render() {
        return (
            <div title={this.state.model.description} onDragStart={this.startDragging} onClick={() => {this.showModal(this.state.model)}} title={this.state.model.description} class="board-list-item" draggable="true" id={`card-${this.state.model.id}`}>
                <label class="board-list-item-label" for="">{this.state.model.name}</label>
                <label class="board-list-item-label" for="">{this.state.model.date}</label>
            </div>
        )                                  
    }
}