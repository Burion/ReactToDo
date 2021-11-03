import CookieHandler from "./CookieHandler";


export default class UserHandler {
    constructor(props) {

    }

    isLoggedIn = () => {
        var cookieHandler = new CookieHandler()
        var jwtToken = cookieHandler.getJwtToken()

        if (jwtToken == null) {
            return false
        }

        return true
    }

    parseJwt = (token) => {
        if (!token) { 
            return 
        }

        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')

        return JSON.parse(window.atob(base64))
    }
}

