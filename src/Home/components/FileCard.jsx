import * as React from "react";
import { Card, Col } from 'react-bootstrap';

function FileCard(props) {
  
  const file = props.file;
  const onClickFile = props.onClickFile;
  const body = [];    
  let fileLooks = "file-looks-" + file.fileType;  
  
  body.push(
    <Col key={file.fileName} xs="auto" className="col-content">
      <Card onClick={onClickFile} className={fileLooks} id={file.filePath}>
          <Card.Body>
          <Card.Title style={{color: "black" }}>{file.fileName}</Card.Title>
        </Card.Body>
      </Card>
    </Col>) 
  

  return (
      body    
  );
};

export default FileCard;


 