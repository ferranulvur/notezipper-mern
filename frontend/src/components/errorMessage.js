import React from 'react'
import {Alert} from 'react-bootstrap';

const ErrorMessage = ({variant = "info", children}) => {
    return (
        <Alert variant={variant}>
            <span>{children}</span>
        </Alert>
    )
}

export default ErrorMessage;
