import axios from 'axios';
import authHeader from '../../Login/services/AuthService';
import consts from '../../consts';


class API_HomeService {
 

    async getFileList(dirPath) {
        let data = {
            headers: authHeader(),
            params: {
                path: dirPath
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
                filePath: filePath
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

    setTimeWatched(filePath, secondWatched) {
        const data = {
                pathFile: filePath,
                timeWatched: secondWatched
        };
        axios.put(consts.getAUTH_API_BASE_URL() + 'saveWatchedTimeMovie', data, 
        { headers: authHeader() })
        .then( () => {
        },
        error => {
            console.log(error);
        }) 
            
    }


};

export default new API_HomeService()