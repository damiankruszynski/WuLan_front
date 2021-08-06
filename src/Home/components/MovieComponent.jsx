import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import HomeService from '../services/HomeService';
import authHeader from '../../Login/services/AuthService';
import consts from '../../consts';


class MovieComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pathToMovie: null,
            stack: [],
            videos: []
        }

    }

    async componentDidMount() {
        try {
            this.state.stack = this.props.location.state.stack;
            this.state.pathToMovie = this.props.location.state.pathToMovie;
            let token = {
            headers: authHeader()
            };
            const response = await fetch(consts.getAUTH_API_BASE_URL() + 'stream?' + new URLSearchParams({filePath: this.state.pathToMovie}),  token );
            const data = await response.json();
            this.setState({ videos: [...data] });
        } catch (error) {
            console.log(error);
        }
    }

    componentDidUpdate(){    
        window.onpopstate = e => {
            this.props.history.push({ pathname: '/home', state: { stack: this.state.stack } });
        }
    }

    render() {

        return (
            <div className="App">
                <div className="App-header">
                    <div className="container-fluid ">
                            <div>
                                <ReactPlayer url={this.videos} ></ReactPlayer>
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