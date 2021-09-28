import React from 'react'
import { Row } from 'react-bootstrap'

export default function RowFlux(props) {
    if (props.body === undefined && props.body.length === 0){
        return null;
    }
    const row = (
        <Row xs = "auto" className="justify-content-center align-items-center" >
            {props.body}
        </Row>
    );
    return (
       row
    );
}
