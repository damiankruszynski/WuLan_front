import React, { useEffect, useRef, useState } from 'react';
import FileCard from './FileCard';
import API_HomeService from '../services/API_HomeService';
import Player from './Player';
import LogutButton from './LogutButton';
import getProfile from '../../Login/services/AuthProfile'
import authHeader from '../../Login/services/AuthHeader';
import ProfileComponent from '../../Profile/ProfileComponent';
import ShowModal from '../../CommonUtils/ShowModal';
import ImageGallery from 'react-image-gallery';

function HomeComponent(props) {
    
    const [fileList, setFileList] = useState([]);
    const [pictureList, setPictureList] = useState([]);
    const [stackPathDir, setStackPathDir] = useState([]);
    const [currentPathDir, setCurrentPathDir] = useState("");
    const [movieFile, setMovieFile] = useState(null);
    const [movieFileWatched, setMovieFileWatched] = useState(null);
    const [noFile, setNoFileMessage] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showGalery, setShowGalery] = useState(false);
    
    useEffect(() => {
        if (!getProfile()) {
            props.history.push("/profile")
        }
        if (!authHeader()) {
            props.history.push("/login")
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => { getFileList(currentPathDir) }, []); // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        loadPictures();
        return(() => {;})
    }, [showGalery]);// eslint-disable-line react-hooks/exhaustive-deps



     function loadPictures(){
        let pictureListTemp = [];
        if (fileList !== undefined && fileList.length !== 0) {
            for(const file of fileList) {
               if(file.fileType.toUpperCase() === 'PICTURE'){
                   pictureListTemp.push({original: getURLFor(file.filePath, false), 
                                        thumbnail: getURLFor(file.filePath, true) });
               }
            };
            setPictureList(pictureListTemp);
        }
    }

    function getURLFor(filePath, isPrewiew){
         return API_HomeService.getURLImage(filePath, isPrewiew);  
    }

 
    async function getFileList(dirPath) {
        setPictureList([]);
        setNoFileMessage(false);
        let response = await API_HomeService.getFileList(dirPath);
        setFileList(response);
        setCurrentPathDir(dirPath);
        setNoFileMessage(true);
    };

    function getPreviousPath(){
        if(movieFile){
            setMovieFileWatched(movieFile);
        }
        setMovieFile(null);
        setShowGalery(null);
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

    const [indexForThumbnai, setIndexForThumbnai ] = useState(0);

    function checkItCanBePicture(path){
        if(path.toUpperCase().indexOf("JPEG") !== -1 || path.toUpperCase().indexOf("JPG") !== -1 ){
            let i = 0;
            for(const file of fileList) {
                  if(file.filePath === path){
                      setIndexForThumbnai(i);
                    }                  
                  i++;
            }
            setShowGalery(true);
            return true;
        }else{
          return false;
        }
    }

    function onClickFile(e) {
        const path = e.currentTarget.id;
        if(checkItCanBePicture(path)){
            ;
        }
        else if(checkItCanBeMovie(path)){
          addToStack(currentPathDir);  
        }
        else{
          addToStack(currentPathDir);  
          getFileList(path);
        }
    }

    function onClickGoEditProfile() {
         props.history.push("/editProfile");
    }

    let files = [];
    if (fileList !== undefined && fileList.length !== 0) {
        Array.from(fileList).forEach((file) => {
            files.push(<FileCard file={file} key={file.filePath} onClickFile={onClickFile} />)
        });
    } else {
        if (noFile) {
            files.push(<h1 key="1" className="text-white">Brak danych</h1>);
        }   
    }

    function saveAsWatched(){
        if(movieFileWatched){
            API_HomeService.setTimeWatched(movieFileWatched.filePath, 0, true);
        }        
        setMovieFileWatched(null);
    }

    function handleShowModal(){
        setShowModal(true);
    }
    
    function handleDisableShowModal(){
        setShowModal(false);
        setMovieFileWatched(null);
    }

    function handleConfirn(){
        saveAsWatched();
        handleDisableShowModal();
        getFileList(currentPathDir);
    }
    

   const [, updateState] = React.useState();
   const forceUpdate = React.useCallback(() => updateState({}), []);

   const backButton = (
        <>
             <button className="btn-success" onClick={ () => getFileList(getPreviousPath())}>WSTECZ</button>
        </>
    );
    
    const profile = getProfile();

    const question = "Czy film został obejrzany do końca?";

    const imageGallery = useRef(null);

    function slideToIdnexRef(){
        if(imageGallery.current && indexForThumbnai >0){
            imageGallery.current.slideToIndex(indexForThumbnai);
            setIndexForThumbnai(0);
        }
    }

    return (
        <div className="d-flex home flex-column justify-content-between">
            {showModal ? <ShowModal handleDisableShowModal={handleDisableShowModal} handleConfirn={handleConfirn}  question={question}/> : null}
            <div className=" d-flex row m-3 flex-row">
                <div className="col" tabIndex="0">
                    <ProfileComponent onClickProfile={onClickGoEditProfile} profile={profile} forceUpdate={forceUpdate}/>
                </div>
                <div className="col align-self-center">
                    <div className="d-flex float-end">
                        <LogutButton history={props.history}/>
                    </div>
                </div>
            </div>
            <div className="d-flex align-self-center justify-content-center" style={{ width: "80%" }} >  
                <div className="row algin-align-items-end justify-content-center">
                    {files.length !== 0 && !movieFile && !showGalery? files : null} 
                </div>     
                <div>
                    {showGalery ? <ImageGallery onImageLoad={slideToIdnexRef} 
                                                ref={imageGallery} 
                                                thumbnailPosition="left" 
                                                items={pictureList}
                                                useBrowserFullscreen = {false}
                                                showIndex = {true}
                                                lazyLoad /> : null  }
                </div>     
            </div>
            <div className="d-flex row align-self-center movie" style={{ maxWidth: "80%", maxHeight: "80%" }}>
                {movieFile ? <Player file={movieFile} handleShowModal={handleShowModal}/> : null }
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