// Import components from react-bootstrap
import { Container, Row, Button } from 'react-bootstrap';
import './landingPage.css';

const LandingPage = () => {
    return (
        <div className="main">
        <Container>
            <Row className="">
                <div className="t-center">
                    <h1>Safe Life</h1>
                    <p>
                        Safe Life is a web application that helps you to find the best places to live in your area.
                    </p>
                </div>
                <div className="buttonContainer">
                    <a href="/login">
                        <Button size="lg" className="landingButton">
                            Login
                        </Button>
                    </a>
                    <a href="/register">
                        <Button size="lg" className="landingButton">
                            Register
                        </Button>
                    </a>
                </div>
            </Row>
        </Container>
        </div>
)}
export default LandingPage;