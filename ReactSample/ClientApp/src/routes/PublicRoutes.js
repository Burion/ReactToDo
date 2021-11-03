import React, { Fragment } from 'react'
import { Link, Route, Switch } from "react-router-dom"
import { FetchData } from '../components/FetchData'
import { Counter } from '../components/Counter'
import { Layout } from '../components/Layout'
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'

const ForgotPassword = () => (
    <NavItem>
        <NavLink className="nav-link" to="/">
            Back to login
		</NavLink>
    </NavItem>
)

const PublicRoutes = ({ match }) => (
    <Fragment>
        <Switch>
            <Route
                path={"/counter"}
                component={ForgotPassword}
            />
            <Route
                path={"/fetch-data"}
                component={FetchData}
            />
        </Switch>
    </Fragment>
);

export default PublicRoutes;