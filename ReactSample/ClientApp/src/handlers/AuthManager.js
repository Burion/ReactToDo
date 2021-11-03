import RequestManager from "./RequestManager"

export default class AuthManager {
    constructor() {

    }

    login = async (props) => {
        var requestsManager = new RequestManager()
        var model = {
            URI: 'https://localhost:5001/api/auth/login',
            body: 
            {
                login: props.login,
                password: props.password
            }
        }
        await requestsManager.requestPOST(model)
    }

    logout = async () => {
        var requestsManager = new RequestManager()
        var model = {
            URI: 'https://localhost:5001/api/auth/logout'
        }
        await requestsManager.requestGET(model)
    }
}