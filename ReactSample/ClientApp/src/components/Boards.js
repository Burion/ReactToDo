import { Component } from "react"
import React from "react" 
import BoardManager from "../handlers/BoardManager"
import RequestManager from "../handlers/RequestManager"

export default class Boards  extends Component { 
    constructor(props) {
        super(props)
        this.state = {
            boards: [],
            name: 'hello'
        }
    }

    componentDidMount = async () => {
        this.setState({
            name: 'fuck'
        })

        var boardManager = new BoardManager()
        let boards = await boardManager.getBoardsForCurrentUser()
       
        this.setState({
            boards: boards
        })
    }


    render() {
        return(
            <div>
                {
                    this.state.boards.map(board => {
                        return (
                            <label>
                                {board}
                            </label>
                        )
                    })
                }
            </div>
        )
    }
}