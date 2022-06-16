import {React, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { Form, Button, Col, Row, Card} from "react-bootstrap";

import ReactMarkdown from 'react-markdown';
import MainScreen from '../../components/mainScreen';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/errorMessage';
import {updateNoteAction} from '../../actions/noteActions';
import axios from 'axios';

const SingleNoteScreen = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const {id} = useParams();
    const dispatch = useDispatch();

    const updateNote = useSelector((state) => state.noteCreate);
    const {loading, error, success} = updateNote;

    const userLogin = useSelector((state) => state.userLogin);
    const {userInfo} = userLogin;

    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
        setDate("");
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if(!title || !content || !category) return;
        else{
            dispatch(updateNoteAction(id, title, content, category));
            resetHandler();
            window.location.href = "/";
        }
    }

    const fetchData = async () => {
        
        const {data} = await axios.get(`/api/notes/${id}`, {
            headers: {
                'Authorization': `Bearer ${userInfo.user.token}`,
                'Content-Type': 'application/json'
            }
        });

        setTitle(data.note.title);
        setContent(data.note.content);
        setCategory(data.note.category);
        setDate(data.note.date);
    }

    useEffect(() => {
        if(!userInfo){
            window.location.href = "/";
        } else{
            fetchData();
        }
    }, [userInfo]);

    if(loading){
        return (
            <MainScreen title = 'Edit Note'>
                <div className="container mt-5 editNote">
                    <Loading/>
                </div>
            </MainScreen>
        )
    } else{
        return (
            <MainScreen title = 'Edit Note'>
                <div className="container mt-5 editNote">
                    <p className="my-3 text-muted">Updating on - {new Date().toLocaleDateString()}</p>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter title" 
                                onChange={(e) => setTitle(e.target.value)} 
                                value={title}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control 
                                type="textarea" 
                                placeholder="Enter Content" 
                                onChange={(e) => setContent(e.target.value)} 
                                value={content}
                                required
                                />
                        </Form.Group>
                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Category" 
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                                required
                                />
                        </Form.Group>                                          
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        {success && <ErrorMessage variant="success">Note Created Successfully</ErrorMessage>}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </MainScreen>
        )
    }

}

export default SingleNoteScreen;
