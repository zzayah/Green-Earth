import React from 'react';
import './login.css';

const LoginForm = () => {
    return (
        <div className='wrapper'>
            <form action="">
                <h1>Login</h1>
                <div className = 'input-box'>
                    <input type='text' placeholder='Username' required />
                </div>
                <div className = 'input-box'>
                    <input type='password' placeholder="Password" required />
                </div>
                
            </form>
        </div>
    )
}