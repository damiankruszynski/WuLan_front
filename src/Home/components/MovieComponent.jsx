import React from 'react';
import Player2 from './Player';

function MovieComponent(props) {

        const filePath = props.filePath;

        return (
            <div className="App">
                <div className="App-header">
                    <div className="container-fluid ">
                            <div>
                               <Player2 filePath={filePath}></Player2>
                            </div>
                      </div>
                </div>
            </div>
        );
}
export default MovieComponent;