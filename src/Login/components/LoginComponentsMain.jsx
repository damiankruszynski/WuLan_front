import React from 'react';
import FooterComponent from './FooterComponent';
import LoginComponent from './LoginComponent';

function LoginComponentsMain(props) {
        return (
            <div>
                <LoginComponent history={props.history} />
                <FooterComponent />
            </div>
        );
}

export default LoginComponentsMain;