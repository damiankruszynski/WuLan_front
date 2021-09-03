import React, { Component } from 'react';
import HomeService from '../services/HomeService';
import FileCard from './FileCard';
import SpinnerWaitForData from './SpinnerWaitForData';

class HomeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filesList: null,
            path: null,
            stack: []
        }
        this.clickFile = this.clickFile.bind(this);
        this.getFiles = this.getFiles.bind(this);
        this.getMovie = this.getMovie.bind(this);
    }


    componentDidMount() {
        try{
          this.state.stack = this.props.location.state.stack;
        }catch{
            this.setState({stack: []})
        }
        let tempPath;
        if (this.state.stack.length > 0) {
          tempPath = { path: this.state.stack.pop()}; 
        }
        if (tempPath == null ) {
            tempPath = { path: "" };
        }
        this.setState(tempPath)
        this.getFiles(tempPath);
    }

    componentWillMount() {
    
    }

    getMovie(filePath) {
         this.props.history.push({ pathname: '/movie', state: {stack: this.state.stack, filePath: filePath }});  
    
    }

    componentDidUpdate(){    
        window.onpopstate = e => {
            this.props.history.push({ pathname: '/home', state: { stack: this.state.stack } });
        }
    }

    getFiles(path) {
        HomeService.getFiles(path).then((res) => {
            this.setState({ filesList: res.data });
        }).catch((res) => {
            this.setState({ filesList: null});
        } )
    }
    
    clickFile(e) {
        e.preventDefault();
        let newPath = { path: e.currentTarget.id }  
        this.state.stack.push(this.state.path)
        this.setState(newPath)
        if (e.currentTarget.title === "MP4") {
            this.getMovie(newPath)
        }
        this.getFiles(newPath)
    }


    render() {
        const fileList = this.state.filesList;
    
        return (
            <div className="App">
                <div className="App-header">
                    <div className="container-fluid ">
                            <div>
                                   {fileList ? <FileCard fileList={fileList} clickFile={this.clickFile} /> : <SpinnerWaitForData/>}
                            </div>
                      </div>
                </div>
            </div>
                    );
    }
}

export default HomeComponent;