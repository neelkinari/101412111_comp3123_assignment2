import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react'
import Button from '@mui/material/Button';

export const Login = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [submitted, setSubmitted] = useState(false);



    const handleInput = (e) => {
        const { name, value } = e.target; // Get field name and value
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
      };
      

    // this will the refresh page 
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        console.log({ username, email, password });
    }

  return (
    <div className='login-container'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>

            <div className='form-row'>
                <div className='form-group'>
                    <label>UserName</label>
                    <input type="text" name="username" placeholder="Enter your username" value={username} onChange={handleInput} required />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Enter email" value={email} onChange={handleInput} required />
                </div>

                <div className='form-group'>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter Password" value={password} onChange={handleInput} required />
                </div>
                
            </div>

            <Button variant="contained" type='submit'>Login</Button>
            {/* <button type="submit">Login</button> */}

        </form>
        {submitted && <p className="mt-3 text-success">Form Submitted Successfully!</p>}

        
        {/* <p>Don't have an account? <a href="/signup">Sign up</a></p> */}


    </div>
  )
}
