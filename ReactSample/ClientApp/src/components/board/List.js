   import React, { Component } from 'react'
   import '../css/style.css'
   import EditImage from '../img/edit.svg'
   import { Route, Link } from "react-router-dom"
   import { withRouter } from "react-router"
   import { Card } from './Card'
   import { CardNew } from './CardNew'
import { ListConfigContextMenu } from './ListConfigContextMenu'
import ListManager from '../../handlers/ListManager'

   export class List extends Component {
   
        constructor(props) {
            super(props)

            this.state = {
                model: props.model, 
                isEditing: false,
                showContext: false
            }

            this.showModal = props.showModal
            this.addNewCard = props.addNewCard
            this.assignCardToList = props.assignCardToList
            this.deleteList = props.deleteList

            this.listManager = new ListManager()
        }

        componentDidUpdate(prevprops, prevstate) {
            if(prevprops.model != this.props.model) {
                this.setState({
                    model: this.props.model 
                })
            }
        } 

        drop = (event) => {
            let cardId = event.dataTransfer.getData('id')
            
            this.assignCardToList(parseInt(cardId), this.state.model.id)
        }
    
        allowDrop = (event) => {
            event.preventDefault()
        }
       
        startEditing = async () => {
            await this.setState({
                isEditing: true
            })

            var input = document.getElementById(`list-name-input`)
            input.focus()
            input.addEventListener('focusout', (e) => { this.stopEditing() })
        }

        stopEditing = async () => {
            await this.listManager.update(this.state.model)

            this.setState({
                isEditing: false
            })
        }

        showContext = () => {
            let editImage = document.getElementById(`edit-list-${this.state.model.id}`)
            let editImageBounds = editImage.getBoundingClientRect()
    
            let headerBounds = document.getElementById('header').getBoundingClientRect()
    
            this.contextPosition = {
                left: editImageBounds.left,
                top: editImageBounds.top + window.scrollY - headerBounds.bottom
            } 
             
            this.setState({
                showContext: true
            })
        }
    
        hideContext = () => {
            this.setState({
                showContext: false
            })
        }

        render() {
           return (
            <div
            onDrop={this.drop} 
            onDragOver={this.allowDrop}
            key={this.state.model.id} 
            class="board-list">
                <div class="board-card-header">
                    {
                        this.state.isEditing
                        ?
                        <input value={this.state.model.name} onChange={ (e) => 
                            {
                                const value = e.target.value
                                this.setState( prev => 
                                    {
                                        prev.model.name = value
                                        return {
                                            model: prev.model
                                        }
                                    }
                                    )}
                            }
                            id='list-name-input' class="board-card-header-input"></input>
                        :    
                        <div class="board-card-header-label">
                            {this.state.model.name}
                        </div>
                    }
                    <img id={`edit-list-${this.state.model.id}`} onClick={() => { this.showContext() }} src={require('../img/edit.svg')} class="edit-icon" alt=""/>
                </div>
                <div class="board-list-body" id="list1">
                    {
                        this.state.model.cards.map(card => {
                            return (
                                <Card
                                showModal={this.showModal}
                                key={card.id}
                                model={card}
                                />
                            )
                        })
                    }
                    <CardNew
                    addNewCard = {this.addNewCard}
                    listId = {this.state.model.id}
                    />

                </div>
                {
                    this.state.showContext &&
                    <ListConfigContextMenu
                    position={
                        {
                            left: this.contextPosition.left,
                            top: this.contextPosition.top
                        }
                    }
                    hideContext = {this.hideContext}
                    startEditing = {this.startEditing}
                    deleteList={this.deleteList}
                    model = {this.state.model}
                    />
                }
            </div>
           )
       }
    } 
    