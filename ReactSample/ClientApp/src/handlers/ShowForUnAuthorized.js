import UserHandler from "./UserHandler";

export const ShowForUnAuthorized = (props) => {
    var userHandler = new UserHandler()
    const couldShow = userHandler.isLoggedIn()
    return !couldShow ? props.children : null;
};
