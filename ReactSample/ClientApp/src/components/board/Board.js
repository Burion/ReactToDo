import React, { Component } from 'react'
import '../css/style.css'
import { Route, Link } from "react-router-dom"
import { withRouter } from "react-router";
import { Card } from './Card';
import { List } from './List';
import { CardEditModal } from './CardEditModal';
import ProfileImage from '../img/profile.png'
import { CardImagesModal } from './CardImagesModal';
import { BoardConfigContextMenu } from './BoardConfigContextMenu';
import EditImage from '../img/edit.svg'
import { AddUserModal } from './AddUserModal';
import { ListNew } from './ListNew';
import BoardManager from '../../handlers/BoardManager'
import ListManager from '../../handlers/ListManager'
import CardManager from '../../handlers/CardManager';

export class Board extends Component {

    constructor(props) {
        super(props)

        this.state = {
            lists: [
                {
                    id: '123',
                    name: 'Planning',
                    cards: [{
                            id: 'c1',
                            name: 'Cleaning',
                            description: 'This is card about cleaning',
                            date: '12/04/21',
                            listId: '123'
                        },{
                            id: 'c2',
                            name: 'Task1',
                            description: 'Task 1 must be done by tomorrow',
                            date: '13/04/21',
                            listId: '123'
                        }
                    ]
                },
                {
                    id: '345',
                    name: 'In progress',
                    cards: [{
                        id: 'c3',
                        name: 'Wrestling',
                        description: 'Thats power son, huh?',
                        listId: '345'
                    }
                ]
                },
                {
                    id: '456',
                    name: 'Done',
                    cards: []
                },
            ],

            modelToEdit: undefined,

            users: [
                {
                    name: 'Vlad',
                    email: 'vladislavburyak00@gmail.com'
                },
                {
                    name: 'Andrei',
                    email: 'andrei.podzbornaia@gmail.com'
                }
            ],

            name: 'Board name',

            showContext: false,

            isEditingName: false,

            isShowingImagesModal: false,

            image: {
                id: 'back-image-2.jpg',
                extension: '.jpg'
            },

            isShowingAddUserModal: false
        }

        const { match, location, history } = this.props
        this.id = location.state.boardId

        this.boardManager = new BoardManager()
        this.listManager = new ListManager()
        this.cardManager = new CardManager()
    }

    componentWillMount = async () => {
        let board = await this.boardManager.get(this.id)

        this.setState({
            name: board.name,
            id: board.id,
            lists: board.lists, 
            users: board.users,
            image: board.image
        })
    }

    addNewCard = async (card) => {
        let newCard = await this.cardManager.add(card)

        this.setState(prev => {
            let prevLists = prev.lists
            prevLists.forEach(list => {
                if(list.id == card.listId) {
                    list.cards.push(newCard)
                }
            });

            return {
                lists: prevLists
            }
        })
    }

    deleteCard = async (cardId) => {
        await this.cardManager.delete({id: cardId})

        this.setState(prev => {
            let prevLists = prev.lists
            let list = prevLists.find(l => l.cards.map(c => c.id).includes(cardId))
            let oldCard = list.cards.find(c => c.id == cardId)
            let indexOfList = prevLists.indexOf(list)
            let indexOfCard = list.cards.indexOf(oldCard)

            prevLists[indexOfList].cards.splice(indexOfCard, 1)
            let newList = Object.assign([], prevLists) 
            return {
                lists: newList
            }
        })
    }
    
    saveCard = async (card) => {
        let updatedCard = await this.cardManager.update(card)

        this.setState(prev => {
            let prevLists = prev.lists
            let list = prevLists.find(l => l.id == updatedCard.listId)
            let oldCard = list.cards.find(c => c.id == updatedCard.id)
            let indexOfList = prevLists.indexOf(list)
            let indexOfCard = list.cards.indexOf(oldCard)

            prevLists[indexOfList].cards[indexOfCard] = updatedCard
            let newList = Object.assign([], prevLists) 
            return {
                lists: newList
            }
        })
    }

    assignCardToList = async (cardId, listId) => {
        let list = this.state.lists.find(l => l.cards.map(card => card.id).includes(cardId))
        let card = list.cards.find(c => c.id == cardId)
        
        await this.cardManager.update({ id: cardId, listId: listId, name: card.name, description: card.description })

        this.setState(prev => {
            let prevLists = prev.lists
            let list = prevLists.find(l => l.cards.map(card => card.id).includes(cardId))
            let card = list.cards.find(c => c.id == cardId)
            let targetList = prevLists.find(l => l.id == listId)

            let indexOfList = prevLists.indexOf(list)
            let indexOfCard = list.cards.indexOf(card)
            let indexOfTargetList = prevLists.indexOf(targetList)

            prevLists[indexOfList].cards.splice(indexOfCard, 1)

            card.listId = listId
            prevLists[indexOfTargetList].cards.push(card)

            let newList = Object.assign([], prevLists) 
            return {
                lists: newList
            }
        })
    }

    hideModal = () => {
        this.setState({
            modelToEdit: undefined
        }) 
    }

