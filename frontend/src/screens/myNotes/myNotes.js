
import { useEffect, useState } from 'react';
import MainScreen from '../../components/mainScreen.js'; 
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row, Badge } from 'react-bootstrap'; 
import { useSelector, useDispatch } from 'react-redux';
import { listNotes, deleteNoteAction } from '../../actions/noteActions';
import Loading  from '../../components/loading.js';
import ErrorMessage from '../../components/errorMessage.js';


const MyNotes =  ({search}) => {

    console.log(search)
    const dispatch = useDispatch();

    const noteList = useSelector((state) => state.noteList);
    const {loading, error, notes} = noteList;

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const noteCreate = useSelector((state) => state.noteCreate);
    const {success: successCreate} = noteCreate;

    const noteUpdate = useSelector((state) => state.noteCreate);
    const {success: successUpdate} = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = noteDelete;

    useEffect(() => {
        dispatch(listNotes());
        if(!userInfo){
            window.location.href = "/login";
        }
    }, [
        dispatch, 
        successDelete, 
        successUpdate, 
        successCreate, 
        userInfo])

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure?")){
            dispatch(deleteNoteAction(id));
        }
    }
    
    return (
        <MainScreen title={`Welcome Back ${userInfo.user.name || ''}`}>
            <div className="mb-3">
                <Link to="/createnote">
                    <Button>Create new note</Button>
                </Link>
            </div>
            <Row>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading/>}
                {notes && notes.notes?.filter((filteredNote) => filteredNote.title.toLowerCase().includes(search.toLowerCase()))
                .reverse()
                .map((note)=>(
                    <Col key={note._id} md={4}>
                        <Card className="my-3">
                            <Card.Header>
                                <Row className="align-items-center">
                                    <Col>
                                        <span>{note.title}</span>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                        <div>
                                            <Button href={`/notes/${note._id}`} className="m-2">Edit</Button>
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
                                <footer className="blockquote-footer">Created on - {note.createdAt.substring(0,10)}</footer>
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