import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css"; // Ensure this import includes the custom CSS
import logo from "./img/scholarflow_logo.png";
import "./SignUp.css";
import leftbg from "./img/login_signup.jpeg";

const SignUp = () => {
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [accountCreated, setAccountCreated] = useState(null);

    const history = useHistory();

    const signUp = (e) => {
        e.preventDefault();

        if (Password === confirmpassword) {
          setPasswordMatch(true); // Passwords match, set to false
          const user = { fullname ,username, email, password };
          console.log(user.userEmail, user.userName);
          setAccountCreated(true); 
    
          Axios.post("http://localhost:3001/signup", {
            fullname: user.fullname, 
            username: user.username,
            email: user.email,
            password: user.userpassword,
          }).then((response) => {
            if (response.data.message === "Email already exists") {
              // Display an error message that the email already exists
              setAccountCreated("Email already exists");
            } else if (response.data.message === "User created successfully.") {
              // Registration was successful
              setAccountCreated("User created successfully.");
            }
          });
        } else {
            setPasswordMatch(false); // Passwords don't match, set to true
        }
    
    }
 
    return (
        <div className="fullscreen-container">
            <div className="SignUp-Container">
                <div className="left-side">
                    <img src={leftbg} alt="Logo" className="signup-logo" />
                </div>
                <div className="right-side">
                    <h1>Sign up</h1>
                    <form onSubmit={signUp}>
                        <div>
                            <input
                                type="text" 
                                placeholder="Full Name"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            /> 
                        </div>
                        <div>
                            <input
                                type="text" 
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input 
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input 
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {!passwordMatch && <p>Passwords do not match!</p>}
                        <button type="submit">Register</button>
                    </form>
                    <div className="login-link">
                        Already a member? <Link to="/">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default SignUp;
