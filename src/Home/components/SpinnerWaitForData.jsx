import React from 'react';
import { Row, Spinner } from 'react-bootstrap';

function SpinnerWaitForData(props){
        return (
            <Row xs="auto" className="justify-content-center align-items-center">
               <Spinner animation="grow"  size="sm"/>
            </Row>
        );
}

export default SpinnerWaitForData;