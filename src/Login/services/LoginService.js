import axios from 'axios';
import consts from '../../consts';



class LoginService{
 
     logIn(loginRequest){
        return axios.post(consts.getAUTH_API_BASE_URL() + 'login', loginRequest)
        .then(response => {
          if (response.data.token) {
            sessionStorage.setItem("user", JSON.stringify(response.data));
          }
        })
      };

    getCurrentUser = () => {
      return JSON.parse(sessionStorage.getItem("user"));
    };

}

export default new LoginService()