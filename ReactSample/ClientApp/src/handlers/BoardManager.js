import { React } from "react"
import RequestManager from "./RequestManager"

export default class BoardManager {
    constructor() {

    }

    getBoardsForCurrentUser = async (props) => {
        var requestsManager = new RequestManager()
        var model = {
            URI: 'https://localhost:5001/api/boards/boardsForCurrentUser'
        }
        var response = await requestsManager.requestGET(model)
        return response
    }

    get = async (id) => {
        var requestsManager = new RequestManager()
        var model = {
            URI: `https://localhost:5001/api/boards/${id}`
        }
        var response = await requestsManager.requestGET(model)
        return response
    }

    update = async (props) => {
        var requestsManager = new RequestManager()
        var model = {
            URI: `https://localhost:5001/api/boards/`,
            body: {
                id: props.id,
                name: props.name, 
                imageId: props.imageId
            }
        }

        var response = await requestsManager.requestPUT(model)
        return response
    }

    add = async (props) => {
        var requestsManager = new RequestManager()
        var model = {
            URI: `https://localhost:5001/api/boards/`,
            body: {
                name: props.name  
            }
        }

        var response = await requestsManager.requestPOST(model)
        return response
    }

    delete = async (props) => {
        var requestsManager = new RequestManager()
        var model = {
            URI: `https://localhost:5001/api/boards/`,
            body: {
                id: props.id   
            }
        }

        var response = await requestsManager.requestDELETE(model)
        return response
    }

    assignUser = async (props) => {
        var requestsManager = new RequestManager()
        var model = {
            URI: `https://localhost:5001/api/boards/assign`,
            body: {
                boardId: props.boardId,
                login: props.login
            }
        }
        
        var response = await requestsManager.requestPOST(model)
        
        if(response.status == 200) {
            return response
        }
        else if(response.status == 400) {
            throw "User now found"
        }
    }
}