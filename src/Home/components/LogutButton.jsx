import React from 'react'
import { Button } from 'react-bootstrap'


export default function LogutButton(props) {

    function logout(){
        localStorage.removeItem('user');
        props.history.push("/login");  
        window.location.reload();
    }

    return (
        <div>
            <Button onClick={logout}>Wyloguj</Button>
        </div>
    );
}
