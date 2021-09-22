import React, { useEffect, useState } from 'react';
import FileCard from './FileCard';
import SpinnerWaitForData from './SpinnerWaitForData';
import axios from 'axios';
import authHeader from '../../Login/services/AuthService';
import consts from '../../consts';



function HomeComponent(props){

    const [fileList, setFileList] = useState([]);
    useEffect(() => setFileList(getFileList("")), []);

    function getFileList(dirPath) {
        let token = {
            headers: authHeader(),
            params: {
                path: dirPath
            }
        };
        let response;
        axios.get(consts.getAUTH_API_BASE_URL() + 'files', token).then((resp) => response = resp);
        console.log(response);
        return response.data;
    };
    
    function onClickFile(e) {
        const path = e.target.id;
        setFileList(getFileList(path));
    }


    let files = [];
    console.log(fileList)
    if (fileList !== undefined && fileList.length !== 0) {
        Array.from(fileList).forEach((file) => {
            files.push(<FileCard file={file} onClickFile={onClickFile} />)
        });    
    }
    

    return (
        <div className="App">
            <div className="App-header">
                <div className="container-fluid ">
                        <div>
                                {files.length !== 0 ? files: <SpinnerWaitForData/>}
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default HomeComponent;