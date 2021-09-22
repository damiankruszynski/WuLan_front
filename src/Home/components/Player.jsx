import React from 'react'
import ReactPlayer from 'react-player';
import consts from '../../consts';

function Player (props) {

    var urlVideo = new URL(consts.getAUTH_API_BASE_URL()+"stream");
    urlVideo.searchParams.set('filePath', props.filePath);

     return (
            <div className="App">
                <header className="App-header">
                    < ReactPlayer url={urlVideo} controls={true}>
                    </ReactPlayer >      
                </header>
            </div>
        )

}

export default Player;