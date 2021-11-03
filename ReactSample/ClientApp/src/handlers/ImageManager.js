import { React } from "react"
import RequestManager from "./RequestManager"

export default class ImageManager {
    constructor() {

    }

    get = async (id) => {
        var requestsManager = new RequestManager()
        var model = {
            URI: `https://localhost:5001/api/images`
        }
        var response = await requestsManager.requestGET(model)
        
        return response
    }
}