    showModal = async (model) => {
        this.setState(prev => ({
            ...prev.model,
            modelToEdit: model
        })) 
    }

    showContext = () => {
        let editImage = document.getElementById('edit-board')
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

    startEditingName = async () => {
        await this.setState({
            isEditingName: true
        })
        var input = document.getElementById(`name-input`)
        input.focus()
        input.addEventListener('focusout', (e) => { this.stopEditingName() })
    }

    stopEditingName = async () => {
        this.boardManager.update({ id: this.id, name: this.state.name, imageId: this.state.image.id })

        this.setState({
            isEditingName: false
        })
    }

    showImagesModal = () => {
        this.setState({
            isShowingImagesModal: true
        })
    }

    hideImagesModal = () => {
        this.setState({
            isShowingImagesModal: false
        })
    }

    changeBackImage = async (image) => {
        await this.boardManager.update({ id: this.id, name: this.state.name, imageId: image.id })

        this.setState({
            image: image
        })
    }

    showAddUserModal = () => {
        let addUserButton = document.getElementById('add-user-button').getBoundingClientRect()

        this.addUserModalPosition = {
            top: addUserButton.top,
            left: addUserButton.left
        }

        this.setState({
            isShowingAddUserModal: true
        })
    }

    hideAddUserModal = () => {
        this.setState({
            isShowingAddUserModal: false
        })
    }

    addList = async () => {
        let newList = await this.listManager.add({
            name: 'New list', 
            boardId: this.id
        })

        this.setState(prev => {
            prev.lists.push({
                id: newList.id,
                name: newList.name,
                cards: []
            })

            return {
                lists: prev.lists
            }
        })
    }

    deleteList = async (listId) => {
        let listToDelete
        await this.setState(prev => {
            let item = prev.lists.find(l => l.id == listId)
            let index = prev.lists.indexOf(item)

            listToDelete = Object.assign({}, prev.lists[index]) 

            prev.lists.splice(index, 1)

            return {
                lists: prev.lists
            }
        })

        await this.listManager.delete(listToDelete)
        
    }

    addUser = async (login) => {
        try {
            await this.boardManager.assignUser({ login: login, boardId: this.id })
            
            this.setState(prev => {
                prev.users.push({
                    name: login,
                    email: login + '@gmail.com'
                })
    
                return {
                    users: prev.users
                }
            })
        }
        catch (e) {
            console.log(e);
        }

    }

    render() {
        return (
            <div style={
                {
                    backgroundImage: `url(${process.env.PUBLIC_URL + 'img/' + this.state.image.id + this.state.image.extension})`
                }
            } class="scrollable-container">
                <div class="container-grid-wrapper">
                    <div class="board-list board-config-panel">
                        {
                            this.state.isEditingName 
                            ?
                            <input value={this.state.name} onChange={ (e) => this.setState({name: e.target.value})} id='name-input' class="settings-item-input-outline"></input>
                            :
                            <label class="board-config-panel-title" >{this.state.name}</label>

                        }
                        <img id="edit-board" src={require('../img/edit.svg')} onClick={() => this.showContext()} class="board-config-panel-edit" alt=""/>
                        <div class="board-config-panel-users">
                            {
                                this.state.users.map(user => (
                                    <img title={user.login} src={ProfileImage} description={user.name} class="img-profile-circle" alt=""/>
                                ))

                            }
                            <div id='add-user-button' onClick={() => { this.showAddUserModal() }} class="plus-profile-circle">+</div>
                        </div>
                    </div>
                    <div class="board-container">
                        {
                            this.state.lists.map( list => {
                                return (
                                    <List
                                    key={list.id}
                                    deleteList={this.deleteList}
                                    addNewCard = {this.addNewCard}
                                    showModal = {this.showModal}
                                    assignCardToList = {this.assignCardToList} 
                                    model = {list}/>
                                )
                            })
                        }

                        <ListNew
                        addList={this.addList}/>
                    </div>

                    { this.state.modelToEdit != undefined &&
                            <CardEditModal
                            deleteCard={this.deleteCard}
                            model={this.state.modelToEdit}
                            hideModal={this.hideModal}
                            saveCard = {this.saveCard}/>
                    }
                </div>
                {
                    this.state.showContext && 
                    <BoardConfigContextMenu
                    position={
                        {
                            left: this.contextPosition.left,
                            top: this.contextPosition.top
                        }
                    }
                    hideContext = {this.hideContext}
                    startEditingName = {this.startEditingName}
                    showImagesModal = {this.showImagesModal}
                    />
                }

                {
                    this.state.isShowingImagesModal && 
                    <CardImagesModal
                    currentImage={this.state.image}
                    changeBackImage={this.changeBackImage}
                    hideImagesModal={this.hideImagesModal}/>
                }

                {
                    this.state.isShowingAddUserModal && 
                    <AddUserModal
                    position={this.addUserModalPosition}
                    hideAddUserModal={this.hideAddUserModal}
                    addUser={this.addUser}
                    />
                }
            </div>
        )
    }
}