import React, { Component } from 'react'
import ReactPlayer from 'react-player';
import consts from '../../consts';

const Player2 = ({ filePath }) => {

    var urlVideo = new URL(consts.getAUTH_API_BASE_URL()+"stream");
    urlVideo.searchParams.set('filePath', filePath.path);

    var urlSubs = new URL(consts.getAUTH_API_BASE_URL() + "stream");
    urlSubs.searchParams.set('filePath', filePath.path);

     return (
            <div className="App">
                <header className="App-header">
                    < ReactPlayer url={urlVideo} controls={true}>
                    </ReactPlayer >      
                </header>
            </div>
        )

}

export default Player2;