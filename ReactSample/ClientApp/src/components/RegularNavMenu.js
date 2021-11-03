import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/style.css';

export class RegularNavMenu extends Component {
  static displayName = RegularNavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header id='header'>
        <div class="header-container">
            <img src='./img/main-icon.svg' class="logo-nav" draggable="true" alt=""/>
            <nav class="nav-links">
                <ul>
                    <li>
                      <a>
                        Boards
                      </a>
                    </li>
                    <li> 
                        <a>
                            Profile
                        </a>
                    </li>
                </ul>
            </nav>
            <Link to='/logout'>
              <button class="button-logout">Log out</button>
            </Link>
        </div>
      </header>
    );
  }
}
