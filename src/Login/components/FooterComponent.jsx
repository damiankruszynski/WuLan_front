import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <Navbar fixed="bottom">
                <Nav className="nav-item m-auto">
                    All Rights Reserved 2020 @DK
                </Nav>
            </Navbar>
        );
    }
}

export default FooterComponent;