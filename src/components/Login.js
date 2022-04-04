import React from 'react'
import {useNavigate} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import { getLoginToken } from '../services/session';

function Login() {
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        
        try {
            // 1. Make a POST request to /login in the API
            const { token } = await getLoginToken({
              username: e.target.username.value,
              password: e.target.password.value,
            });
      
            if (!token) {
              throw new Error('Unsuccessful login');
            }
      
            // 2. Store token in local storage
            localStorage.setItem('f6-menu-token', token);
      
            // 3. Redirect back to feed
            navigate(-1);
          } catch (error) {
            console.log(error);
          }
    }

    return (
        <div className="d-flex justify-content-center" style={{minHeight: '100vh'}}>
            <Form 
            style={{width: '100%', maxWidth: '400px'}}
            onSubmit={(e) => handleLogin(e)}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" name="username"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" name="password"/>
                </Form.Group>
                <button className="btn large-btn" type="submit">Login</button>
            </Form>
        </div>
    )
    }

export default Login