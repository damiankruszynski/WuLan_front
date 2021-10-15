import * as React from "react";
import { BsFolderFill } from "react-icons/bs";
import { AiOutlineFileUnknown } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { BsStopwatchFill } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import { Image } from 'react-bootstrap';
import API_HomeService from "../services/API_HomeService";




function FileCard(props) {
  
  const file = props.file;
  const onClickFile = props.onClickFile;
  const body = [];
  let watchedProgress = "";
  const [image, setImage] = React.useState(null);


  try{
    if(file.fileType.toUpperCase() === 'MP4'){
      if(file.movieTimeWatchedDTO.watched){
      watchedProgress = <div><MdDone size="20" color="green"/></div>
      }
      if(file.movieTimeWatchedDTO.timeWatched > 0 && !file.movieTimeWatchedDTO.watched){
      watchedProgress = <div><BsStopwatchFill size="10" color="yellow"/></div>
      }
    }else{
      watchedProgress = "";
    }
  }catch{
    watchedProgress = "";
  };

  React.useEffect( () => {
    if(props.file.fileType.toUpperCase() === 'PICTURE'){
      getImageFromAPI(props.file.filePath);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
      
  async function getImageFromAPI(filePath){
        let image =  await API_HomeService.getImage(filePath);  
        setImage(image);
  }
  
    body.push(
    <div key={file.fileName} className="col-2">
        <div className="card file-looks"  onClick={onClickFile} id={file.filePath}>
          <div className="card-img-top justify-content-center">
            {file.fileType.toUpperCase() === 'FOLDER' ? <BsFolderFill size="100%" color="darkgoldenrod" /> : null}
            {file.fileType.toUpperCase() === 'MP4' ? <BiMoviePlay size="100%" color="forestgreen" /> : null}
            {file.fileType.toUpperCase() === 'PICTURE' && image ? <Image  fluid src={image} alt=""/>: null}
            {file.fileType.toUpperCase() === 'FILE' ? <AiOutlineFileUnknown size="100%" color="darkgoldenrod" /> : null}
          </div>
        <div className="card-body">
            <h4 className="card-title text-center text-white">{file.fileName}{watchedProgress}</h4>
        </div>
      </div>
    </div>) 
  

  return (
      body 
  );
};

export default FileCard;


 