import React, { useEffect, useState } from 'react';
import FileCard from './FileCard';
import API_HomeService from '../services/API_HomeService';
import Player from './Player';
import LogutButton from './LogutButton';
import getProfile from '../../Login/services/AuthProfile'
import authHeader from '../../Login/services/AuthHeader';
import ProfileComponent from '../../Profile/ProfileComponent';

function HomeComponent(props) {
    
    const [fileList, setFileList] = useState([]);
    const [stackPathDir, setStackPathDir] = useState([]);
    const [currentPathDir, setCurrentPathDir] = useState("");
    const [movieFile, setMovieFile] = useState(null);
    const [noFile, setNoFileMessage] = useState(false);
    
    useEffect(() => {
        if (!getProfile()) {
            props.history.push("/profile")
            window.location.reload();
        }
        if (!authHeader()) {
            props.history.push("/login")
            window.location.reload();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => { getFileList(currentPathDir) }, []); // eslint-disable-line react-hooks/exhaustive-deps
 
    async function getFileList(dirPath) {
        setNoFileMessage(false);
        let response = await API_HomeService.getFileList(dirPath);
        setFileList(response);
        setCurrentPathDir(dirPath);
        setNoFileMessage(true);
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

    function onClickGoEditProfile() {
         props.history.push("/editProfile")
         window.location.reload();
    }

    let files = [];
    if (fileList !== undefined && fileList.length !== 0) {
        Array.from(fileList).forEach((file) => {
            files.push(<FileCard file={file} key={file.filePath} onClickFile={onClickFile} />)
        });    
    } else {
        if (noFile) {
            files.push(<h1 id="1" className="text-white">Brak danych</h1>);
        }
    
    }

   const backButton = (
        <>
             <button className="btn-success" onClick={ () => getFileList(getPreviousPath())}>WSTECZ</button>
        </>
    );
    
    const profile = getProfile();

    return (
        <div className="d-flex home flex-column justify-content-between">
            <div className=" d-flex row m-3 flex-row">
                <div className="col" tabIndex="0">
                    <ProfileComponent profile={profile} onClickProfile={onClickGoEditProfile}/>
                </div>
                <div className="col align-self-center">
                    <div className="d-flex float-end">
                        <LogutButton history={props.history}/>
                    </div>
                </div>
            </div>
            <div className="d-flex row align-self-center" style={{ maxWidth: "35%" }} >            
               {files.length !== 0 && !movieFile ? files : null} 
            </div>
            <div className="d-flex row align-self-center movie" style={{ maxWidth: "80%", maxHeight: "80%" }}>
                {movieFile ? <Player file={movieFile}/> : null }
            </div>
            <div className="d-flex row m-4 flex-column">
                <div className="row">
                    {backButton}
                </div>
            </div>
        </div>
    );
}

export default HomeComponent;