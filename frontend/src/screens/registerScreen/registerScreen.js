import {React, useState, useEffect} from 'react'
import { Form, Button, Col, Row} from "react-bootstrap";
import MainScreen from '../../components/mainScreen';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/errorMessage';
import {register} from '../../actions/userActions';

const RegisterScreen = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    //const [picture, setPicture] = useState("");

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const {loading, error, userInfo} = userRegister;

    const submitHandler = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            setMessage("Passwords do not match");
        } else {
            dispatch(register(username, email, password));
        }
    }

    useEffect(() => {
        if(userInfo){
            window.location.href = "/mynotes";
        }
    }, [userInfo]);

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
