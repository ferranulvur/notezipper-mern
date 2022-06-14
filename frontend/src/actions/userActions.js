import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAILURE, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_LOGOUT
} from '../constants/userConstants';

import axios from 'axios';

export const login = (email, password) => async (dispatch) => {

    try{

        dispatch({type: USER_LOGIN_REQUEST});

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

        dispatch({type: USER_LOGIN_SUCCESS, payload: data});

        localStorage.setItem('userInfo', JSON.stringify(data));

    }
    catch(err){

        dispatch({
            type: USER_LOGIN_FAILURE, 
            payload: 
            err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        });

    }
}

export const register = (name, email, password, pic) => async (dispatch) => {

    try{

        dispatch({type: USER_REGISTER_REQUEST});

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users/register', 
            {
                name: name,
                email: email,
                password: password
            }, 
            config
        );

        dispatch({type: USER_REGISTER_SUCCESS, payload: data});

        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));

    }
    catch(err){

        dispatch({
            type: USER_REGISTER_FAILURE, 
            payload: 
            err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        });

    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: USER_LOGOUT});
}