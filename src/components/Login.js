import React from 'react'
import {Form, Button} from 'react-bootstrap';

function Login() {
    function handleLogin(e){
        e.preventDefault();

        const user = {
            username: e.target.username.value, 
            password: e.target.password.value
        }
        
        fetch(`http://localhost:8080/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
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
                <Button type="submit">Login</Button>
            </Form>
        </div>
    )
    }

export default Login