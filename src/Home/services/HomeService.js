import axios from 'axios';
import authHeader from '../../Login/services/AuthService';
import consts from '../../consts';


class HomeService {

    getFiles(path) {
        let token = {
            headers: authHeader(),
            params: path
        };
        return axios.get(consts.getAUTH_API_BASE_URL() + 'files', token);
    };

}

export default new HomeService()