import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    // Dynamically updates the state based on input fields
    const [username, setUsername] = useState("");  // this initial the value to empty at first and to update the value we call the other function
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [submitted, setSubmitted] = useState(false);


    const navigate = useNavigate();


    const handleInput = (e) => {
        const { name, value } = e.target; // Get field name and value
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
      };
      

    
    const handleSubmit = (e) => {
        e.preventDefault(); // this will the refresh page, updates implicitly
        console.log({ username, email, password });

        setTimeout(() => {
        setSubmitted(true);
        navigate("/employeelist");
        }, 2000 )
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

        
        <p className="mt-3">Don't have an account? <a href="/signup" className="text-primary">Sign up</a></p>


    </div>
  )
}
