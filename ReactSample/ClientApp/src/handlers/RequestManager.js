import CookieHandler from "./CookieHandler"

export default class RequestManager {
    constructor(props) {
        let cookieHandler = new CookieHandler()
        this.jwt = cookieHandler.getJwtToken()
    }

    requestPOST = async (props) => {
        const respose = await fetch(props.URI, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.jwt
            },
            body: JSON.stringify(props.body) 
        }).then(res => res.json()).catch(err => console.log(err))

        return respose
    }

    requestGET = async (props) => {
        const respose = await fetch(props.URI, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.jwt
            } 
        }).then(res => res.json()).catch(err => console.log(err))

        return respose
    }

    requestPUT = async (props) => {
        const respose = await fetch(props.URI, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.jwt
            },
            body: JSON.stringify(props.body)  
        }).then(res => res.json()).catch(err => console.log(err))

        return respose
    }

    requestDELETE = async (props) => {
        const respose = await fetch(props.URI, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': this.jwt
            },
            body: JSON.stringify(props.body)  
        }).then(res => res.json()).catch(err => console.log(err))

        return respose
    }
}