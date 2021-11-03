import React, { SyntheticEvent, Component } from 'react'
import { Link } from 'react-router-dom'
import App from '../../App'
import AuthManager from '../../handlers/AuthManager'
import BoardManager from '../../handlers/BoardManager'
import '../css/style.css'
import mainIcon from '../img/main-icon.svg'
import { BoardCard } from './BoardCard'
import { BoardCardNew } from './BoardCardNew'

export class Boards extends Component {

    constructor(props) {
        super(props)

        this.state = {
            boards: []
        }

        this.boardsManager = new BoardManager()
    }

    componentWillMount = async () => {
        

        let boards = await this.boardsManager.getBoardsForCurrentUser()

        this.setState({
            boards: boards
        })
    }

    addNewBoard = (model) => {
        let board = this.boardsManager.add(model)

        this.setState(prev => ({
            boards: [...prev.boards, board]
        }))
    }

    deleteBoard = async (idToDelete) => {

        await this.boardsManager.delete({ id: idToDelete })
        let localBoards = this.state.boards
        function getPositionOf(id) {
            for(let x=0; x < localBoards.length; x++) {
                let board = localBoards[x]
                if(board.id == id) {
                    let index = localBoards.indexOf(board)
                    console.log(index)
                    return index
                }
            }

            return -1
        }

        let positionToRemove = getPositionOf(idToDelete)
        localBoards.splice(positionToRemove, 1)

        this.setState({
            boards: localBoards
        }
        )
    }
    
    updateBoard = async (board) => {
        let updatedBoard = await this.boardsManager.update(board)

        this.setState(prev => {
            let prevBoards = prev.boards
            let boardToFind = prevBoards.find(b => b.id == updatedBoard.id)
            let index = prevBoards.indexOf(boardToFind)
            prevBoards[index] = updatedBoard

            return {
                boards: prevBoards
            }
        })
    }

    render() {
        return (
            <div class="container-grid-wrapper">
                <div class="container-grid">
                    { this.state.boards.map (board => {
                        return (
                        <BoardCard
                        key={board.id}
                        deleteBoard={this.deleteBoard}
                        updateBoard={this.updateBoard}
                        model={board}/>
                        )
                    }) 
                    }
                    <BoardCardNew
                    addNewBoard={this.addNewBoard}
                    />
                </div>
            </div>
        )
    }
}