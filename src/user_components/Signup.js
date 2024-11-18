import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export const Signup = () => {

    // we use onchange event to updates the respective states whenever the user types in the input fields
    // the state hold the value which in turn makes easier for us to update and retreive values
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submitted, setSubmitted] = useState(false); // Tracks form submission status

    const navigate = useNavigate();

    // Easier method because this after validating the name from the input the will automatically updates the respective state

    const handleInput = (e) => {
        const { name, value } = e.target; // Get field name and value
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        console.log("Form Data: " + { username, email, password });

        navigate("/login");


    }


  return (
    <div className="signup-container p-4 mx-auto" style={{ maxWidth: "400px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>

            <div className="form-group">

                <label>Username: </label>
                <input 
                type='text' 
                value={username} 
                name='username' 
                placeholder='Enter your username'
                className="form-control my-2"
                onChange={handleInput} 
                required />

            </div>

            <div className="form-group">

                <label>Email: </label>
                <input 
                type='email' 
                value={email} 
                name='email' 
                placeholder='Enter your Email'
                className="form-control my-2"
                onChange={handleInput} 
                required />
                
            </div>

            <div className="form-group">

                <label>Password: </label>
                <input 
                type='password' 
                value={password} 
                name='password' 
                placeholder='Enter your Password'
                className="form-control my-2"
                onChange={handleInput} 
                required />
                
            </div>

            <Button variant="contained" type="submit" className="mt-3" style={{ width: "100%" }}>
                Sign Up
            </Button>

        </form>

        {submitted && <p className="mt-3 text-success">Sign Up Successful! Redirecting to login...</p>}

        <p className="mt-3">
            Already Have an account? <a href='/login' className="text-primary">Login</a>
        </p>

        
    </div>
  )
}
