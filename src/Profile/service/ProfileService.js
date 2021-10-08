import axios from "axios";
import consts from "../../consts";
import authHeader from "../../Login/services/AuthHeader";

class ProfileService{

    async getProfileList() {
           let data = {
               headers: authHeader()
           };
        try {
            let response = function () {
                return axios.get(consts.getAUTH_API_BASE_URL() + 'user/profileList', data)
            }
            let responseData = await response();
            return responseData.data;
        } catch (e) {
            console.log(e);
        }
    }

}
export default new ProfileService();

