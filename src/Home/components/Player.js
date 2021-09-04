import React, { Component } from 'react'
import consts from '../../consts';

const Player = ({ filePath }) => {

    var url = new URL(consts.getAUTH_API_BASE_URL()+"stream");
    url.searchParams.set('filePath', filePath.path);

     return (
            <div className="App">
                <header className="App-header">
                    <video controls autoPlay width={800}>
                     <source src={url} type="video/mp4"></source>
                    </video>      
                </header>
            </div>
        )

}

export default Player;
