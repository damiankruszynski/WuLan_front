class consts {

    getAUTH_API_BASE_URL() {
        let HostIp = window.location.hostname;
        return "http://" + HostIp + ":8080/";
        // return "http://"+HostIp+":8080/wulan_back/";
    };

}

export default new consts()