import axios from "axios";
import consts from "../../consts";
import authHeader from "../../Login/services/AuthHeader";

class ProfileService{

    async getProfileList() {
           let header = {
               headers: authHeader()
           };
        try {
            let response = function () {
                return axios.get(consts.getAUTH_API_BASE_URL() + 'user/profileList', header)
            }
            let responseData = await response();
            return responseData.data;
        } catch (e) {
            console.log(e);
        }
    }

    async addProfile(profile){
        let header = {
               headers: authHeader()
           };
        let response = function () {
            return axios.post(consts.getAUTH_API_BASE_URL() + 'user/addProfile', profile, header)
        }
        let responseData = await response();
        return responseData.data;
    
    }

    async updateProfile(profile){
        let header = {
               headers: authHeader()
           };
        let response = function () {
            return axios.put(consts.getAUTH_API_BASE_URL() + 'user/updateProfile', profile, header)
        }
        let responseData = await response();
        return responseData.data;
    
    }

    async deleteProfile(profile){
        let header = {
               headers: authHeader(),
                params: {
                    profileId: profile.profileId
                }
           };
        let response = function () {
            return axios.delete(consts.getAUTH_API_BASE_URL() + 'user/deleteProfile', header)
        }
        let responseData = await response();
        return responseData.data;
}

}
export default new ProfileService();

