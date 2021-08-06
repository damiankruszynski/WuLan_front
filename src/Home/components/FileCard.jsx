import * as React from "react";
import { Card, Col, Row } from 'react-bootstrap';

const FileCard = ({ fileList, clickFile }) => {
    if (fileList.length > 0) {
        return (
            <Row xs="auto" className="justify-content-center align-items-center">
            {
                    fileList.map(newFile => {
                        if (newFile.fileType === "FOLDER")
                            return <Col key={newFile.fileName}  xs="auto" className="col-content">
                            <           Card onClick={clickFile} className="file-looks-folder" id={newFile.filePath}>
                                            <Card.Body>
                                               <Card.Title style={{ color: "black" }}>{newFile.fileName}</Card.Title> 
                                             </Card.Body>
                                        </Card>           
                            </Col>
                        if (newFile.fileType === "FILE")
                            return <Col key={newFile.fileName}  xs="auto" className="col-content">
                            <           Card onClick={clickFile} className="file-looks-file" id={newFile.filePath}>
                                            <Card.Body>
                                               <Card.Title style={{ color: "black" }}>{newFile.fileName}</Card.Title> 
                                             </Card.Body>
                                        </Card>           
                            </Col>
                         if (newFile.fileType === "MP4")
                            return <Col key={newFile.fileName}  xs="auto" className="col-content">
                            <           Card onClick={clickFile} className="file-looks-MP4" id={newFile.filePath} title={newFile.fileType}>
                                            <Card.Body>
                                               <Card.Title style={{ color: "black" }}>{newFile.fileName}</Card.Title> 
                                             </Card.Body>
                                        </Card>           
                            </Col>
                         return <Col key={newFile.fileName}  xs="auto" className="col-content">
                            <           Card onClick={clickFile} className="file-looks-others" id={newFile.filePath}>
                                            <Card.Body>
                                               <Card.Title style={{ color: "black" }}>{newFile.fileName}</Card.Title> 
                                             </Card.Body>
                                        </Card>           
                            </Col>
                    })
            }
        </Row>
        );
    }
  
    return (
      <p>Brak danych!</p>
    );

  };

export default FileCard;