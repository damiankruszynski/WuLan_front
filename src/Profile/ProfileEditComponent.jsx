import React, { useState } from 'react';
import getProfile from '../Login/services/AuthProfile';
import ProfileService from './service/ProfileService';
import { FcReddit } from "react-icons/fc";
import ShowModal from '../CommonUtils/ShowModal';

function ProfileEditComponent(props) {

    const profile = getProfile();
    const [profileName, setProfileName] = useState(profile  ? profile.profileName : "");
    const [messageError, setMessageError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
 
    let buttonAddSave = <div className="col d-flex">
                            <button  type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Zapisz</button>
                       </div>;

    if(!profile){
        buttonAddSave = <div className="d-inline-flex justify-content-center">
                            <button  type="submit" onClick={handleSubmit} className="btn btn-primary">Dodaj</button>
                       </div>
    }

    function handleNameChange(e){
        setProfileName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!profile){
            let newProfile ={
              profileName : profileName
            }
            ProfileService.addProfile(newProfile).then(
            () => {
                props.history.push("/profile");            
            },
            error => {    
                setMessageError(error.message);         
            });
        }else{
            let updateProfile ={
              profileName : profileName,
              profileId: profile.profileId.toString()
            }
              ProfileService.updateProfile(updateProfile).then(
            (response) => {
                localStorage.setItem("profile", JSON.stringify(response));
                props.history.push("/home");  
            },
            error => {    
                setMessageError(error.message);         
            }); 
        }
    }

    function deleteProfile(e){
         e.preventDefault();
         let profileToDelete = {
             profileName: profile.profileName,
             profileId: profile.profileId.toString()
         }
        ProfileService.deleteProfile(profileToDelete).then(
        () => {
            localStorage.removeItem("profile");
            props.history.push("/profile");  
        },
        error => {
            setMessageError(error.message + " " + error.response.data.message );              
        });
    }

    function handleShowModal(e){
        e.preventDefault();
        setShowModal(true);
    }
    
    function handleDisableShowModal(){
        setShowModal(false);
    }

    function handleConfirn(e){
        deleteProfile(e);
    }

    const question = "Czy na pewno usunąć ten profil ? Uwaga operacja jest bezpowrotna!"
    return (
        <div className="d-flex home justify-content-center align-items-center flex-column">
            <div className="row text-white">{messageError ? messageError: null}</div>
            {showModal ? <ShowModal handleDisableShowModal={handleDisableShowModal} handleConfirn={handleConfirn}  question={question}/> : null}
            <div className="row">      
             <FcReddit size="10rem"/>
            </div> 
             <form className="d-flex flex-column">
                <div className="form-group col">
                    <label className="text-white" htmlFor="ProfileName">Nazwa profilu:</label>
                    <input type="text" className="form-control" value={profileName} placeholder="Podaj nazwę" id="ProfileName" autoFocus onChange={handleNameChange}/>
                </div>
                <p/>
                <div className="row">
                    {buttonAddSave}
                    <div className="col d-flex justify-content-end">
                        {profile ?  <button onClick={handleShowModal} className="btn btn-danger btn-block">Usuń</button> : null }
                    </div>
                 </div>
            </form> 
        </div>
    );
}

export default ProfileEditComponent;