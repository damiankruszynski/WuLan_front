import axios from 'axios';
import authHeader from '../../Login/services/AuthService';
import consts from '../../consts';


async function homeServiceGetFile(dirPath) {
 
    let token = {
        headers: authHeader(),
        params: {
            path: dirPath
        }
    };
    return await axios.get(consts.getAUTH_API_BASE_URL() + 'files', token).then((response) => response.data);
};

export default homeServiceGetFile()