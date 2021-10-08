import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

function FooterComponent(props){ 
        return (
            <Navbar fixed="bottom">
                <Nav className="nav-item m-auto">
                    All Rights Reserved 2021 @DK
                </Nav>
            </Navbar>
        );
}

export default FooterComponent;