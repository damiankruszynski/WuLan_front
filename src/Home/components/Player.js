import React, { Component } from 'react'

const Player = ({ filePath }) => {

    var url = new URL("http://localhost:8080/wulan_back/stream");
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
