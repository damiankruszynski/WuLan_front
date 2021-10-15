import React from 'react'
import { IoPower } from "react-icons/io5";


export default function LogutButton(props) {

    function logout(){
        localStorage.removeItem('user');
        localStorage.removeItem('profile');
        props.history.push("/login");  
    }

    return (
            <IoPower size="45" color="red" cursor="pointer" onClick={logout}>Wyloguj</IoPower>
    );
}
