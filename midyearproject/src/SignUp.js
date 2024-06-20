import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from 'axios';
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

        if (password === confirmpassword) {
            setPasswordMatch(true);
            const user = { fullname, username, email, password };

            Axios.post("http://localhost:3000/signup", {
                fullname: user.fullname,
                username: user.username,
                email: user.email,
                password: user.password,
            }).then((response) => {
                if (response.data.message === "Email already exists") {
                    setAccountCreated("Email already exists");
                } else if (response.data.message === "User created successfully.") {
                    setAccountCreated("User created successfully.");
                }
            }).catch((error) => {
                console.error("There was an error creating the account!", error);
            });
        } else {
            setPasswordMatch(false);
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
                    {accountCreated && <p>{accountCreated}</p>}
                    <div className="login-link">
                        Already a member? <Link to="/">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
