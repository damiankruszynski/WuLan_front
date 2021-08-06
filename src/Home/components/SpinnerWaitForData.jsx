import React, { Component } from 'react';
import { Row, Spinner } from 'react-bootstrap';

class SpinnerWaitForData extends Component {
    render() {
        return (
            <Row xs="auto" className="justify-content-center align-items-center">
               <Spinner animation="grow"  size="sm"/>
            </Row>
        );
    }
}

export default SpinnerWaitForData;