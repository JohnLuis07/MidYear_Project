import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./index.css";
import logo from "./img/scholarflow_logo.png";
import "./Login.css";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    const history = useHistory();

    const login = (e) => {
        e.preventDefault();

        const user = { email: email.toLowerCase(), password };

        axios.post("http://localhost:3000/", {
            email: user.email,
            password: user.password,
        }).then((response) => {
            if (response.data.message === "Login Successful") {
                localStorage.setItem('userEmail', user.email); // Store email in local storage
                history.push({
                    pathname: "/Homepage"
                });
            } else {
                console.log(response.data.message);
                setLoginError(response.data.message);
            }
        }).catch((error) => {
            console.error("There was an error logging in!", error);
        });
    }

    return (
        <div className="fullscreen-container">
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={login}>
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    {loginError && <p className="error-message">{loginError}</p>}
                    <div className="create-acc">
                        <p>Don't have an account yet? <Link to='/SignUp'>Create one</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
