import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

export const Login = () => {

    // Dynamically updates the state based on input fields
    const [username, setUsername] = useState("");  // this initial the value to empty at first and to update the value we call the other function
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState(""); // To display success/error messages



    const navigate = useNavigate();

    
    const handleInput = (e) => {
        const { name, value } = e.target; // Get field name and value
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
      };
      

    
    // const handleSubmit = async (e) => {
    //     e.preventDefault(); // this will the refresh page, updates implicitly
    //     setSubmitted(false);
    //     console.log({ username, email, password });

    //     try {

    //         // const token = localStorage.getItem('token');
  
    //         // API call to login endpoint
    //         const response = await apiClient.post('/api/v1/user/login', {
    //             email,
    //             password,
    //         });

    //         console.log("Login Response: ", response.data);
            
    //         // Store token in localStorage or state management
    //         localStorage.setItem('token', response.data.token);

  
    //         // Reset form fields
    //         setUsername("")
    //         setEmail("")
    //         setPassword("")
            
    //       } catch (error) {
    //         console.log("Error: ", error.message)
            
    //       }

    //     // this will redirect you to employee dashboard page after 2 second
    //     setTimeout(() => {
    //       setSubmitted(true);
    //       navigate("/employeelist");
    //     }, 2000 )
    // }

   // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form refresh
    setMessage(""); // Clear previous messages

    try {
      const response = await apiClient.post("/api/v1/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setMessage("Login successful!");

        // Store the token for authentication persistence
        localStorage.setItem("token", response.data.token);

        // Navigate to the protected route after successful login
        navigate("/employeelist");
      }
    } catch (error) {
      // Handle errors from API response
      if (error.response && error.response.data) {
        setMessage(error.response.data.message); // Display backend error message
      } else {
        setMessage("An error occurred while logging in.");
      }
    }
  };

  //   const handleLogin = async (email, password) => {

  //     try {

  //         const response = await apiClient.post('/api/v1/user/login', { email, password });
  //         console.log(response.data.message); // 'Login successful'

  //         setTimeout(() => {
  //           setSubmitted(true);
  //           navigate("/employeelist");
  //         }, 2000 )

  //     } catch (error) {

  //         console.error(error.response?.data?.message || 'Login failed');

  //     }
  // };

  return (
    <div className='login-container'>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>

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
        {message && <p className="mt-3">{message}</p>}


        {submitted && <p className="mt-3 text-success">Form Submitted Successfully!</p>}

        
        <p className="mt-3">Don't have an account? <a href="/signup" className="text-primary">Sign up</a></p>


    </div>
  )
}
