import {React, useState, useEffect} from 'react'
import { Form, Button, Col, Row} from "react-bootstrap";
import MainScreen from '../../components/mainScreen';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/errorMessage';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../actions/userActions';

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const {loading, error, userInfo} = userLogin;

    useEffect(() => {
        if(userInfo){
            window.location.href = "/mynotes";
        }
    }, [userInfo]);

    const submitHandler = async (event) => {
        event.preventDefault();
        dispatch(login(email, password));
    }

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
