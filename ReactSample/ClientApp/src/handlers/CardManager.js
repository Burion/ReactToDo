import { React } from "react"
import RequestManager from "./RequestManager"

export default class CardManager {
    constructor() {

    }

    get = async (id) => {
        var requestsManager = new RequestManager()
        var model = {
            URI: `https://localhost:5001/api/cards/${id}`
        }
        var response = await requestsManager.requestGET(model)
        return response
    }

    update = async (props) => {
        var requestsManager = new RequestManager()
        var model = {
            URI: `https://localhost:5001/api/cards/`,
            body: {
                id: props.id,
                name: props.name,
                listId: props.listId, 
                description: props.description
            }
        }

        var response = await requestsManager.requestPUT(model)
        return response
    }

    add = async (props) => {
        var requestsManager = new RequestManager()
        var model = {
            URI: `https://localhost:5001/api/cards/`,
            body: {
                name: props.name,
                listId: props.listId   
            }
        }

        var response = await requestsManager.requestPOST(model)
        return response
    }

    delete = async (props) => {
        var requestsManager = new RequestManager()
        var model = {
            URI: `https://localhost:5001/api/cards/`,
            body: {
                id: props.id,
                name: props.name   
            }
        }

        var response = await requestsManager.requestDELETE(model)
        return response
    }
}