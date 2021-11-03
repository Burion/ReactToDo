   import React, { Component } from 'react'
   import '../css/style.css'
   import EditImage from '../img/edit.svg'
   import { Route, Link } from "react-router-dom"
   import { withRouter } from "react-router"
   import { Card } from './Card'
   import { CardNew } from './CardNew'
import { ListConfigContextMenu } from './ListConfigContextMenu'

   export class ListNew extends Component {
   
        constructor(props) {
            super(props)

            this.state = {
            }

            this.addList = props.addList
        }


        render() {
           return (
            <div onClick={() => {this.addList()}} class="board-list-new">
                <div class="board-list-new-plus">
                    +
                </div>
            </div>
           )
       }
    } 
    