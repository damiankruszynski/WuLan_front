import React from 'react';
import getProfile from '../Login/services/AuthProfile';

function ProfileEditComponent(props) {

    const profile = getProfile();

    return (
        <div className="d-flex home justify-content-center align-items-center flex-column">
             <form action="" className="d-flex flex-column">
                <div className="form-group col">
                    <label className="text-white" htmlFor="ProfileName">Nazwa profilu:</label>
                    <input type="text" className="form-control" placeholder={profile.profileName} id="ProfileName"/>
                </div>
                <p/>
                <div className="col align-self-center">
                    <button type="submit" className="btn btn-primary">Zapisz</button>
                 </div>
                </form> 
        </div>
    );
}

export default ProfileEditComponent;