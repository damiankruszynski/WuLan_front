import axios from 'axios';
import authHeader from '../../Login/services/AuthHeader';
import consts from '../../consts';
import getProfile from '../../Login/services/AuthProfile';


class API_HomeService {
 

    async getFileList(dirPath) {
        let data = {
            headers: authHeader(),
            params: {
                path: dirPath,
                profileId: getProfile().profileId
            }
        };
        try{
            let response = function() {
                    return axios.get(consts.getAUTH_API_BASE_URL() + 'files', data)
                } 

            let responseData = await response();
            return responseData.data;
        }catch(e){
          console.log(e);  
        }
    }

    async getTimeWatched(filePath) {
        let data = {
            headers: authHeader(),
            params: {
                filePath: filePath,
                profileId: getProfile().profileId
            }
        };
        try{
            let response = function() {
                    return axios.get(consts.getAUTH_API_BASE_URL() + 'getWatchedTimeMovie', data)
                } 

            let responseData = await response();
            return responseData.data;
        }catch(e){
            console.log(e);
            return 0;
        }
    
    }

    setTimeWatched(filePath, secondWatched, isWatched, movieTimeInSeconds) {
        const data = {
                filePath: filePath,
                timeWatched: secondWatched,
                profileId: getProfile().profileId,
                isWatched: isWatched,
                movieTimeInSeconds: movieTimeInSeconds
        };
        axios.put(consts.getAUTH_API_BASE_URL() + 'saveWatchedTimeMovie', data, 
        { headers: authHeader() })
        .then( () => {
        },
        error => {
            console.log(error);
        }) 
            
    }


    getURLImage(filePath, isPrewiew){
        let params ={
             filePath: filePath
        }
        let endPoint;
        if(isPrewiew){
            endPoint = 'getImagePreview';
        }else{
            endPoint = 'getImage';
        }  
        const searchParams = new URLSearchParams(params);
        
        return consts.getAUTH_API_BASE_URL() + endPoint +"?"+searchParams.toString();  
    }

    async getImage(filePath, isPrewiew){
         let data = {
            responseType: 'blob', 
            headers: authHeader(),
            params: {
                filePath: filePath
            }
        };
        let endPoint
        if(isPrewiew){
            endPoint = 'getImagePreview';
        }else{
            endPoint = 'getImage';
        }
        try{
            let response = function() {
                    return axios.get(consts.getAUTH_API_BASE_URL() + endPoint, data)
                } 

            let responseData =  await response();
            let url = URL.createObjectURL(responseData.data)
            return url;
        }catch(e){
          console.log(e);  
        }
    }


};

export default new API_HomeService()