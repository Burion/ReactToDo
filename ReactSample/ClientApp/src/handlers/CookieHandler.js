export default class CookieHandler {
    constructor() {

    }

    getValueFromKey = (key) => {
        if (document.cookie == null || document.cookie == undefined || document.cookie == "") {
            return null
        }

        var value = document.cookie.split('; ')
            .find(row => row.startsWith(`${key}=`))
            .split('=')[1];

        return value
    }

    getJwtToken = () => {
        var token = this.getValueFromKey('jwt')

        if (token == null || token == undefined) {
            return null
        }  

        var value = 'Bearer ' + this.getValueFromKey('jwt')

        return value
    }
}