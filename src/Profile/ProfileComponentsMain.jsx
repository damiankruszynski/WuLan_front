import React, { useEffect, useState } from 'react';
import ProfileComponent from './ProfileComponent';
import ProfileService from './service/ProfileService';

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
            profiles.push(<div className="col-auto" key={profile.id}><ProfileComponent profile={profile} onClickProfile={onClickProfile}></ProfileComponent></div>)
        });    
    }

    function onClickProfile(e) {
        const profileId = e.currentTarget.id;
         Array.from(profileList).forEach((profile) => {
             if (profile.id.toString() === profileId) {
                localStorage.setItem('profile', JSON.stringify(profile));
                props.history.push("/home");
                window.location.reload();
            }
        });    
    }
    

    return (
        <div className="d-flex home justify-content-center align-items-center flex-column">
            <div>
                <h1 style={{color: "bisque", margin: "3rem"}}>Kto ogląda?</h1>
            </div>
            <div className="d-flex flex-row">
                <div className="row">    
                    {profileList.length !== 0 ? profiles : null}
                </div>
            </div>
        </div>
    );
}

export default ProfileComponentsMain;