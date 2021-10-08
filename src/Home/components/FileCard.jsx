import * as React from "react";
import { BsFolderFill } from "react-icons/bs";
import { AiOutlineFileUnknown } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";

function FileCard(props) {
  
  const file = props.file;
  const onClickFile = props.onClickFile;
  const body = [];
      
  
    body.push(
    <div key={file.fileName} className="col">
        <div className="card file-looks"  onClick={onClickFile} id={file.filePath}>
          <div className="card-img-top justify-content-center">
            {file.fileType.toUpperCase() === 'FOLDER' ? <BsFolderFill size="100%" color="darkgoldenrod" /> : null}
            {file.fileType.toUpperCase() === 'MP4' ? <BiMoviePlay size="100%" color="forestgreen" /> : null}
            {file.fileType.toUpperCase() === 'FILE' ? <AiOutlineFileUnknown size="100%" color="darkgoldenrod" /> : null}
          </div>
        <div className="card-body">
            <h4 className="card-title text-center text-white">{file.fileName}</h4>
        </div>
      </div>
    </div>) 
  

  return (
      body 
  );
};

export default FileCard;


 