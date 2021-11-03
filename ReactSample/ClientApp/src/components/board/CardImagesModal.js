import React, { Component } from 'react'
import '../css/style.css'
import EditImage from '../img/edit.svg'
import { Route, Link } from "react-router-dom"
import { withRouter } from "react-router"
import BackImage from '../img/back.jpg'
import ImageManager from '../../handlers/ImageManager'

export class CardImagesModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            images: [
            ],

            current: props.currentImage
        }

        this.hideImagesModal = props.hideImagesModal
        this.changeBackImage = props.changeBackImage

        this.imageManager = new ImageManager()
    }
 
    componentWillMount = async() => {
        let images = await this.imageManager.get()
        
        this.setState({
            images: images
        })
    }   

    render() {
        return (
            <div id="imagesModal" class="modal">
                <div class="modal-images-content">
                    <div class="modal-header">
                        <div class="modal-header-label">Select image</div>
                        <span onClick={() => {this.hideImagesModal()}} class="close">&times;</span>
                    </div>
                    <div class="modal-body-scrollable">
                        <div class="modal-body-grid">
                            {
                                this.state.images.map(image => {
                                    if(image.id + image.extension == this.state.current.id + this.state.current.extension) {
                                        return (
                                            <div
                                            key={image.id}
                                            class="board-card-body modal-back-image-selected"
                                            style={{
                                                backgroundImage: `url(${process.env.PUBLIC_URL + 'img/' + image.id + image.extension})`
                                            }}>
                                                <div class="modal-back-image-selected-image"></div>
                                            </div>
                                        )
                                    }
                                    else
                                    {
                                        return (
                                            <div 
                                            onClick={() => { this.setState({current: image}); this.changeBackImage(image) }}
                                            key={image.id}
                                            class="board-card-body modal-back-image"
                                            style={{
                                                backgroundImage: `url(${process.env.PUBLIC_URL + 'img/' + image.id + image.extension})`
                                            }} 
                                            ></div>
                                        )
                                    }
                                } 
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )                                  
    }
}