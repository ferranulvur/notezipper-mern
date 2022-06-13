import {React, useState, useEffect} from 'react'
import axios from 'axios';
import { Form, Button, Col, Row} from "react-bootstrap";
import MainScreen from '../../components/mainScreen';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/errorMessage';

const LoginScreen = () => {

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const {data} = await axios.post(
                '/api/users/login', 
                {
                    email: email,
                    password: password
                }, 
                config
            );
            localStorage.setItem('userInfo', JSON.stringify(data));
            console.log(data);
            setLoading(false);
            window.location.href = '/mynotes';
        }
        catch(err){
            setError(err.response.data.message);
            //console.log(err);
            setLoading(false);
        }
        
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if(userInfo){
            window.location.href = '/mynotes';
        }
    }
    , [])

    if(loading){

        return (
            <MainScreen title = 'Login'>
                <div className="container mt-5 loginContainer">
                    <Loading/>
                </div>
            </MainScreen>
        )
    } else if(!loading){
        return (
            <MainScreen title = 'Login'>
                <div className="container mt-5 loginContainer">
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email}
                                />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                />
                        </Form.Group>
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Row>
                            <Col>
                                New Customer? <a href="/register">Register</a>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </MainScreen>
        )
    }

}

export default LoginScreen;
