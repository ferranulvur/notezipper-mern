
import { useEffect, useState } from 'react';
import MainScreen from '../../components/mainScreen.js'; 
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, Badge } from 'react-bootstrap'; 
import axios from 'axios';


const MyNotes = () => {

    const [notes, setNotes] = useState([]);

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure?")){
            console.log("deleted " + id);
        }
    }

    const fetchNotes = async () => {
        const {data} = await axios.get("/api/notes");
        setNotes(data);
    }

    useEffect(() => {
        fetchNotes()
    })

    return (
        <MainScreen title="Welcome Back">
            <div className="mb-3">
                <Link to="/createnote">
                    <Button>Create new note</Button>
                </Link>
            </div>
            <Row>
                {notes.map((note)=>(
                <Col key={note._id} md={4}>
                    <Card className="my-3">
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col>
                                    <span>{note.title}</span>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <div>
                                        <Button href={`/edit/${note._id}`} className="m-2">Edit</Button>
                                        <Button onClick={() => deleteHandler(note._id)} variant="danger" className="m-2">Delete</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <h6>
                                <Badge pill bg="success">
                                    Category - {note.category}
                                </Badge>
                            </h6>
                            <>
                            <p>{note.content}</p>
                            <footer className="blockquote-footer">Created on - date</footer>
                            </>
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>

        </MainScreen>
    );
}

export default MyNotes;