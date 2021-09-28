import React, { useEffect, useState } from 'react';
import FileCard from './FileCard';
import SpinnerWaitForData from './SpinnerWaitForData';
import RowFlux from './RowFlux';
import API_HomeService from '../services/API_HomeService';
import Player from './Player';
import LogutButton from './LogutButton';



function HomeComponent(props){


    const [fileList, setFileList] = useState([]);
    const [stackPathDir, setStackPathDir] = useState([]);
    const [currentPathDir, setCurrentPathDir] = useState("");
    const [movieFile, setMovieFile] = useState(null);
    useEffect(() => {getFileList(currentPathDir)}, []); // eslint-disable-line react-hooks/exhaustive-deps


    async function getFileList(dirPath) {
        let response = await API_HomeService.getFileList(dirPath);
        setFileList(response);
        setCurrentPathDir(dirPath);
    };

    function getPreviousPath(){
        setMovieFile(null);
        if(stackPathDir.length === 0){
            return ""
        }else{
           return stackPathDir.pop();
        }
    }

    function addToStack(path){
        let stack = stackPathDir;
        stack.push(path);
        setStackPathDir(stack); 
    }

    function checkItCanBeMovie(path){
        if(path.toUpperCase().indexOf("MP4") !== -1){
            fileList.forEach( function(file){
                if(file.filePath === path) { setMovieFile(file) }; 
            });
            return true;
        }else{
          return false;
        }
    }

    function onClickFile(e) {
        const path = e.currentTarget.id;
        addToStack(currentPathDir);
        if(!checkItCanBeMovie(path)){
          getFileList(path);
        }
    }


    let files = [];
    if (fileList !== undefined && fileList.length !== 0) {
        Array.from(fileList).forEach((file) => {
            files.push(<FileCard file={file} key={file.filePath} onClickFile={onClickFile} />)
        });    
    }
    

   const Buttons = (
        <>
             <button className="btn-info" onClick={ () => getFileList(getPreviousPath())}>WSTECZ</button>
        </>
   ); 

    return (
        <div className="App">
            <div className="App-header">
                 {<RowFlux body={<LogutButton history={props.history}/>} />} <div style={{padding: 30}}></div>
                <div className="container-fluid ">
                        {<RowFlux body={Buttons}/>} 
                        <p/>    
                        <div>
                            {<RowFlux body= {movieFile ? <Player file={movieFile}/> : files.length !== 0 ? files : <SpinnerWaitForData/>} />}
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default HomeComponent;