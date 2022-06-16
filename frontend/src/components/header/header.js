// import components from react-bootstrap
import { Container, Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import {} from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = ({setSearch}) => {

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };
    
    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/mynotes">My Notes</Nav.Link>
                <Nav.Link href="/" onClick={() => {logoutHandler()}}>Logout</Nav.Link>
            </Nav>
            <Form className="d-flex">
                <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e)=>setSearch(e.target.value)}
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )}
  
  export default Header
      