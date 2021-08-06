import React, { Component } from 'react';
import FooterComponent from './FooterComponent';
import LoginComponent from './LoginComponent';

class LoginComponentsMain extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <LoginComponent history={this.props.history} />
                <FooterComponent />
            </div>
        );
    }
}

export default LoginComponentsMain;