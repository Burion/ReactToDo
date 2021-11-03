import React, { Component } from 'react'
import '../css/style.css'
import EditImage from '../img/edit.svg'
import { Route, Link } from "react-router-dom"
import { withRouter } from "react-router";

export class CardEditModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            model: Object.assign({}, props.model) 
        }
        this.hideModal = props.hideModal
        this.saveCard = props.saveCard
        this.deleteCard = props.deleteCard
    }

    render() {
        return (
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-header-label">
                            Edit card
                        </div>
                        <span onClick={() => {this.hideModal()}} class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <div class="modal-body-title-group">
                            <input 
                            value={this.state.model.name}
                            onChange={e => {
                                let value = e.target.value
                                this.setState(
                                    prev => {
                                        let newModel = prev.model
                                        newModel.name = value
                                        return {
                                            model: newModel
                                        }
                                    }
                                )
                            }
                            } 
                            class="modal-body-title"/>
                            <input type="date"/>
                        </div>
                        <textarea
                        value={this.state.model.description}
                        onChange={e => {
                            let value = e.target.value
                            this.setState(
                                prev => {
                                    let newModel = prev.model
                                    newModel.description = value
                                    return {
                                        model: newModel
                                    }
                                }
                            )
                            }
                        }
                        class="modal-body-description"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button onClick={() => {this.saveCard(this.state.model); this.hideModal()}} id="save-button" class="modal-button-save">Save</button>
                        <button onClick={() => {this.deleteCard(this.state.model.id); this.hideModal()}} id="save-button" class="modal-button-danger">Delete</button>
                    </div>
                </div>
            </div>
        )                                  
    }
}