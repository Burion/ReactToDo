import UserHandler from "./UserHandler";

export const ShowForAuthorized = (props) => {
    var userHandler = new UserHandler()
    const couldShow = userHandler.isLoggedIn()
    return couldShow ? props.children : null;
};