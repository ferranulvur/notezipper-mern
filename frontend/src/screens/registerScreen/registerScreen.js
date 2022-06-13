import {React, useState, useEffect} from 'react'
import axios from 'axios';
import { Form, Button, Col, Row} from "react-bootstrap";
import MainScreen from '../../components/mainScreen';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/errorMessage';

const RegisterScreen = () => {

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        if(password === confirmPassword){
            try{
                const config = {
                    headers: {'Content-Type': 'application/json'}
                }
                const {data} = await axios.post(
                    '/api/users/register', 
                    {
                        name: username,
                        email: email,
                        password: password,
                        //pic: picture
                    }, 
                    config
                );
                localStorage.setItem('userInfo', JSON.stringify(data));
                console.log(data);
                setLoading(false);
            }
            catch(err){
                setError(err.response.data.message);
                setLoading(false);
            }
        } else{
            setError("Passwords do not match");
            setLoading(false);
        }
    }

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    //const [picture, setPicture] = useState("");
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
    } else{
        return (
            <MainScreen title = 'Register'>
                <div className="container mt-5 loginContainer">
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="name" 
                                placeholder="Enter username" 
                                onChange={(e) => setUsername(e.target.value)} 
                                value={username}
                                required
                            />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email" 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email}
                                required
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
                                required
                                />
                        </Form.Group>                        
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirm Password" 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                required
                                />
                        </Form.Group>
{/*                         <Form.Group className="mb-3" controlId="formBasicPicture">
                            <Form.Label>Upload Picture</Form.Label>
                            <Form.Control 
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPicture(e.target.files[0])}
                                required
                            />
                        </Form.Group>    */}                     
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Row>
                            <Col>
                                <a href="/login">Already have an account?</a>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </MainScreen>
        )
    }

}

export default RegisterScreen;
