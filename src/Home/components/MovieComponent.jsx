import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import HomeService from '../services/HomeService';
import authHeader from '../../Login/services/AuthService';
import consts from '../../consts';
import axios from 'axios';
import Player from './Player';
import Player2 from './Player2';

class MovieComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filePath: this.props.location.state.filePath,
            stack: this.props.location.state.stack,
        }    
    }


    componentDidUpdate(){    
        window.onpopstate = e => {
            this.props.history.push({ pathname: '/home', state: { stack: this.state.stack } });
        }
    }

    render() {
        const filePath = this.state.filePath;

        return (
            <div className="App">
                <div className="App-header">
                    <div className="container-fluid ">
                            <div>
                               <Player2 filePath={this.state.filePath}></Player2>
                            </div>
                      </div>
                </div>
            </div>
        );
    }
}

MovieComponent.propTypes = {

};

export default MovieComponent;