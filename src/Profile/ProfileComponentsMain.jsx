import React, { useEffect, useState } from 'react';
import ProfileComponent from './ProfileComponent';
import ProfileService from './service/ProfileService';
import {GrAddCircle} from 'react-icons/gr'
import LogutButton from '../Home/components/LogutButton';

function ProfileComponentsMain(props) {
      const [profileList, setProfileList] = useState([]);
      useEffect(() => {
          getProfileList()
      }, []);

    async function getProfileList() {
          let response = await ProfileService.getProfileList();
          setProfileList(response);
    };


    let profiles = [];
    if (profileList !== undefined && profileList.length !== 0) {
        Array.from(profileList).forEach((profile) => {
            profiles.push(<div className="col-auto px-3" key={profile.profileId}><ProfileComponent profile={profile} onClickProfile={onClickProfile}></ProfileComponent></div>)
        });    
    }

    function onClickProfile(e) {
        const profileId = e.currentTarget.id;
         Array.from(profileList).forEach((profile) => {
             if (profile.profileId.toString() === profileId) {
                localStorage.setItem('profile', JSON.stringify(profile));
                props.history.push("/home");
            }
        });    
    }
    

    function addProfile(){
        props.history.push("/editProfile");
    }
    
    return (
        <div className="d-flex home justify-content-center align-items-center flex-column">
            <div className="row">
                <LogutButton history={props.history}/>
            </div>
            <div className="row">
                <h1 style={{color: "bisque", margin: "3rem"}}>Kto ogląda?</h1>
            </div>
            <div className="row">
                <div className="d-inline-flex">    
                    {profileList.length !== 0 ? profiles : null}
                    <div className="col-auto px-5 align-self-center">
                        <GrAddCircle size="35" cursor="pointer" onClick={addProfile} className="GrAddCircle"></GrAddCircle>    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileComponentsMain;