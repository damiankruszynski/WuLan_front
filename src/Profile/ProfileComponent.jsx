import React from 'react';
import { Card } from 'react-bootstrap';
import { FcReddit } from "react-icons/fc";

function ProfileComponent(props) {

    const profile = props.profile;

 
    return (
        <Card id={profile.id} onClick={props.onClickProfile} border="success" 
            style={{ width: '10rem', cursor: "pointer", background: "black", alignItems: "center"}}>
            <FcReddit size="80%"/>
            <Card.Body>
                <Card.Title style={{color: "bisque"}}  >{profile.profileName}</Card.Title>
            </Card.Body>
        </Card>
    );
}

export default ProfileComponent;